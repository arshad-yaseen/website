import { CodeBlock } from "@/components/docs/code-block";
import { A, Callout, H2, InlineCode, Li, Ol, P, Strong, Table, Ul } from "@/components/docs/prose";
import type { Writing } from "../types";

export default {
  slug: "engineering-high-performance-parsers",
  title: "Engineering High-Performance Parsers with Data-Oriented Design",
  description:
    "How designing the data structure first (flat arrays of indices instead of a pointer tree) makes a parser fast and collapses memory layout, allocation, and serialization into one decision.",
  date: "2026-06-28",
  body: (
    <>
      <H2>Abstract</H2>
      <P>
        A parser is usually taught as a problem of grammars, but once the grammar is correct, almost
        all of the performance and most of the engineering difficulty live somewhere else, in how
        the resulting tree is represented in memory. This is the design discipline behind{" "}
        <A href="https://yuku.fyi">Yuku</A>, a JavaScript and TypeScript parser written in Zig that
        runs several times faster than the established parsers in its category, and it applies to
        any parser or compiler frontend in a native language. The claim is simple. Design the data
        structure first, let the machine’s access patterns dictate its shape, and the speed follows
        almost for free, while unrelated-looking problems (memory layout, allocation, and
        serialization) collapse into one solution.
      </P>

      <Callout>
        Although this article is framed around a parser, almost none of it is specific to parsing.
        Any system that builds a large structure once and then traverses it many times wins from the
        same moves. Query planners, game engines, simulations, and serializers all live or die on
        memory layout. Design the data for the machine, prefer indices over pointers, and keep the
        hot path linear.
      </Callout>

      <H2>1. The Single Idea</H2>
      <P>
        A parser’s performance is decided long before its first benchmark, by how its tree is laid
        out in memory. That is data-oriented design. Start from the access pattern and the hardware,
        derive the representation, and build everything else, the lexer, the recursive descent, the
        visitor API, to serve it.
      </P>
      <P>Two facts about modern hardware drive the whole argument.</P>
      <Ol>
        <Li>
          A cache miss to main memory costs on the order of a hundred nanoseconds. A floating-point
          operation costs a fraction of one. A parser that chases pointers is memory-latency-bound,
          stalling on loads rather than computing.
        </Li>
        <Li>
          A general-purpose allocator call is not free, and a parser that allocates one node at a
          time pays that cost millions of times while scattering related objects across memory.
        </Li>
      </Ol>
      <P>
        The stakes are concrete. A hundred-thousand-byte file produces roughly fifty thousand AST
        nodes. As separately allocated, pointer-linked objects, that is fifty thousand allocations,
        as many frees, and every later traversal chasing pointers into cold memory. In one flat
        array, it is a handful of allocations, a linear scan, and a single teardown. That is not a
        constant factor. It changes the slope of the curve.
      </P>

      <H2>2. The Cost of the Obvious Design</H2>
      <P>
        The textbook AST is a tree of heap-allocated structs joined by pointers. In a native
        language it looks like this.
      </P>
      <CodeBlock
        lang="zig"
        code={`const Node = union(enum) {
    binary: struct { op: Op, left: *Node, right: *Node },
    call: struct { callee: *Node, args: []*Node },
    identifier: struct { name: []const u8 },
    // ...one variant per node kind
};`}
      />
      <P>
        It is correct, it is readable, and it is the wrong shape for a machine. Consider what it
        costs.
      </P>
      <Ul>
        <Li>
          <Strong>Allocation per node.</Strong> Each <InlineCode>*Node</InlineCode> is an allocator
          call. For our hundred-thousand-byte file that is tens of thousands of calls, each touching
          allocator metadata.
        </Li>
        <Li>
          <Strong>Pointer chasing.</Strong> <InlineCode>left</InlineCode> and{" "}
          <InlineCode>right</InlineCode> point wherever the allocator happened to place them.
          Walking the tree is a sequence of unpredictable loads, each a potential cache miss. The
          prefetcher cannot help because the addresses are not a pattern.
        </Li>
        <Li>
          <Strong>Pointer overhead.</Strong> On a 64-bit target every edge is eight bytes. A node
          with two children spends sixteen bytes just on pointers, often more than its actual
          payload. Pointers also pin the representation to one address space, which makes the tree
          impossible to hand to another language without a deep copy.
        </Li>
        <Li>
          <Strong>Fragmentation and teardown.</Strong> Freeing the tree is another tens of thousands
          of calls, and the objects were never contiguous to begin with.
        </Li>
      </Ul>
      <P>
        The variant payloads also differ wildly in size, so a naive node array would be sized to the
        largest variant and waste space on the common small ones. We will fix that too.
      </P>
      <P>
        None of these costs come from the grammar. They come from the representation. So we change
        the representation.
      </P>

      <H2>3. Nodes as Indices, Not Pointers</H2>
      <P>
        The first move is to replace every pointer with an integer index into one flat array of
        nodes.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const NodeIndex = enum(u32) {
    null = std.math.maxInt(u32), // the universal "no child" sentinel
    _,
};`}
      />
      <P>
        A <InlineCode>NodeIndex</InlineCode> is a <InlineCode>u32</InlineCode>. It is half the size
        of a pointer. It does not pin the tree to an address space, so the same bytes are valid in
        this process, in a serialized file, or in another language’s heap. The reserved value{" "}
        <InlineCode>null</InlineCode> encodes “absent child” without a separate optional, which
        keeps payloads flat. Because the array only grows and is never compacted, an index stays
        valid for the entire life of the tree.
      </P>
      <CodeBlock
        lang="text"
        code={`Tree
  nodes    [ n0 ][ n1 ][ n2 ][ n3 ] ...   one flat, contiguous array
                  ^
                  child reference is just the integer 1`}
      />
      <P>
        All of this memory is owned by a single arena allocator. The parser asks the arena for
        storage as it grows the node array, and when the caller is done the entire tree is released
        in one operation.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub fn deinit(self: *const Tree) void {
    self.arena.deinit(); // frees every node, every list, every string at once
}`}
      />
      <P>
        This is the data-plane versus control-plane distinction in action. Setting up and tearing
        down the arena is the control plane, and it happens twice. Allocating individual nodes is
        the data plane, and it happens millions of times, so it must be nothing more than a bump of
        an index and an occasional geometric growth. Yuku estimates the node count from the source
        length and reserves the array up front, so appending a node finds the space already there.
        The append still checks capacity, but with the reservation in place it does not reallocate,
        so the allocator stays off the hot path while the bounds check keeps every write safe.
      </P>
      <P>
        The tree is built bottom up. A parse routine produces its children first and appends itself
        last. The append returns the new node’s index, and that integer is what the parent stores as
        a child, in place of the pointer the naive design would have used.
      </P>
      <CodeBlock
        lang="zig"
        code={`fn addNode(self: *Tree, node: Node) !NodeIndex {
    const index: NodeIndex = @enumFromInt(self.nodes.len);
    try self.nodes.append(self.arena.allocator(), node);
    return index;
}`}
      />
      <P>
        The parsing algorithm itself stays completely ordinary. Precedence climbing, the kernel of
        recursive descent, parses a left operand and then folds in each following operator whose
        precedence is high enough, minting one node per step. The only change from the textbook
        version is that <InlineCode>left</InlineCode> and <InlineCode>right</InlineCode> are{" "}
        <InlineCode>u32</InlineCode> indices rather than pointers.
      </P>
      <CodeBlock
        lang="zig"
        code={`fn parseExpr(self: *Parser, min_prec: u8) !NodeIndex {
    var left = try self.parsePrefix();                   // literal, identifier, paren group
    while (self.current.tag.precedence() > min_prec) {
        const op = self.current.tag;
        self.advance();
        const right = try self.parseExpr(op.precedence());   // a tighter-binding subexpression
        left = try self.addNode(.{ .binary = .{ .op = op, .left = left, .right = right } });
    }
    return left;
}`}
      />
      <P>The data structure is the exotic part. The algorithm running over it is not.</P>

      <H2>4. Struct of Arrays, and Choosing a Node Shape</H2>
      <P>
        A node logically carries two things, a payload that says what it is, and a source span that
        says where it is. Stored as an array of structs, those two travel together, and any pass
        that reads only one of them drags the other through the cache.
      </P>
      <P>
        The fix is to store the array as a struct of arrays. Instead of one array of{" "}
        <InlineCode>{"{ payload, span }"}</InlineCode> records, keep two parallel columns, one of
        payloads and one of spans. A pass that only switches on node kind touches one dense column.
        A pass that only reads spans touches the other. The same index addresses both.
      </P>
      <CodeBlock
        lang="text"
        code={`Array of structs (AoS)            Struct of arrays (SoA)

[payload|span][payload|span]...   payloads: [p0][p1][p2][p3]...
                                  spans:    [s0][s1][s2][s3]...
 ^ reading tags pulls spans        ^ reading tags touches only this column
   into cache as dead weight`}
      />
      <P>
        Now the interesting design decision. What goes in the payload column. There are two good
        answers, and the right one depends on who the consumer is.
      </P>
      <P>
        <Strong>The minimal node.</Strong> If the parser is an internal compiler frontend with no
        external consumers, you can make the node astonishingly small. Store a one-byte tag, one
        index to the node’s principal token, and an eight-byte data word, which is just two{" "}
        <InlineCode>u32</InlineCode> slots whose meaning is decided entirely by the tag. There is no
        span stored at all. The source location is recovered on demand from the principal token,
        re-lexing that single token only when an end position is actually needed.
      </P>
      <CodeBlock
        lang="zig"
        code={`// minimal internal node: every field is the smallest thing that works
const Node = struct {
    tag: Tag,        // 1 byte: the node kind, and the key to reading \`data\`
    main_token: u32, // the token this node hangs off, its location on demand
    data: [2]u32,    // two words whose meaning depends entirely on \`tag\`
};`}
      />
      <P>
        The data word carries no type of its own. The tag is what says how to read it, so every
        access goes through a <InlineCode>switch</InlineCode> on the tag. The same eight bytes are
        two child indices for one node kind, a range into a shared list of children for another, and
        unused for a leaf.
      </P>
      <CodeBlock
        lang="zig"
        code={`switch (tree.tag(node)) {
    // binary op: both words are indices of child nodes
    .add, .mul => {
        const left = tree.data(node)[0];
        const right = tree.data(node)[1];
    },
    // block: the two words are a (start, end) range into a shared array of
    // child indices, so the block's statements are extras[start..end]
    .block => {
        const range = tree.data(node);
        const statements = tree.extras[range[0]..range[1]];
    },
    // number literal: no children, the value is read from the token text
    .number => {
        const text = tree.tokenText(node.main_token);
    },
    else => {},
}`}
      />
      <P>
        <Strong>The self-describing node.</Strong> Yuku is not an internal frontend. It is a public
        parser whose AST is the API, consumed from JavaScript as a standard ESTree tree by external
        tools. That changes the calculus. The node has to carry its own span directly, because
        recovering positions by re-lexing on every query would be slow across a language boundary,
        and the payload should be self-describing so that a <InlineCode>switch</InlineCode> on it is
        exhaustive and typo-proof rather than a set of conventions a reader must memorize. So Yuku
        uses a tagged union for the payload and stores the span in its own column.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Node = struct {
    data: NodeData, // a tagged union, one variant per node kind, 44 bytes
    span: Span,     // { start: u32, end: u32 }, 8 bytes
};`}
      />
      <P>
        This costs more per node, and that cost is deliberate. The point is not that one shape is
        correct and the other is wrong. The point is that both shapes are the same idea, indices
        into flat columns, and they differ only in how much they specialize for their audience. The
        minimal node specializes for the compiler that wrote it. The self-describing node
        specializes for an external, polyglot, tooling audience that needs clarity, direct spans,
        and a shape that crosses a language boundary cheaply. You pick the point on that spectrum
        that your consumers justify, and not one byte more generous than that.
      </P>
      <Table
        head={["Design", "Bytes per node", "Spans", "Payload", "Best for"]}
        rows={[
          ["Minimal node", "~13", "recomputed", "per-tag data word", "internal compiler frontend"],
          [
            "Self-describing node",
            "~52",
            "stored",
            "tagged union",
            "public API and external tooling",
          ],
        ]}
      />
      <P>
        There is one more discipline that makes either choice safe over time. Pin the sizes with
        compile-time assertions, so that an innocent-looking field added to one variant cannot
        silently bloat every node in the program.
      </P>
      <CodeBlock
        lang="zig"
        code={`comptime {
    std.debug.assert(@sizeOf(NodeData) == 44);
    std.debug.assert(@sizeOf(Node) == 52);
}`}
      />
      <P>
        If a change pushes the union past its budget, the build fails immediately and points at the
        cost. The representation is no longer something you hope stays small. It is something the
        compiler enforces.
      </P>

      <H2>5. Variable-Length Children and the Side Table</H2>
      <P>
        A binary expression has exactly two children, and they fit inline. A block has any number of
        statements, a call has any number of arguments, a union type has any number of members.
        Those cannot live inline in a fixed-size node without sizing every node to the worst case.
      </P>
      <P>
        The solution is a second flat array, a side table, that holds every variadic child list
        packed back to back. A node that owns a list stores only a small descriptor, an offset and a
        length, into that table.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const IndexRange = struct { start: u32, len: u32 };

// In the Tree:
extras: std.ArrayList(NodeIndex), // every child list, concatenated

pub fn extra(self: *const Tree, range: IndexRange) []const NodeIndex {
    return self.extras.items[range.start..][0..range.len];
}`}
      />
      <CodeBlock
        lang="text"
        code={`node.body = IndexRange{ start: 12, len: 3 }

extras: ... [ s0 ][ s1 ][ s2 ] ...
             ^12  ^13  ^14
            the block's three statements, contiguous`}
      />
      <P>
        A list of any length costs eight bytes in the owning node. Resolving it is one slice with no
        indirection, and iterating it is a linear scan. The same pattern reappears wherever a node
        has a variable number of associated items. Yuku attaches comments to their host nodes with
        exactly this idea, using a prefix-sum offset array of length{" "}
        <InlineCode>node_count + 1</InlineCode> so that the comments of node{" "}
        <InlineCode>i</InlineCode> are the slice between offset <InlineCode>i</InlineCode> and
        offset <InlineCode>i + 1</InlineCode>. One representational trick, reused, instead of a
        bespoke structure per feature.
      </P>
      <P>
        The minimal-node design uses the same side table for a different purpose. When its
        eight-byte data word is not enough, the word holds an index into the side table where the
        node’s full set of fields is spelled out. The principle is identical. Inline the common,
        small, fixed case, and spill the variable case to a shared flat pool addressed by an offset.
      </P>

      <H2>6. Scratch Buffers and Amortization</H2>
      <P>
        Building a child list raises a question. The parser does not know a block’s statement count
        until it reaches the closing brace, so it cannot size the list in advance, yet it must not
        allocate a fresh growable list per block.
      </P>
      <P>
        The answer is a small set of reusable scratch buffers held on the parser itself. A list is
        gathered into a scratch buffer, and when it is complete it is flushed once into the side
        table. The scratch buffer is then reset, not freed, so the next list reuses the same memory.
      </P>
      <CodeBlock
        lang="zig"
        code={`fn parseBlock(self: *Parser) !IndexRange {
    const mark = self.scratch.begin();        // remember the current top
    defer self.scratch.reset(mark);           // restore it on the way out

    while (!self.atBlockEnd()) {
        const stmt = try self.parseStatement();
        try self.scratch.append(stmt);
    }
    return self.flushToExtras(self.scratch, mark); // one bulk copy into the side table
}`}
      />
      <P>
        Because each call records its own starting mark and resets to it, the same buffer nests
        recursively. An inner block parsed inside an outer block uses the tail of the buffer above
        the outer block’s region, and resetting restores the outer block’s view. A single buffer
        serves an entire recursive descent. Yuku keeps a few of these for different recursion
        contexts, plus two general-purpose ones so a single parser frame can assemble two lists at
        the same time, for example the static chunks and the interpolations of a template literal.
      </P>
      <P>
        This is amortization, which is the data plane done right. The expensive operation, growing a
        buffer, happens a handful of times across the whole parse rather than once per list. The hot
        operation, appending one child, is a bounds check and a store.
      </P>

      <H2>7. Strings Without Copies</H2>
      <P>
        Identifiers and string literals are everywhere, and the naive approach copies each lexeme
        into its own heap allocation. For a large file that is a great many small allocations and a
        great deal of duplicated text, since the same identifier appears again and again.
      </P>
      <P>A string in Yuku is not a pointer and a length. It is a pair of offsets.</P>
      <CodeBlock lang="zig" code={`pub const String = struct { start: u32, end: u32 };`} />
      <P>
        Those offsets resolve against one of two backing stores, and which one is decided by the
        offset itself, with no tag bit.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub fn get(pool: *const Pool, s: String) []const u8 {
    if (s.start < pool.source.len) {
        return pool.source[s.start..s.end];     // a slice of the original source, zero copy
    }
    const base = pool.source.len;
    return pool.extra.items[s.start - base .. s.end - base]; // an interned, owned slice
}`}
      />
      <P>
        The overwhelmingly common case is that a lexeme appears verbatim in the source. Its{" "}
        <InlineCode>String</InlineCode> is just the byte range it already occupies. No copy, no
        allocation. Only strings that do not exist contiguously in the source, an identifier written
        with a unicode escape, a string with decoded escapes, a name synthesized by a transform, are
        copied into the interned buffer, and those are deduplicated so a repeated synthetic name is
        stored once.
      </P>
      <P>
        This pairs with a lexer discipline that does only the work the task needs. The lexer never
        decodes a string or an identifier. It records the byte span and sets a flag if it saw an
        escape. Decoding happens later, lazily, and only for the small fraction of tokens that
        actually contain escapes. The common token, an ordinary identifier, costs nothing beyond
        noting where it starts and ends.
      </P>

      <H2>8. Tokens as Compact Records, and Metadata in the Bits</H2>
      <P>
        The same philosophy governs the token stream. A token is small and is copied often, so it
        must be tiny and must answer the parser’s frequent questions without a table lookup.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Token = struct {
    span: Span,    // 8 bytes
    tag: TokenTag, // 4 bytes
};
comptime { std.debug.assert(@sizeOf(Token) <= 16); }`}
      />
      <P>
        The most compact lexers go further and store only the start offset of each token, recovering
        the end by re-lexing that one token when an end is needed. That is the right trade for an
        internal frontend. A public parser that needs spans constantly stores both ends, which is
        the same audience-driven decision we made for nodes.
      </P>
      <P>
        The sharper idea is in the tag. A parser asks the same questions about a token over and
        over. What is its operator precedence. Is it a keyword. Is it a binary operator. Rather than
        answer those with branches or side tables, encode the answers directly into the bits of the
        tag’s integer value.
      </P>
      <CodeBlock
        lang="text"
        code={`TokenTag : u32

 bits  0..7   ordinal id (which token this is)
 bits  8..12  operator precedence
 bit  14      is binary operator
 bit  18      is identifier-like
 bit  21      is keyword
 ...`}
      />
      <P>Each query is then a single mask or shift, with no branch and no memory access.</P>
      <CodeBlock
        lang="zig"
        code={`pub inline fn precedence(self: TokenTag) u5 {
    return @intCast((@intFromEnum(self) >> 8) & 0b11111);
}
pub inline fn isKeyword(self: TokenTag) bool {
    return (@intFromEnum(self) & MASK_KEYWORD) != 0;
}`}
      />
      <P>
        The lexer also keeps a fast path for the dominant case. The most common transition between
        two tokens is a single space followed by an identifier or a single punctuator. That path is
        handled without entering the general whitespace-and-comment loop, and it falls back to the
        general loop the moment anything less trivial, a newline or a comment, might be present, so
        no information is ever lost. The CPU spends its time as a sprinter on the common case and
        only changes lanes when it must.
      </P>

      <H2>9. Unicode Without the Tax</H2>
      <P>
        Identifier scanning has to honor the full Unicode definition of identifier-start and
        identifier-continue, which spans the entire code point range. A literal lookup table over
        all code points would be enormous, and consulting it for every byte would tax the common
        case, which is plain ASCII.
      </P>
      <P>
        The structure that solves this has two levels. The code point space is divided into
        fixed-size chunks. A root table maps each chunk to a leaf, and identical leaves are
        deduplicated so the vast empty regions of the code point space cost almost nothing. Each
        leaf is a bitset, one bit per code point in the chunk. Membership is then two indexed loads
        and a bit test, over a table small enough to stay resident.
      </P>
      <CodeBlock
        lang="text"
        code={`code point ──► chunk = cp >> 9 ──► root[chunk] ──► leaf ──► bit (cp & 511) set?`}
      />
      <CodeBlock
        lang="zig"
        code={`fn inSet(root: []const u8, leaf: []const u64, cp: u21) bool {
    const chunk = root[cp >> 9];                  // which deduplicated leaf
    const word = leaf[chunk * 16 + ((cp >> 6) & 15)];
    return (word >> (cp & 63)) & 1 != 0;
}`}
      />
      <P>
        This table is itself generated by a small build-time program that reads the Unicode data and
        emits the two arrays as source. The cost of correctness is paid once, at build time, and the
        result is a compact constant. Crucially, the non-ASCII path is kept off the hot path
        entirely. ASCII identifier characters are classified by a plain two-hundred-fifty-six-entry
        table, and only a byte that is genuinely non-ASCII falls through to the trie. The common
        case never pays for the general case. That is the recurring theme. Do only the work the
        input in front of you requires.
      </P>

      <H2>10. The Tree as a Wire Format</H2>
      <P>
        Here the design pays its largest and least obvious dividend, and it is the place where it
        mattered most in practice. A native parser is fast at parsing. The cost that actually
        decides the user’s experience is usually somewhere else, in handing the result across a
        language boundary to the runtime that asked for it. For a parser consumed from JavaScript,
        that boundary is where most of the wall-clock time can disappear, and it is where a careless
        design quietly gives back everything the parse just won.
      </P>
      <P>
        The usual way to cross it is to serialize the AST to a JSON string in native code and call{" "}
        <InlineCode>JSON.parse</InlineCode> on the consumer side. It works, but the deserialization
        dominates, and its cost grows with the size of the tree, so it is slowest on exactly the
        large files where speed was supposed to matter. Building runtime objects one per node
        directly in native code has the same disease in another form. It holds thousands of handles,
        allocates per node, and couples the parser to one consumer’s object shape. Both are the
        pointer-tree mistake of section 2, relocated to the boundary.
      </P>
      <P>
        A flat AST avoids all of it, because a flat AST is already a wire format. A semantic model,
        and an AST in particular, is mostly integers. Children point to other nodes by index. Lists
        are offsets and lengths into a side table. Strings are offsets into a byte buffer. The
        scopes, symbols, and references that a later analysis layers on top are the same shape, each
        pointing at the next by index. Integers serialize for free. There are no pointers to fix up,
        no objects to chase, no graph to linearize, because the representation is already flat and
        already position-independent.
      </P>
      <P>
        So the parser does not build objects across the boundary at all. It copies its arrays into
        one contiguous binary buffer and lets the consumer decode lazily on its own side. The
        serialization is close to a memory copy. There is no intermediate JSON string and no second
        object graph, so there are no oversized allocations, and the buffer is only as large as the
        tree the source actually produces.
      </P>
      <CodeBlock
        lang="text"
        code={`transfer buffer

[ header ][ nodes ][ extras ][ string pool ][ comments ][ ... ]
   fixed    packed    flat       raw bytes
          records   u32 list`}
      />
      <P>
        Each node is packed into a fixed-width record, and the layout of that record is computed at
        compile time from the node definitions themselves. A boolean field claims one flag bit. An
        enumeration claims as many bits as its cardinality requires. A child index claims one word.
        A list claims a length and an offset. The function that computes where each field lands is
        shared by the writer, the reader, and the generator that emits the consumer’s decoder.
      </P>
      <CodeBlock
        lang="zig"
        code={`// the packed wire node, fixed width, all integers
const PackedNode = extern struct {
    tag: u8,
    flags: u16,       // booleans and small enums, bit-packed
    field0: u16,      // first list length, a common case, kept small
    slots: [8]u32,    // child indices, offsets, string handles
    span_start: u32,
    span_end: u32,
};

// a compile-time check that no node outgrows the wire format
comptime { validateAllNodeLayouts(); }`}
      />
      <P>
        On the consumer side the buffer is read through typed array views, with no parsing and no
        copy. Nodes are decoded into objects only when they are actually visited, and they are
        memoized by index so that a node reached by walking the tree and the same node returned by a
        query are the same object. Strings that point into the source are sliced from the original
        source text, which the consumer already holds, so they are never re-decoded. Source byte
        offsets and consumer string offsets coincide for the ASCII prefix of the file, so a position
        map is built only for the tail that follows the first non-ASCII byte, and a fully ASCII file
        pays nothing for position translation at all. The consumer pays for what it reads, not for
        the size of the tree.
      </P>
      <CodeBlock
        lang="js"
        code={`// the decoder reads fields straight out of the buffer, lazily
function decodeNode(i) {
    const base = nodesOffset + i * NODE_SIZE;
    const tag   = u32[base] & 0xff;
    const flags = u32[base] >>> 16;
    switch (tag) {
        case CALL: return {
            type: "CallExpression",
            callee: node(u32[base + 2]),          // recurse only when reached
            arguments: nodeList(u32[base + 1]),
            start: pos(u32[base + 10]),
            end: pos(u32[base + 11]),
        };
        // ...
    }
}`}
      />
      <P>
        The discipline that keeps this safe is compile-time layout sharing. The writer, the reader,
        and the generated decoder all derive their offsets and masks from the same node definitions,
        so they cannot drift, and the agreement is not a hope but a property the compiler enforces.
        That is what made it possible to validate the boundary the only way that counts. Across more
        than fifty thousand conformance cases, the tree decoded on the JavaScript side is exactly
        the tree the parser built in Zig, node for node.
      </P>
      <P>
        And JavaScript is only the most visible consumer. The same property that makes that handoff
        cheap, a tree of flat, position-independent integers rather than a graph of pointers, makes
        the buffer useful far beyond any one boundary. It can be written to disk and memory-mapped
        straight back in, cached between runs and reloaded without re-parsing, streamed over a pipe
        or a socket to another process, shared read-only across threads, or handed to a tool written
        in any other language, with no serialization step and no fixup pass anywhere. A pointer
        graph offers none of this. The buffer is the tree, so anywhere you can put bytes, you can
        put the tree.
      </P>
      <P>
        The result is native parsing speed with ordinary-object ergonomics on the consumer side, a
        handoff whose cost scales with what the consumer reads rather than with the size of the AST,
        and a wire format provably synchronized with the code that reads it. None of it required a
        serialization framework. It fell out of the decision, made at the very start, to represent
        the tree as flat arrays of indices rather than a graph of pointers.
      </P>

      <H2>11. Principles</H2>
      <P>
        The techniques above are particular. The principles behind them are general, and they are
        what transfer to any parser or compiler frontend.
      </P>
      <Ol>
        <Li>
          <Strong>Design the data first.</Strong> Choose the representation from the access pattern
          and the hardware, then build the algorithms to serve it. The data structure is the
          architecture.
        </Li>
        <Li>
          <Strong>Indices, not pointers.</Strong> Flat arrays addressed by integers are smaller,
          position independent, cache friendly, trivially freed in bulk, and serializable without a
          fixup pass.
        </Li>
        <Li>
          <Strong>Separate the control plane from the data plane.</Strong> One-time setup can be
          safe and slow. Per-node and per-byte work must be tight. Move all the branching and
          allocation to the boundary and keep the hot loops linear.
        </Li>
        <Li>
          <Strong>Do only the work the input requires.</Strong> Defer decoding, classify the common
          case with a cheap path, and pay for the general case only when the input forces it.
        </Li>
        <Li>
          <Strong>Amortize.</Strong> Reserve capacity ahead of time, reuse scratch buffers instead
          of reallocating, and batch the expensive operations so they happen a handful of times, not
          millions.
        </Li>
        <Li>
          <Strong>Put a bound on everything,</Strong> and make the important invariants compile-time
          checks. A size that the compiler enforces will not regress. A layout that one tool owns
          cannot drift.
        </Li>
      </Ol>

      <H2>12. Conclusion</H2>
      <P>
        A fast parser is not the product of a clever algorithm bolted onto an ordinary data
        structure. It is the product of an ordinary algorithm, recursive descent, running over a
        data structure designed for the machine. Once the AST is a flat set of arrays addressed by
        indices, the lexer becomes a span recorder, strings become offsets, and serialization across
        a language boundary becomes a memory copy. Problems that look unrelated in the textbook
        design turn out to be the same problem, and one representational decision solves all of them
        at once.
      </P>
      <P>
        Yuku is the embodiment of this discipline, and it is why a parser written by one person
        keeps pace with and outruns the established tools. The grammar was never the hard part. The
        data was. Design the data, and the speed is already there waiting for you.
      </P>
    </>
  ),
} satisfies Writing;

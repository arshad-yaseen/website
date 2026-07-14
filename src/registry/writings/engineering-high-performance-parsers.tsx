import { CodeBlock } from "@/components/docs/code-block";
import { A, H2, InlineCode, Li, P, Strong, Ul } from "@/components/docs/prose";
import type { Writing } from "../types";

export default {
  slug: "engineering-high-performance-parsers",
  title: "Engineering High-Performance Parsers with Data-Oriented Design",
  description:
    "Notes from building Yuku: the AST is flat arrays of u32 indices instead of a pointer tree, and memory layout, allocation, strings, unicode, and serialization all follow from that one decision.",
  date: "2026-06-28",
  body: (
    <>
      <P>
        <A href="https://yuku.fyi">Yuku</A> is a JavaScript/TypeScript parser written in Zig that
        runs 3–10x faster than the alternatives on npm. I wrote it alone, and it keeps pace with
        parsers built by teams. The grammar was never the hard part. Recursive descent is a solved
        problem; you can transcribe it from the ECMAScript spec. What decides whether the parser is
        fast is a question the spec says nothing about: what does a node{" "}
        <Strong>look like in memory</Strong>?
      </P>
      <P>Two hardware facts drive everything below.</P>
      <Ul>
        <Li>
          A load that misses cache and goes to main memory costs on the order of 100ns. Arithmetic
          costs a fraction of a nanosecond. A program that chases pointers through scattered heap
          objects spends its life stalled on loads.
        </Li>
        <Li>
          A general-purpose allocator call costs tens to hundreds of nanoseconds and scatters
          related objects across the address space. A parser that allocates per node pays this tens
          of thousands of times per file.
        </Li>
      </Ul>
      <P>
        Yuku budgets roughly one AST node per two source bytes, so a 100 KB file means ~50,000
        nodes. Built the textbook way, that is 50,000 allocations, 50,000 frees, and every traversal
        afterward is a pointer chase through cold memory. Built as flat arrays, it is a handful of
        allocations, linear scans, and one free.
      </P>

      <H2>What the pointer tree costs</H2>
      <P>The textbook AST in a native language looks like this:</P>
      <CodeBlock
        lang="zig"
        code={`const Node = union(enum) {
    binary: struct { op: Op, left: *Node, right: *Node },
    call: struct { callee: *Node, args: []*Node },
    identifier: struct { name: []const u8 },
    // ...
};`}
      />
      <P>
        It is correct and readable, and everything about it is hostile to the machine. Every{" "}
        <InlineCode>*Node</InlineCode> is a separate allocation. Every edge is 8 bytes of pointer,
        often more than the payload it points to. The children live wherever the allocator put them,
        so walking the tree is a series of unpredictable loads the prefetcher can do nothing with.
        And because the structure is full of absolute addresses, it is welded to one address space:
        you cannot write it to disk, share it between processes, or hand it to another language
        without a deep copy.
      </P>
      <P>None of these costs come from the grammar. They come from the representation.</P>

      <H2>Indices, not pointers</H2>
      <P>
        Yuku replaces every pointer with an integer index into one flat array. This is the actual
        definition:
      </P>
      <CodeBlock
        lang="zig"
        code={`/// Index into the AST node array.
pub const NodeIndex = enum(u32) { null = std.math.maxInt(u32), _ };`}
      />
      <P>
        Half the size of a pointer, position-independent, and with a reserved value for &ldquo;no
        child&rdquo; so optional children cost nothing extra. The tree itself is a handful of arrays
        plus the arena that owns them:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Tree = struct {
    /// Index of the root node (always a \`program\` node).
    root: NodeIndex = undefined,
    /// All nodes in the AST.
    nodes: std.MultiArrayList(Node) = .empty,
    /// Backing storage for variadic node children.
    extras: std.ArrayList(NodeIndex) = .empty,
    /// String pool for AST node string fields.
    strings: ASTStringPool = .{},
    /// Arena allocator owning all the memory.
    arena: std.heap.ArenaAllocator,

    pub fn deinit(self: *const Tree) void {
        self.arena.deinit(); // the whole tree, freed in one call
    }
};`}
      />
      <P>
        A node is a tagged union plus a source span, and the sizes are pinned by the compiler so a
        field added to one variant cannot silently bloat all 50,000 nodes:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Node = struct {
    data: NodeData, // tagged union, one variant per node kind
    span: Span,     // { start: u32, end: u32 }
};

comptime {
    std.debug.assert(@sizeOf(NodeData) == 44);
    std.debug.assert(@sizeOf(Node) == 52);
}`}
      />
      <P>
        <InlineCode>std.MultiArrayList</InlineCode> stores this as a struct of arrays: one column of
        payloads, one column of spans, the same index into both.
      </P>
      <CodeBlock
        lang="text"
        code={`array of structs                      struct of arrays

[ data | span ][ data | span ] ...    data: [ d0 ][ d1 ][ d2 ] ...
                                      span: [ s0 ][ s1 ][ s2 ] ...

reading node kinds drags every        a kind-only pass reads one
span into cache as dead weight        dense column and nothing else`}
      />
      <P>
        A pass that only switches on node kind never drags spans through the cache, and vice versa:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub inline fn data(self: *const Tree, index: NodeIndex) NodeData {
    return self.nodes.items(.data)[@intFromEnum(index)];
}

pub inline fn span(self: *const Tree, index: NodeIndex) Span {
    return self.nodes.items(.span)[@intFromEnum(index)];
}`}
      />
      <P>
        Appending a node is a bump of a length. The parser estimates the node count from the source
        length up front, so the capacity check almost never fails and the allocator stays off the
        hot path entirely:
      </P>
      <CodeBlock
        lang="zig"
        code={`const estimated_nodes = if (source_len < 512_000)
    @max(256, source_len / 2)
else
    source_len / 4;
try self.tree.nodes.ensureTotalCapacity(alloc, estimated_nodes);`}
      />
      <P>
        The array only grows and is never compacted, so an index stays valid for the life of the
        tree. Construction is bottom-up: a parse routine builds its children first, appends itself,
        and returns its index for the parent to store. The recursive descent on top is completely
        ordinary; the only difference from the textbook version is that{" "}
        <InlineCode>left</InlineCode> and <InlineCode>right</InlineCode> are integers.
      </P>
      <P>
        Here is what that actually produces. Parsing <InlineCode>let x = 1 + 2;</InlineCode> yields
        seven nodes:
      </P>
      <CodeBlock
        lang="text"
        code={`let x = 1 + 2;
0   4   8   12    byte offsets

nodes                                                         span
[0] binding_identifier   { name = source[4..5] }              4..5
[1] numeric_literal      { raw  = source[8..9] }              8..9
[2] numeric_literal      { raw  = source[12..13] }            12..13
[3] binary_expression    { left = 1, right = 2, op = + }      8..13
[4] variable_declarator  { id = 0, init = 3 }                 4..13
[5] variable_declaration { kind = let,
                           declarators = extras[0..1] }       0..14
[6] program              { body = extras[1..2] }              0..14

extras  [ 4 ][ 5 ]
          |    program body
          declarator list`}
      />
      <P>
        Everything from the previous sections is visible in this little dump. Children precede their
        parents, and the root is the last node appended. Every edge is a small integer:{" "}
        <InlineCode>binary_expression</InlineCode> holds <InlineCode>1</InlineCode> and{" "}
        <InlineCode>2</InlineCode>, not addresses. The identifier&rsquo;s name is not a copied
        string but the byte range <InlineCode>4..5</InlineCode> of the source. And the two
        variable-length lists live in <InlineCode>extras</InlineCode>, referenced by offset and
        length. The whole tree is a few dozen integers in two flat arrays.
      </P>
      <P>
        You can push this further. If the parser is an internal frontend with no external consumers,
        nothing forces a node to describe itself, and it can shrink to around 13 bytes:
      </P>
      <CodeBlock
        lang="zig"
        code={`const Node = struct {
    tag: Tag,        // 1 byte: node kind, and the key to reading \`data\`
    main_token: u32, // the token this node hangs off
    data: [2]u32,    // two words whose meaning depends on \`tag\`
};`}
      />
      <P>
        The data word has no type of its own; the tag says how to read it, so every access goes
        through a <InlineCode>switch</InlineCode>:
      </P>
      <CodeBlock
        lang="zig"
        code={`switch (tree.tag(node)) {
    // binary op: both words are child indices
    .add, .mul => {
        const left = tree.data(node)[0];
        const right = tree.data(node)[1];
    },
    // block: the words are a (start, end) range into extras
    .block => {
        const range = tree.data(node);
        const statements = tree.extras[range[0]..range[1]];
    },
    else => {},
}`}
      />
      <P>
        No span is stored at all; a position is recovered by re-lexing the main token on the rare
        occasion one is needed. I didn&rsquo;t take that trade for Yuku, whose AST is a public API
        consumed from JavaScript as ESTree: positions are queried constantly, and a set of per-tag
        conventions is hostile to external readers, so it spends 52 bytes on a self-describing union
        with stored spans. Both designs are the same idea; they differ only in how much the consumer
        is willing to recompute.
      </P>

      <H2>Variable-length children</H2>
      <P>
        A binary expression has exactly two children and they fit in the node. A block has any
        number of statements. Rather than size every node for the worst case, variadic children go
        into one shared array, and the owning node stores an 8-byte descriptor:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const IndexRange = struct { start: u32, len: u32 };

/// Returns the extra node indices for the given range.
pub inline fn extra(self: *const Tree, range: IndexRange) []const NodeIndex {
    return self.extras.items[range.start..][0..range.len];
}`}
      />
      <P>
        Building those lists has a wrinkle: the parser doesn&rsquo;t know a block&rsquo;s statement
        count until it hits the closing brace, and it must not allocate a growable list per block.
        The fix is a scratch buffer owned by the parser, used as a stack:
      </P>
      <CodeBlock
        lang="zig"
        code={`const ScratchBuffer = struct {
    items: std.ArrayList(ast.NodeIndex) = .empty,

    pub inline fn begin(self: *ScratchBuffer) usize {
        return self.items.items.len;
    }
    pub inline fn reset(self: *ScratchBuffer, checkpoint: usize) void {
        self.items.shrinkRetainingCapacity(checkpoint);
    }
};`}
      />
      <CodeBlock
        lang="zig"
        code={`pub fn parseBody(self: *Parser, terminator: ?TokenTag) !ast.IndexRange {
    const checkpoint = self.scratch_statements.begin();
    defer self.scratch_statements.reset(checkpoint);

    while (!self.isAtBodyEnd(terminator)) {
        const statement = try statements.parseStatement(self, .{});
        try self.scratch_statements.append(self.allocator(), statement);
    }
    // one bulk copy into tree.extras
    return self.flushToExtras(&self.scratch_statements, checkpoint);
}`}
      />
      <P>
        Because every call records its own checkpoint and resets to it on the way out, the same
        buffer nests through recursion: an inner block uses the tail above the outer block&rsquo;s
        region and restores it when done. Growing the buffer happens a few times per parse;
        appending a child is a bounds check and a store. Yuku keeps five of these for contexts that
        need to assemble lists concurrently (statements, cover grammars, decorators, and two
        general-purpose ones).
      </P>
      <P>
        The same offset-and-length trick reappears wherever a node owns a variable number of things.
        Comments attach to nodes through a prefix-sum array of length{" "}
        <InlineCode>node_count + 1</InlineCode>: node <InlineCode>i</InlineCode>&rsquo;s comments
        are the slice between offsets <InlineCode>i</InlineCode> and <InlineCode>i + 1</InlineCode>.
        One representation, reused.
      </P>

      <H2>Strings are offsets</H2>
      <P>
        The naive parser copies every identifier and string literal into its own heap allocation.
        But nearly every string the parser produces already exists, verbatim, in the source text it
        was given. So a string in Yuku is two offsets, and which backing store they point into is
        encoded in the offsets themselves:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const String = struct { start: u32, end: u32 };

pub fn get(self: *const ASTStringPool, id: String) []const u8 {
    if (id.start == id.end) return "";
    const src_len: u32 = @intCast(self.source.len);
    if (id.start < src_len) {
        return self.source[id.start..id.end]; // slice of the source, zero copy
    }
    return self.extra.items[id.start - src_len .. id.end - src_len];
}`}
      />
      <P>
        Offsets below <InlineCode>source.len</InlineCode> are source slices and cost nothing.
        Offsets past it land in a small interned pool that holds the exceptions: identifiers written
        with unicode escapes, string literals whose escapes had to be decoded, names synthesized by
        transforms. The pool deduplicates through a hash map keyed by content, so a repeated
        synthetic name is stored once.
      </P>
      <P>
        This only works because the lexer refuses to do work up front. It never decodes anything; it
        records a span and sets a flag if it saw a backslash. Decoding happens at the moment a name
        is actually needed, and only for the rare token that needs it:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub inline fn identifierName(self: *Parser, token: Token) !ast.String {
    if (token.isEscaped()) // rare: decode into the pool
        return self.decodeEscapedIdentifier(token.span.start, token.span.end);
    // common: the name is the source bytes themselves
    return self.tree.sourceSlice(token.span.start, token.span.end);
}`}
      />

      <H2>Answers in the token&rsquo;s bits</H2>
      <P>A token is three fields, and its size is enforced the same way as the node&rsquo;s:</P>
      <CodeBlock
        lang="zig"
        code={`pub const Token = struct {
    span: Span,    // { start: u32, end: u32 }
    tag: TokenTag,
    flags: u8 = 0, // line_terminator_before, escaped, ...
};

comptime {
    std.debug.assert(@sizeOf(Token) <= 16);
}`}
      />
      <P>
        (You can shrink this too: store only the start offset and re-lex one token whenever an end
        is needed. Same trade as the minimal node above, and rejected for the same reason: a public
        parser queries spans constantly.)
      </P>
      <P>
        The interesting part is the tag. The parser asks the same questions of every token: what is
        its precedence, is it a binary operator, is it a keyword. Instead of answering with branches
        or lookup tables, the answers are encoded in the tag&rsquo;s integer value at declaration:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Mask = struct {
    pub const IsBinaryOp: u32 = 1 << 14;
    pub const IsUnaryOp: u32 = 1 << 16;
    pub const IsIdentifierLike: u32 = 1 << 18;
    pub const IsKeyword: u32 = 1 << 21;
    pub const PrecShift: u32 = 8; // bits 8..12 hold precedence
};

pub const TokenTag = enum(u32) {
    // low 8 bits: ordinal. the rest: precomputed answers.
    plus = 15 | (11 << Mask.PrecShift) | Mask.IsBinaryOp | Mask.IsUnaryOp,
    star = 17 | (12 << Mask.PrecShift) | Mask.IsBinaryOp,
    in = 119 | (9 << Mask.PrecShift) | Mask.IsBinaryOp | Mask.IsKeyword
        | Mask.IsIdentifierLike | Mask.IsUnconditionallyReserved,
    // ...

    pub fn precedence(self: TokenTag) u5 {
        return @intCast((@intFromEnum(self) >> Mask.PrecShift) & 0b11111);
    }
    pub fn isBinaryOperator(self: TokenTag) bool {
        return (@intFromEnum(self) & Mask.IsBinaryOp) != 0;
    }
};`}
      />
      <P>
        The precedence-climbing loop at the core of expression parsing runs these queries once per
        operator. Each one is a shift and a mask on a value already in a register. No table, no
        branch, no load.
      </P>

      <H2>Unicode identifiers without paying for them</H2>
      <P>
        JavaScript identifiers are not ASCII. The spec defines them by the Unicode{" "}
        <InlineCode>ID_Start</InlineCode> and <InlineCode>ID_Continue</InlineCode> properties, so{" "}
        <InlineCode>π</InlineCode>, <InlineCode>変数</InlineCode>, and a few hundred thousand other
        code points are legal, and the lexer needs an exact membership test over the full code point
        range. Concretely it needs two functions:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub fn canStartId(cp: u32) bool;    // may a codepoint begin an identifier?
pub fn canContinueId(cp: u32) bool; // may it appear after the first?`}
      />
      <P>
        The obvious implementation is one bit per code point. The code point space runs to{" "}
        <InlineCode>0x10FFFF</InlineCode>, so that is 256 KB per property, 512 KB for both. It
        works, but a table that size does not stay in cache, and a lexer consults it constantly.
      </P>
      <P>
        The observation that fixes it: the bitset is wildly repetitive. Slice the code point space
        into chunks of 512, and most chunks are identical, entire unassigned planes are all zeros,
        long ideograph ranges are all ones, and many patterns repeat. Yuku&rsquo;s tables, generated
        from Unicode 17.0, contain 4,096 chunks of which only <Strong>79</Strong> are distinct for{" "}
        <InlineCode>ID_Start</InlineCode> and <Strong>86</Strong> for{" "}
        <InlineCode>ID_Continue</InlineCode>.
      </P>
      <P>
        So: store each distinct 512-bit pattern once (a &ldquo;leaf&rdquo;), and keep a root array
        of 4,096 bytes mapping each chunk to its leaf. Since there are fewer than 256 distinct
        leaves, the root entry fits in a <InlineCode>u8</InlineCode>. Both properties together come
        to about 29 KB instead of 512 KB, small enough to stay resident. This is the entire lookup:
      </P>
      <CodeBlock
        lang="zig"
        code={`inline fn queryBitTable(cp: u32, comptime root: []const u8, comptime leaf: []const u64) bool {
    const chunk_idx = cp / 512;                       // which 512-codepoint chunk
    const leaf_base = @as(u32, root[chunk_idx]) * 16; // where its pattern lives
    const offset_in_chunk = cp % 512;
    const word = leaf[leaf_base + offset_in_chunk / 32];
    const bit: u5 = @truncate(offset_in_chunk % 32);
    return (word >> bit) & 1 == 1;
}`}
      />
      <P>
        Walk it once by hand for <InlineCode>π</InlineCode> (U+03C0, code point 960):
      </P>
      <CodeBlock
        lang="text"
        code={`cp        = 960
chunk_idx = 960 / 512  = 1          codepoints 512..1023
root[1]   = 1                        this chunk uses leaf pattern #1
leaf_base = 1 * 16     = 16          pattern #1 starts at word 16
offset    = 960 % 512  = 448
word      = leaf[16 + 448/32] = leaf[30]
bit       = 448 % 32   = 0
(leaf[30] >> 0) & 1    = 1           π may start an identifier`}
      />
      <P>
        Two dependent loads from small, hot tables and a bit test. No branches, no binary search
        over ranges. The tables are emitted as plain source by a build-time program (
        <InlineCode>tools/gen_unicode_id.zig</InlineCode>) that downloads the Unicode character
        database, parses <InlineCode>DerivedCoreProperties.txt</InlineCode>, builds the chunks, and
        deduplicates them with a hash map. Correctness is settled once at build time; the runtime
        sees two constant arrays.
      </P>
      <P>
        Just as important is what never touches these tables. ASCII is classified by a 256-entry
        boolean table built at compile time, and the identifier scanner runs on that table until it
        hits a byte with the high bit set:
      </P>
      <CodeBlock
        lang="zig"
        code={`const ident_start_table_ascii: [256]bool = blk: {
    var t = [_]bool{false} ** 256;
    for ('a'..('z' + 1)) |c| t[c] = true;
    for ('A'..('Z' + 1)) |c| t[c] = true;
    t['_'] = true;
    t['$'] = true;
    break :blk t;
};`}
      />
      <CodeBlock
        lang="zig"
        code={`// the hot loop of identifier scanning
while (pos < src.len and ident_continue_table_ascii[src[pos]]) {
    pos += 1;
}
// ...
if (c >= 0x80) {
    @branchHint(.cold);
    const cp = try util.Utf.codePointAt(src, pos);
    if (util.UnicodeId.canContinueId(cp.value)) {
        pos += cp.len;
        continue;
    }
}`}
      />
      <P>
        A file that is pure ASCII, which is nearly every file, never executes the unicode path at
        all. The general case is fully supported and the common case never pays for it.
      </P>

      <H2>The tree is its own wire format</H2>
      <P>
        Here the flat representation pays its largest dividend. Yuku&rsquo;s primary consumer is
        JavaScript: the native parser runs, and Node needs the AST as ordinary objects. This
        boundary is where native tooling usually loses. The common approach, serialize to JSON in
        native code, <InlineCode>JSON.parse</InlineCode> on the other side, spends more time
        deserializing than the parse took. Building JS objects one at a time through N-API is worse.
      </P>
      <P>
        But look at what the tree contains. Children are <InlineCode>u32</InlineCode> indices. Lists
        are offsets into <InlineCode>extras</InlineCode>. Strings are offsets into the source. There
        is not a single pointer anywhere. The tree is{" "}
        <Strong>already position-independent bytes</Strong>, which means serialization is not a
        transformation, it is a copy. Yuku packs everything into one buffer and returns it to JS as
        an <InlineCode>ArrayBuffer</InlineCode>:
      </P>
      <CodeBlock
        lang="text"
        code={`header | nodes | extras | string pool | comments | diagnostics
fixed    48 B     raw u32s  raw bytes
         each     (memcpy)  (memcpy)`}
      />
      <P>Each node becomes a fixed 48-byte record:</P>
      <CodeBlock
        lang="zig"
        code={`const PackedNode = extern struct {
    tag: u8,
    _pad0: u8 = 0,
    flags: u16,  // packed bools and small enums
    field0: u16, // length of the node's first IndexRange
    _pad1: u16 = 0,
    field1: u32, field2: u32, field3: u32, field4: u32,
    field5: u32, field6: u32, field7: u32, field8: u32,
    span_start: u32,
    span_end: u32,
};`}
      />
      <P>
        How each AST struct maps into that record is not written by hand. It is derived at compile
        time from the struct declarations themselves: a <InlineCode>bool</InlineCode> field claims
        the next flag bit, an enum claims <InlineCode>ceil(log2(n))</InlineCode> bits, a{" "}
        <InlineCode>NodeIndex</InlineCode> claims one <InlineCode>u32</InlineCode> slot, a{" "}
        <InlineCode>String</InlineCode> two. The encoder, the Zig decoder, and the generator that
        emits the JavaScript decoder all call the same layout functions, so the three cannot
        disagree. And the budget is enforced where it belongs:
      </P>
      <CodeBlock
        lang="zig"
        code={`comptime {
    // any AST struct needing more than 8 u32 slots
    // or 16 flag bits fails the build, by name.
    validateAllNodeLayouts();
}`}
      />
      <P>
        On the JavaScript side there is no parsing step. The decoder reads fields straight out of
        the buffer through typed-array views, one <InlineCode>switch</InlineCode> case per node
        kind, generated from the Zig definitions:
      </P>
      <CodeBlock
        lang="js"
        code={`const _u32 = new Int32Array(buffer);

function _decode(i) {
  const b = (_nodesOff + i * 48) >> 2;
  const tag = _u32[b] & 255;
  const f1 = _u32[b + 2], f2 = _u32[b + 3]; // u32 slots
  switch (tag) {
    // one case per node kind, emitted by tools/estree/decoder.zig
  }
}`}
      />
      <P>
        Strings never cross the boundary at all: the JS caller already holds the source string, so a
        name is <InlineCode>source.slice(start, end)</InlineCode>. The one genuine mismatch is
        positions, Zig spans are UTF-8 byte offsets, JS wants UTF-16 code unit offsets. The header
        records the offset of the first non-ASCII byte; below it the two coincide, and a translation
        map is built only for the tail past it. An all-ASCII file skips even that.
      </P>
      <P>
        This is validated the only way that counts: the conformance suite runs 53,000+ cases and
        compares the tree decoded in JavaScript against the expected ESTree output node for node, at
        100%. And because the buffer is position-independent bytes, JavaScript is just one consumer.
        The same buffer deserializes back into a Zig <InlineCode>Tree</InlineCode> for the codegen
        path, and could as easily be cached to disk and mapped back in, or shared read-only across
        threads. The buffer is the tree.
      </P>

      <H2>What generalizes</H2>
      <P>
        Nothing above is specific to JavaScript, and most of it is not specific to parsing. Any
        system that builds a large structure once and traverses it many times, compiler frontends,
        query planners, game entity systems, wins from the same small set of moves:
      </P>
      <Ul>
        <Li>
          <Strong>Choose the representation from the access pattern,</Strong> then write the
          algorithms to fit. The algorithm on top of Yuku is textbook recursive descent; only the
          data is unusual.
        </Li>
        <Li>
          <Strong>Indices over pointers.</Strong> Smaller, position-independent, bulk-freeable,
          serializable with a copy.
        </Li>
        <Li>
          <Strong>Amortize.</Strong> Reserve from an estimate, reuse scratch space, batch the rare
          expensive operation out of the hot loop.
        </Li>
        <Li>
          <Strong>Never let the common case pay for the general one.</Strong> ASCII before unicode
          tables, source slices before interning, spans recorded before escapes decoded.
        </Li>
        <Li>
          <Strong>Make the invariants compile-time checks.</Strong> A node size the compiler asserts
          cannot regress. A wire layout derived from one definition cannot drift.
        </Li>
      </Ul>
      <P>
        A fast parser is not a clever algorithm bolted onto an ordinary data structure. It is an
        ordinary algorithm running over a data structure shaped for the machine. Design the data
        first and the speed is mostly already there.
      </P>
    </>
  ),
} satisfies Writing;

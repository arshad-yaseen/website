import { CodeBlock } from "@/components/docs/code-block";
import { A, H2, H3, InlineCode, Li, P, Strong, Table, Ul } from "@/components/docs/prose";
import type { Writing } from "../types";

export default {
  slug: "data-oriented-design-in-yukus-parser",
  title: "Data-Oriented Design in Yuku's Parser",
  description:
    "How Yuku stores a JavaScript AST as flat arrays of u32 indices instead of a pointer tree, and what follows from that in allocation, lists, backtracking, strings, and the trip into JavaScript.",
  date: "2026-06-28",
  body: (
    <>
      <P>
        <A href="https://yuku.fyi">Yuku</A> is a JavaScript and TypeScript parser I write in Zig. It
        gets through{" "}
        <A href="https://raw.githubusercontent.com/yuku-toolchain/parser-benchmark-files/refs/heads/main/typescript.js">
          <InlineCode>typescript.js</InlineCode>
        </A>
        , an 8 MB file, in{" "}
        <A href="https://github.com/yuku-toolchain/ecmascript-parser-benchmark-native">
          about 19 ms
        </A>{" "}
        on my M3. The grammar was never the interesting part of that. Recursive descent is in every
        textbook and you can more or less transcribe it from the ECMAScript spec. What decides
        whether a parser is fast is a question the spec never asks: what does a node look like in
        memory, and who allocates it.
      </P>
      <P>
        The answer isn&rsquo;t mine. The Zig compiler stores its AST as flat arrays of indices, and
        I learned the technique by reading it, along with{" "}
        <A href="https://vimeo.com/649009599">Andrew Kelley&rsquo;s talk on data-oriented design</A>
        , where the reasoning is laid out properly. Yuku applies the same idea with a looser grip
        than Zig does, on purpose. The last section is about exactly where, and why.
      </P>
      <Ul>
        <Li>
          <A href="#what-the-pointer-tree-costs">What the pointer tree costs</A>
        </Li>
        <Li>
          <A href="#indices-not-pointers">Indices, not pointers</A>
        </Li>
        <Li>
          <A href="#variable-length-children">Variable-length children</A>
        </Li>
        <Li>
          <A href="#backtracking-is-just-truncation">Backtracking is just truncation</A>
        </Li>
        <Li>
          <A href="#strings-are-offsets">Strings are offsets</A>
        </Li>
        <Li>
          <A href="#answers-baked-into-the-token-tag">Answers baked into the token tag</A>
        </Li>
        <Li>
          <A href="#unicode-identifiers-without-paying-for-them">
            Unicode identifiers without paying for them
          </A>
        </Li>
        <Li>
          <A href="#the-tree-is-its-own-wire-format">The tree is its own wire format</A>
        </Li>
        <Li>
          <A href="#where-yuku-holds-the-idea-more-loosely-than-zig">
            Where Yuku holds the idea more loosely than Zig
          </A>
        </Li>
        <Li>
          <A href="#what-generalizes">What generalizes</A>
        </Li>
      </Ul>

      <H2>What the pointer tree costs</H2>
      <P>The AST most of us write first looks like this:</P>
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
        Nothing wrong with it as a description of the grammar. It&rsquo;s just bad for the machine,
        and you don&rsquo;t feel it until the file gets big. Yuku produces 852,919 nodes for{" "}
        <InlineCode>typescript.js</InlineCode>, roughly one per ten bytes of source. In the pointer
        version every one is a separate <InlineCode>malloc</InlineCode>. At tens of nanoseconds a
        call, that&rsquo;s tens of milliseconds spent asking for memory, and a similar bill to give
        it back, for a parse that should take 19 ms in total.
      </P>
      <P>
        Then the nodes live wherever the allocator felt like putting them. Every later walk is a
        chain of dependent loads to addresses the CPU can&rsquo;t predict. A miss to main memory
        costs around 100 ns; arithmetic costs a fraction of one. A traversal over 850k scattered
        nodes spends most of its life stalled.
      </P>
      <P>
        The third cost is easy to miss: the tree is full of absolute addresses, so it&rsquo;s welded
        to one process. You can&rsquo;t write it to a file, map it back in, or hand it to another
        language without rebuilding it object by object. For Yuku that last one matters most,
        because JavaScript is the main consumer.
      </P>
      <P>None of these costs come from the grammar. They all come from the representation.</P>

      <H2>Indices, not pointers</H2>
      <P>
        Every pointer becomes a <InlineCode>u32</InlineCode> index into one flat array:
      </P>
      <CodeBlock
        lang="zig"
        code={`/// Index into the AST node array.
pub const NodeIndex = enum(u32) { null = std.math.maxInt(u32), _ };`}
      />
      <P>
        Half the size of a pointer, indifferent to which address space it lives in, and the max
        value is reserved for &ldquo;no child&rdquo; so an optional child costs nothing extra. The
        tree is a handful of arrays plus the arena that owns them:
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
    strings: StringPool = .{},
    /// The original source text passed to the parser.
    source: []const u8 = "",
    /// Arena allocator owning all the memory.
    arena: std.heap.ArenaAllocator,

    pub fn deinit(self: *const Tree) void {
        self.arena.deinit(); // the whole tree, freed in one call
    }
};`}
      />
      <P>
        That <InlineCode>deinit</InlineCode> is the first thing you get for free. Nodes, lists,
        pooled strings and diagnostics all live in one arena, so 850,000 frees become one.
      </P>
      <P>
        A node is a tagged union plus a source span, and I pin both sizes with compile-time asserts
        so a field added to one variant can&rsquo;t quietly grow all 850k nodes. A field is cheap to
        add; 850,000 copies of it are not.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Node = struct {
    data: NodeData, // tagged union, one variant per node kind (171 of them)
    span: Span,     // { start: u32, end: u32 }, byte offsets into source
};

pub const BinaryExpression = struct {
    left: NodeIndex,
    right: NodeIndex,
    operator: BinaryOperator,
};

comptime {
    std.debug.assert(@sizeOf(NodeData) == 44);
    std.debug.assert(@sizeOf(Node) == 52);
}`}
      />
      <P>
        Here&rsquo;s what that produces. <InlineCode>let x = 1 + 2;</InlineCode>, dumped straight
        out of the parser:
      </P>
      <CodeBlock
        lang="text"
        code={`let x = 1 + 2;
0   4   8   12    byte offsets

[0] binding_identifier     4..5    name=4..5 ("x")
[1] numeric_literal        8..9    raw=8..9 ("1")
[2] numeric_literal        12..13  raw=12..13 ("2")
[3] binary_expression      8..13   left=1 right=2 operator=add
[4] variable_declarator    4..13   id=0 init=3
[5] variable_declaration   0..14   kind=let declarators=extras[0..1]
[6] program                0..14   body=extras[1..2]

extras: [ 4 ][ 5 ]
          |    program body
          declarator list`}
      />
      <P>Four things to notice, and you&rsquo;ll use every one of them later:</P>
      <Ul>
        <Li>
          Children come before parents. Node 3 refers to 1 and 2, which already exist, and the root
          is the last node appended. This falls out of recursive descent for free: a parse function
          builds its children, appends itself, and hands its index back.
        </Li>
        <Li>
          Every edge is a small integer. <InlineCode>left=1</InlineCode>,{" "}
          <InlineCode>right=2</InlineCode>. Not addresses.
        </Li>
        <Li>
          The identifier&rsquo;s name isn&rsquo;t a copied string. It&rsquo;s the byte range{" "}
          <InlineCode>4..5</InlineCode> of the source.
        </Li>
        <Li>
          The two variable-length lists live in a shared <InlineCode>extras</InlineCode> array, and
          the node keeps a start and a length.
        </Li>
      </Ul>

      <H3>Two columns, not one array of structs</H3>
      <P>
        <InlineCode>std.MultiArrayList</InlineCode> stores those nodes as separate columns instead
        of one array of 52-byte structs:
      </P>
      <CodeBlock
        lang="text"
        code={`array of structs                      struct of arrays

[ data | span ][ data | span ] ...    data: [ d0 ][ d1 ][ d2 ] ...
                                      span: [ s0 ][ s1 ][ s2 ] ...

reading node kinds drags every        a kind-only pass reads one
span into cache as dead weight        dense column and nothing else`}
      />
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
        A pass that only switches on node kind, which is most passes, never pulls spans through the
        cache. A pass that only wants positions never pulls payloads.
      </P>

      <H3>Appending is a bump</H3>
      <P>
        Adding a node increments a length. The parser reserves capacity up front from the source
        size, so the allocator stays off the hot path:
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
        Those estimates are deliberately fat. Real files land near one node per ten bytes, so{" "}
        <InlineCode>source_len / 2</InlineCode> asks for several times what gets used. That&rsquo;s
        fine: a large allocation is an <InlineCode>mmap</InlineCode> underneath, and the OS
        doesn&rsquo;t hand you a page until you write to it. Reserve generously, pay for what you
        touch.
      </P>

      <H3>The bonus nobody advertises</H3>
      <P>
        Because every child has a lower index than its parent, a plain <InlineCode>for</InlineCode>{" "}
        loop over the node array from 0 to n <Strong>is</Strong> a post-order traversal. No
        recursion, no explicit stack, and the access is sequential so the prefetcher does the work.
        Any bottom-up pass can just be a loop. Stripping parenthesized expressions is exactly this:
      </P>
      <CodeBlock
        lang="zig"
        code={`fn stripParenthesizedNodes(tree: *ast.Tree) void {
    const datas = tree.nodes.items(.data);
    const spans = tree.nodes.items(.span);
    for (0..datas.len) |i| {
        var inner: u32 = switch (datas[i]) {
            .parenthesized_expression => |p| @intFromEnum(p.expression),
            .ts_parenthesized_type => |p| @intFromEnum(p.type_annotation),
            else => continue,
        };
        // resolve to the innermost non-paren node
        while (true) {
            switch (datas[inner]) {
                .parenthesized_expression => |p| inner = @intFromEnum(p.expression),
                .ts_parenthesized_type => |p| inner = @intFromEnum(p.type_annotation),
                else => break,
            }
        }
        datas[i] = datas[inner];
        spans[i] = spans[inner];
    }
}`}
      />

      <H2>Variable-length children</H2>
      <P>
        A binary expression has exactly two children and they fit inside the node. A block has any
        number of statements. Rather than size every node for the worst case, variadic children go
        into the shared array and the owner keeps an 8-byte descriptor:
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
        Building those lists is the interesting part. The parser doesn&rsquo;t know a block&rsquo;s
        statement count until it hits the closing brace, and it must not allocate a growable list
        per block. So there&rsquo;s one scratch buffer used as a stack: each list-building function
        records where it started and truncates back to that point on the way out.
      </P>
      <CodeBlock
        lang="zig"
        code={`pub fn parseBody(self: *Parser, terminator: ?TokenTag) !ast.IndexRange {
    const checkpoint = self.scratch_statements.begin(); // current length
    defer self.scratch_statements.reset(checkpoint);    // truncate on exit

    while (!self.isAtBodyEnd(terminator)) {
        const statement = try statements.parseStatement(self, .{});
        try self.scratch_statements.append(self.allocator(), statement);
    }
    // one bulk copy of scratch[checkpoint..] into tree.extras
    return self.flushToExtras(&self.scratch_statements, checkpoint);
}`}
      />
      <P>
        Nesting is where that pays off. Here&rsquo;s{" "}
        <InlineCode>{"{ a; { b; c; } d; }"}</InlineCode>:
      </P>
      <CodeBlock
        lang="text"
        code={`[0] identifier_reference   "a"
[1] expression_statement   expression=0
[2] identifier_reference   "b"
[3] expression_statement   expression=2
[4] identifier_reference   "c"
[5] expression_statement   expression=4
[6] block_statement        body=extras[0..2]    the inner block
[7] identifier_reference   "d"
[8] expression_statement   expression=7
[9] block_statement        body=extras[2..5]    the outer block
[10] program               body=extras[5..6]

extras: [ 3  5 | 1  6  8 | 9 ]
          inner   outer     program`}
      />
      <P>
        Read the extras left to right and you can see the recursion. The inner block finished first,
        so its two statements flushed first, at 0..2, while the outer block&rsquo;s statement{" "}
        <InlineCode>1</InlineCode> sat lower in the same buffer, untouched. The outer block then
        resumed, collected <InlineCode>6</InlineCode> and <InlineCode>8</InlineCode>, and flushed
        all three at 2..5. The buffer grows a few times per parse and then never again; appending a
        child is a bounds check and a store. Yuku keeps five of these for contexts that assemble
        lists at the same time.
      </P>
      <P>
        The same offset-and-length shape shows up everywhere once you have it. Comments attach to
        nodes through a prefix-sum array of length <InlineCode>node_count + 1</InlineCode>: node{" "}
        <InlineCode>i</InlineCode>&rsquo;s comments are the slice between offsets{" "}
        <InlineCode>i</InlineCode> and <InlineCode>i + 1</InlineCode>.
      </P>

      <H2>Backtracking is just truncation</H2>
      <P>
        This one is a side effect of the layout rather than something I designed in, and it matters
        more than it sounds. TypeScript needs speculation in a few places:{" "}
        <InlineCode>{"<T>(x) => x"}</InlineCode> is a generic arrow in a{" "}
        <InlineCode>.ts</InlineCode> file and a JSX element in <InlineCode>.tsx</InlineCode>, and{" "}
        <InlineCode>{"a < b"}</InlineCode> and <InlineCode>{"a<T>(b)"}</InlineCode> start out
        identical. Yuku covers the parenthesis cases with a cover grammar, but for arrows and type
        argument lists it simply tries, and rewinds if the attempt doesn&rsquo;t pan out. A
        checkpoint is a handful of integers:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const Checkpoint = struct {
    lexer_cursor: u32,
    lexer_state: lexer.LexerState,
    current_token: Token,
    // tree-backed append-only storage: just the lengths
    nodes_len: usize,
    extra_len: usize,
    diagnostics_len: usize,
    // parser flags, small structs copied by value
    context: Context,
    ts_context: TsContext,
};

pub fn rewind(self: *Parser, cp: Checkpoint) void {
    self.lexer.cursor = cp.lexer_cursor;
    // ...
    self.tree.nodes.shrinkRetainingCapacity(cp.nodes_len);
    self.tree.extras.shrinkRetainingCapacity(cp.extra_len);
    self.diagnostics.shrinkRetainingCapacity(cp.diagnostics_len);
}`}
      />
      <P>
        Whatever the failed attempt built is the tail of three arrays, and rewinding cuts the tail
        off. No frees, no walking a half-built subtree, nothing left rotting in the arena. With a
        pointer tree you either free the subtree node by node or leak it and hope it doesn&rsquo;t
        add up. Append-only storage hands you this for nothing, and once you have it you stop being
        nervous about speculative parsing.
      </P>

      <H2>Strings are offsets</H2>
      <P>
        Nearly every string a parser produces already exists, byte for byte, in the source it was
        handed. So a string in Yuku is two offsets, and the offsets themselves say which backing
        store they point into:
      </P>
      <CodeBlock
        lang="zig"
        code={`pub const String = struct { start: u32, end: u32 };

pub fn get(self: *const StringPool, id: String) []const u8 {
    if (id.start == id.end) return "";
    const src_len: u32 = @intCast(self.source.len);
    if (id.start < src_len) {
        return self.source[id.start..id.end]; // slice of the source, zero copy
    }
    return self.extra.items[id.start - src_len .. id.end - src_len];
}`}
      />
      <P>
        Below <InlineCode>source.len</InlineCode> it&rsquo;s a source slice and costs nothing. Past
        it, it lands in a small pool holding the exceptions: identifiers written with unicode
        escapes, string literals whose escapes had to be decoded, names a transform invented. Here
        is one, in a source 15 bytes long:
      </P>
      <CodeBlock
        lang="text"
        code={`let x = "a\\nb";

[1] string_literal   8..14   raw=8..14 ("a\\nb")   value=15..18 ("a", newline, "b")

string pool: 3 bytes`}
      />
      <P>
        <InlineCode>raw</InlineCode> is still a source slice. <InlineCode>value</InlineCode> starts
        at 15, exactly <InlineCode>source.len</InlineCode>, so it&rsquo;s the first 3 bytes of the
        pool. That works only because the lexer refuses to do work early: it never decodes anything
        while scanning, it records a span and sets a flag if it saw a backslash. Decoding happens
        when a name is actually asked for, and only for the rare token that needs it:
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
      <P>
        For an 8 MB file the whole pool ends up in the hundreds of bytes. Everything else is the
        source, already in memory, never copied.
      </P>

      <H2>Answers baked into the token tag</H2>
      <P>
        A token is 16 bytes, and Yuku never keeps an array of them. The lexer produces one on
        demand, the parser holds the current one, and each node records its own span.
      </P>
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
        The tag is the interesting part. The parser asks the same questions of every token: what is
        its precedence, is it a binary operator, is it a keyword. Instead of answering with branches
        or a lookup table, the answers are encoded into the tag&rsquo;s integer value at
        declaration:
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
        The precedence-climbing loop runs these once per operator. Each is a shift and a mask on a
        value already sitting in a register. No table, no branch, no load.
      </P>
      <P>
        Keywords are the other question asked constantly. An ASCII identifier is scanned with a
        256-entry table, and if it&rsquo;s 2 to 11 bytes and starts lowercase it might be a keyword.
        Yuku answers that with a perfect hash over (first byte, second byte, last byte, length). The
        multipliers came from an offline search, so every keyword lands in its own slot of a
        512-entry table and the lookup is one probe, one length compare, one short memcmp:
      </P>
      <CodeBlock
        lang="zig"
        code={`inline fn keywordHash(c0: u8, c1: u8, c_last: u8, length: usize) u32 {
    const h = @as(u32, c0) * 56 + @as(u32, c1) * 97 +
        @as(u32, c_last) * 108 + @as(u32, @intCast(length)) * 117;
    return h & 511;
}

fn getKeywordType(lexeme: []const u8) TokenTag {
    if (lexeme.len < 2 or lexeme.len > 11) return .identifier;
    const entry = &keyword_table[keywordHash(lexeme[0], lexeme[1], lexeme[lexeme.len - 1], lexeme.len)];
    if (entry.len != lexeme.len) return .identifier;
    if (!std.mem.eql(u8, entry.name[0..lexeme.len], lexeme)) return .identifier;
    return entry.tag;
}`}
      />
      <P>
        The table is built at compile time from the keyword list, and a{" "}
        <InlineCode>@compileError</InlineCode> names the offending keyword if two ever collide, so
        adding one later is safe.
      </P>

      <H2>Unicode identifiers without paying for them</H2>
      <P>
        JavaScript identifiers aren&rsquo;t ASCII. The spec defines them by the Unicode{" "}
        <InlineCode>ID_Start</InlineCode> and <InlineCode>ID_Continue</InlineCode> properties, so{" "}
        <InlineCode>π</InlineCode>, <InlineCode>変数</InlineCode> and a few hundred thousand other
        code points are legal, and the lexer needs an exact membership test across the whole range.
        The obvious implementation is one bit per code point: 256 KB per property. It works, and it
        falls out of cache constantly.
      </P>
      <P>
        The fix, which I took from David Tolnay&rsquo;s{" "}
        <A href="https://github.com/dtolnay/unicode-ident">unicode-ident</A>: the bitset is wildly
        repetitive. Slice the code point space into chunks of 512 and most chunks turn out identical
        to some other chunk. Unassigned planes are all zeros, long ideograph ranges are all ones,
        patterns repeat. Of the 4,096 chunks only 79 are distinct for{" "}
        <InlineCode>ID_Start</InlineCode> and 86 for <InlineCode>ID_Continue</InlineCode>. So store
        each distinct 512-bit pattern once and keep a 4,096-byte root array mapping each chunk to
        its pattern: about 29 KB for both properties, small enough to stay resident.
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
        Walk it for <InlineCode>π</InlineCode> (U+03C0, code point 960): chunk 1, and{" "}
        <InlineCode>root[1]</InlineCode> says pattern 1, which starts at word 16; offset 448 inside
        the chunk is word 14 of that pattern, bit 0. Two dependent loads from small hot tables and a
        bit test, no branches and no binary search over ranges. The tables are emitted as plain
        source by a build-time program that fetches the Unicode character database and deduplicates
        the chunks, so correctness is settled once at build time and the runtime sees two constant
        arrays.
      </P>
      <P>
        Just as important is what never touches those tables. ASCII is classified by a 256-entry
        table built at compile time, the identifier loop runs on it until it hits a byte with the
        high bit set, and that branch is marked cold:
      </P>
      <CodeBlock
        lang="zig"
        code={`while (pos < src.len and ident_continue_table_ascii[src[pos]]) {
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
        A pure ASCII file, which is nearly every file, never executes the unicode path at all. The
        general case is fully supported and the common case never pays for it. That sentence is most
        of the performance work in a parser: find the common case, make sure it pays for nothing
        else.
      </P>

      <H2>The tree is its own wire format</H2>
      <P>
        Here the flat layout pays its largest dividend, and Yuku&rsquo;s design decisions start
        making sense. The primary consumer is JavaScript: the native code parses, and Node needs the
        AST as ordinary objects. This boundary is where native tooling usually loses. The common
        approach is to serialize to JSON and <InlineCode>JSON.parse</InlineCode> on the other side,
        and that deserialize typically costs more than the parse did. Building JS objects one at a
        time through N-API is worse.
      </P>
      <P>
        But look at what the tree contains. Children are <InlineCode>u32</InlineCode> indices, lists
        are offsets into <InlineCode>extras</InlineCode>, strings are offsets into the source. Not a
        single pointer anywhere. The tree is <Strong>already position-independent bytes</Strong>, so
        serialization isn&rsquo;t a transformation, it&rsquo;s a copy. Yuku packs it into one buffer
        and returns it to JS as an <InlineCode>ArrayBuffer</InlineCode>:
      </P>
      <CodeBlock
        lang="text"
        code={`header | nodes        | extras     | string pool | comments | diagnostics
40 B     44 B each      raw u32s     raw bytes
                        (memcpy)     (memcpy)`}
      />
      <CodeBlock
        lang="zig"
        code={`const PackedNode = extern struct {
    tag: u8,
    _pad0: u8 = 0,
    flags: u16,   // packed bools and small enums
    field0: u16,  // length of the node's first IndexRange
    field0b: u16, // length of the second, if any
    field1: u32, field2: u32, field3: u32, field4: u32, // 7 u32 slots
    field5: u32, field6: u32, field7: u32,
    span_start: u32,
    span_end: u32,
};`}
      />
      <P>
        How each AST struct maps into that record isn&rsquo;t written by hand. It&rsquo;s derived at
        compile time from the struct fields, in declaration order: a <InlineCode>bool</InlineCode>{" "}
        claims the next flag bit, an enum claims <InlineCode>ceil(log2(n))</InlineCode> bits, a{" "}
        <InlineCode>NodeIndex</InlineCode> claims one <InlineCode>u32</InlineCode> slot, a{" "}
        <InlineCode>String</InlineCode> two. The encoder, the Zig decoder, and the program that
        generates the JavaScript decoder all call the same layout functions, so the three
        can&rsquo;t drift apart. And the budget is enforced where it belongs:
      </P>
      <CodeBlock
        lang="zig"
        code={`comptime {
    // any AST struct needing more than 7 u32 slots
    // or 16 flag bits fails the build, by name.
    validateAllNodeLayouts();
}`}
      />
      <P>
        On the JavaScript side there&rsquo;s no parsing step at all. The generated decoder reads
        fields straight out of the buffer through a typed array, one <InlineCode>case</InlineCode>{" "}
        per node kind. This is the real emitted code, just spaced out to read:
      </P>
      <CodeBlock
        lang="js"
        code={`const _u32 = new Int32Array(buffer);

function _decode(i) {
  const b = i * 11 + 10;            // 44-byte node = 11 words, after a 40-byte header
  const h0 = _u32[b];
  const tag = h0 & 255;
  const flags = h0 >>> 16;
  const _ss = _u32[b + 9], _se = _u32[b + 10];
  const start = _ss <= _firstNa ? _ss : pm[_ss - _firstNa]; // utf-8 -> utf-16
  const end = _se <= _firstNa ? _se : pm[_se - _firstNa];
  switch (tag) {
    case 8: {                        // binary_expression
      const f1 = _u32[b + 2], f2 = _u32[b + 3];
      return {
        type: "BinaryExpression", start, end,
        left: f1 !== NULL ? node(f1) : null,
        right: f2 !== NULL ? node(f2) : null,
        operator: BINARY_OPS[flags & 31],
      };
    }
    // ... one per node kind, all generated
  }
}`}
      />
      <P>
        Strings never cross the boundary; the caller already holds the source, so a name is{" "}
        <InlineCode>source.slice(start, end)</InlineCode>. The one genuine mismatch is positions:
        Zig spans are UTF-8 byte offsets and JavaScript wants UTF-16 code units. The header records
        the offset of the first non-ASCII byte, <InlineCode>_firstNa</InlineCode> above. Below it
        the two coincide, and the <InlineCode>pm</InlineCode> translation map is built only for the
        tail past that point. An all-ASCII file skips even that.
      </P>
      <P>
        And because the buffer is position-independent bytes, JavaScript is just one consumer. The
        same bytes deserialize back into a Zig <InlineCode>Tree</InlineCode> for the codegen path,
        and could as easily be cached to disk and mapped back in, or shared read-only across
        threads. The buffer is the tree.
      </P>

      <H2>Where Yuku holds the idea more loosely than Zig</H2>
      <P>
        Zig pushes this design much further than Yuku does, and the difference is worth being
        precise about, because it isn&rsquo;t an accident and it isn&rsquo;t a shortcut either. A
        Zig AST node is a tag plus two <InlineCode>u32</InlineCode> words whose meaning depends on
        that tag, with anything larger spilled into a side array, and positions recovered from the
        token array rather than stored. That is the tightest packing available, and exactly right
        for a compiler that owns both ends of the pipe. The only consumer of that AST is the
        compiler itself, so there is nobody to be ergonomic for.
      </P>
      <Table
        head={["", "Zig", "Yuku"]}
        rows={[
          [
            "node payload",
            "two u32 words, meaning depends on the tag",
            "tagged union with named, typed fields",
          ],
          ["reading a child", "switch on the tag, then index a word", "node.left, node.right"],
          ["positions", "recovered from the token array", "a span stored on every node"],
          ["tokens", "whole file tokenized into an array first", "lexed on demand, no array kept"],
          ["consumer", "the compiler itself", "tools built on top, in JavaScript and Zig"],
        ]}
      />
      <P>
        Yuku isn&rsquo;t an internal frontend. The AST is the public API. It ships to npm as ESTree
        and it is a Zig package too, and the whole point is that other people build on it, linters
        and bundlers and formatters and codemods and editor tooling, from JavaScript and from Zig
        alike. That changes what the representation has to optimize for. It has to cross into
        JavaScript fast, and it has to stay pleasant to work with once it gets there. A tool reads{" "}
        <InlineCode>node.left</InlineCode> by name, constantly. Every rule and every source map
        wants a position, so recovering spans by re-lexing would put the rare path in the hot seat.
        And the decoders on both sides are generated from the struct definitions, which only works
        because those definitions have named, typed fields. You can generate a decoder from a
        struct, not from &ldquo;two words, meaning depends on the tag&rdquo;.
      </P>
      <P>
        So the bytes went into a node that describes itself rather than into density. Yuku keeps
        everything that costs its consumers nothing, indices instead of pointers, arena instead of
        per-node allocation, columns instead of structs, offsets instead of copies, and stops at the
        point where more packing would start costing the people downstream. Same idea, different
        consumer, different stopping point. If you&rsquo;re writing an internal frontend nobody else
        links against, go denser than I did. You&rsquo;ll get more out of it and give up nothing you
        need.
      </P>

      <H2>What generalizes</H2>
      <P>
        Little of this is specific to JavaScript, and most isn&rsquo;t specific to parsing. Any
        system that builds a large structure once and traverses it many times, compiler frontends,
        query planners, entity systems, wins from the same handful of moves:
      </P>
      <Ul>
        <Li>
          <Strong>Pick the representation from the access pattern,</Strong> then write the
          algorithms to fit. The algorithm on top of Yuku is textbook recursive descent. Only the
          data is unusual.
        </Li>
        <Li>
          <Strong>Indices over pointers.</Strong> Smaller, position-independent, bulk-freeable,
          serializable with a copy, and rewindable by truncation.
        </Li>
        <Li>
          <Strong>Amortize everything.</Strong> Reserve from an estimate, reuse scratch space, batch
          the rare expensive operation out of the hot loop.
        </Li>
        <Li>
          <Strong>Never let the common case pay for the general one.</Strong> ASCII before unicode
          tables, source slices before interning, spans recorded before escapes decoded.
        </Li>
        <Li>
          <Strong>Make invariants compile-time checks.</Strong> A node size the compiler asserts
          can&rsquo;t regress. A wire layout derived from one definition can&rsquo;t drift.
        </Li>
        <Li>
          <Strong>Know who reads the tree.</Strong> That single question decides how far down this
          road you should go, and the answer isn&rsquo;t the same for everyone.
        </Li>
      </Ul>
      <P>
        The parser sitting on top of all this is plain recursive descent, the kind you&rsquo;d write
        straight from the spec. All the speed is in the data underneath it.
      </P>
    </>
  ),
} satisfies Writing;

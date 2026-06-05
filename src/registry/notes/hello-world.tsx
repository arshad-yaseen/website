import { Em, InlineCode, P, Strong } from "@/components/docs/prose";
import type { Note } from "../types";

export default {
  slug: "hello-world",
  title: "Hello, world",
  description: "A placeholder note showing the prose primitives.",
  date: "2026-06-05",
  body: (
    <>
      <P>
        Notes are written in <Strong>pure TSX</Strong> using the same prose primitives as the docs —{" "}
        <InlineCode>P</InlineCode>, <InlineCode>Strong</InlineCode>,{" "}
        <InlineCode>InlineCode</InlineCode>, and friends. No markdown pipeline,{" "}
        <Em>just components</Em>.
      </P>
    </>
  ),
} satisfies Note;

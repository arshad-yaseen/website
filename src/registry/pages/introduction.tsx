import { P, Strong } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "introduction",
  title: "Introduction",
  description: "UI components, experiments, and design notes for design engineers.",
  body: (
    <>
      <P>
        A living collection of <Strong>components</Strong>, <Strong>experiments</Strong>, and design
        notes. Everything here is built with intent and documented in pure TSX.
      </P>
    </>
  ),
} satisfies Doc;

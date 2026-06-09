import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "loaders",
  title: "Loaders",
  description: "A set of 5×5 dot matrix loaders, each a self-contained SVG.",
  source: "src/ui/dot-matrix",
  body: (
    <>
      <Demo name="loaders/basic" />

      <P>
        Every loader is one inline SVG with a single embedded keyframe and a per-dot delay map, no
        shared stylesheet and no JavaScript runtime.
      </P>

      <H2>Gallery</H2>
      <P>Thirty-four named patterns, each exported as its own component.</P>
      <Demo name="loaders/gallery" />

      <H2>Color</H2>
      <P>
        Pass any CSS color to <InlineCode>color</InlineCode>. It defaults to the current
        theme&apos;s foreground — black on light, white on dark.
      </P>
      <Demo name="loaders/color" />

      <H2>Sizing</H2>
      <P>
        Set <InlineCode>size</InlineCode> to scale a loader. Drop it down for an inline or
        chat-sized loader, or push it up for emphasis. Every other example here uses the default.
      </P>
      <Demo name="loaders/sizes" />

      <H2>API</H2>
      <P>Every loader accepts the same props.</P>
      <PropsTable
        rows={[
          { name: "size", type: "number", default: "24" },
          { name: "speed", type: "number", default: "1" },
          { name: "color", type: "string", default: "currentColor" },
          { name: "className", type: "string" },
          { name: "aria-label", type: "string", default: '"Loading"' },
        ]}
      />
    </>
  ),
} satisfies Doc;

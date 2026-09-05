import { Basic } from "@/content/demos/textarea/basic";
import { Sizes } from "@/content/demos/textarea/sizes";
import { Disabled } from "@/content/demos/textarea/disabled";
import { Invalid } from "@/content/demos/textarea/invalid";
import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { H2 } from "@fyi/ui/components/prose/heading";
import { InlineCode } from "@fyi/ui/components/prose/inline-code";
import { P } from "@fyi/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const textarea = {
  slug: "textarea",
  title: "Textarea",
  description: "A multi-line text field.",
  source: "src/ui/components/textarea.tsx",
  body: (
    <>
      <Demo name="textarea/basic">
        <Basic />
      </Demo>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="textarea/sizes">
        <Sizes />
      </Demo>

      <H2>Disabled</H2>
      <P>Prevent interaction with the field.</P>
      <Demo name="textarea/disabled">
        <Disabled />
      </Demo>

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="textarea/invalid">
        <Invalid />
      </Demo>

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        Plus the native <InlineCode>textarea</InlineCode> attributes, like{" "}
        <InlineCode>rows</InlineCode>, <InlineCode>value</InlineCode>, and{" "}
        <InlineCode>placeholder</InlineCode>.
      </P>
    </>
  ),
} satisfies Doc;

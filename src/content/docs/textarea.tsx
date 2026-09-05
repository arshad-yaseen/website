import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { H2 } from "@/ui/components/prose/heading";
import { InlineCode } from "@/ui/components/prose/inline-code";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const textarea = {
  slug: "textarea",
  title: "Textarea",
  description: "A multi-line text field.",
  source: "src/ui/components/textarea.tsx",
  body: (
    <>
      <Demo name="textarea/basic" />

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="textarea/sizes" />

      <H2>Disabled</H2>
      <P>Prevent interaction with the field.</P>
      <Demo name="textarea/disabled" />

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="textarea/invalid" />

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

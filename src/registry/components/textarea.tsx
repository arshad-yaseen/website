import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "textarea",
  title: "Textarea",
  description: "A multi-line text field.",
  source: "src/ui/textarea.tsx",
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

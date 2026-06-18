import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { A, H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "input",
  title: "Input",
  description: "A single-line text field.",
  source: "src/ui/input.tsx",
  body: (
    <>
      <Demo name="input/basic" />

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="input/sizes" />

      <H2>Disabled</H2>
      <P>Prevent interaction with the field.</P>
      <Demo name="input/disabled" />

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="input/invalid" />

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        Plus everything from <A href="https://base-ui.com/react/components/input">Base UI Input</A>,
        including <InlineCode>value</InlineCode>, <InlineCode>defaultValue</InlineCode>,{" "}
        <InlineCode>onValueChange</InlineCode>, and the native input attributes.
      </P>
    </>
  ),
} satisfies Doc;

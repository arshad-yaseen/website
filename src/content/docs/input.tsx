import { Basic } from "@/content/demos/input/basic";
import { Sizes } from "@/content/demos/input/sizes";
import { Disabled } from "@/content/demos/input/disabled";
import { Invalid } from "@/content/demos/input/invalid";
import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { A } from "@/ui/components/prose/anchor";
import { H2 } from "@/ui/components/prose/heading";
import { InlineCode } from "@/ui/components/prose/inline-code";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const input = {
  slug: "input",
  title: "Input",
  description: "A single-line text field.",
  source: "src/ui/components/input.tsx",
  body: (
    <>
      <Demo name="input/basic">
        <Basic />
      </Demo>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="input/sizes">
        <Sizes />
      </Demo>

      <H2>Disabled</H2>
      <P>Prevent interaction with the field.</P>
      <Demo name="input/disabled">
        <Disabled />
      </Demo>

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="input/invalid">
        <Invalid />
      </Demo>

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

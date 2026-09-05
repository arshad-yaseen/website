import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { A } from "@/ui/components/prose/anchor";
import { H2, H3 } from "@/ui/components/prose/heading";
import { InlineCode } from "@/ui/components/prose/inline-code";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const select = {
  slug: "select",
  title: "Select",
  description: "Choose one or more values from a dropdown menu.",
  source: "src/ui/components/select.tsx",
  body: (
    <>
      <Demo name="select/basic" />
      <P>A trigger opens a list of options and shows the chosen value.</P>

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="select/sizes" />

      <H2>Multiple</H2>
      <P>Let users choose more than one option.</P>
      <Demo name="select/multiple" />

      <H2>Grouped</H2>
      <P>Organize options into labeled sections.</P>
      <Demo name="select/grouped" />

      <H2>Descriptions</H2>
      <P>Add supporting text below each option.</P>
      <Demo name="select/descriptions" />

      <H2>Icons</H2>
      <P>Show an icon next to each option.</P>
      <Demo name="select/icons" />

      <H2>Avatars</H2>
      <P>Show an avatar next to each option.</P>
      <Demo name="select/avatars" />

      <H2>Disabled</H2>
      <P>Disable the whole control or individual options.</P>
      <Demo name="select/disabled" />

      <H2>Invalid</H2>
      <P>Shows an error state when the value is invalid.</P>
      <Demo name="select/invalid" />

      <H2>API</H2>

      <H3>Select.Trigger</H3>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />

      <H3>Select.Popup</H3>
      <PropsTable
        rows={[
          { name: "sideOffset", type: "number", default: "4" },
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
          { name: "align", type: '"start" | "center" | "end"', default: '"center"' },
          { name: "alignItemWithTrigger", type: "boolean", default: "true" },
          { name: "container", type: "HTMLElement | Ref | null" },
        ]}
      />
      <P>
        Plus everything from{" "}
        <A href="https://base-ui.com/react/components/select">Base UI Select</A>, including{" "}
        <InlineCode>items</InlineCode>, <InlineCode>value</InlineCode>,{" "}
        <InlineCode>defaultValue</InlineCode>, and <InlineCode>onValueChange</InlineCode>.{" "}
        <InlineCode>Select.Popup</InlineCode> forwards the remaining positioner props.
      </P>
    </>
  ),
} satisfies Doc;

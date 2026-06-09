import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { H2, H3, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "select",
  title: "Select",
  description: "Choose one or more values from a dropdown menu.",
  source: "src/ui/select.tsx",
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

      <H2>Icons</H2>
      <P>Show an icon next to each option.</P>
      <Demo name="select/icons" />

      <H2>Disabled</H2>
      <P>Disable the whole control or individual options.</P>
      <Demo name="select/disabled" />

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
    </>
  ),
} satisfies Doc;

import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { A, H2, H3, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "select",
  title: "Select",
  description: "Choose a value, or several, from a dropdown list.",
  source: "src/ui/select.tsx",
  body: (
    <>
      <Demo name="select/basic" />

      <P>
        A thin styled layer over{" "}
        <A href="https://base-ui.com/react/components/select">Base UI Select</A> — every part, prop,
        and data attribute carries through. The one shortcut is{" "}
        <InlineCode>Select.Popup</InlineCode>, which collapses Base UI&apos;s{" "}
        <InlineCode>Portal</InlineCode>, <InlineCode>Positioner</InlineCode>, and{" "}
        <InlineCode>Popup</InlineCode> into a single part and forwards the positioning props.
      </P>

      <H2>Sizes</H2>
      <P>
        <InlineCode>Select.Trigger</InlineCode> takes the same <InlineCode>size</InlineCode> scale
        as the <A href="/components/button">Button</A>. The menu rows derive their height from the
        trigger, so the popup stays proportional at every size — and the highlighted row lines up
        with the trigger when the menu opens over it.
      </P>
      <Demo name="select/sizes" />

      <H2>Multiple</H2>
      <P>
        Add <InlineCode>multiple</InlineCode> to <InlineCode>Select.Root</InlineCode>, then pass a
        function to <InlineCode>Select.Value</InlineCode> to format the selection.
      </P>
      <Demo name="select/multiple" />

      <H2>Grouped</H2>
      <P>
        Organize options with <InlineCode>Select.Group</InlineCode> and{" "}
        <InlineCode>Select.GroupLabel</InlineCode>, and divide them with{" "}
        <InlineCode>Select.Separator</InlineCode>.
      </P>
      <Demo name="select/grouped" />

      <H2>Disabled</H2>
      <P>
        Disable the whole control with <InlineCode>disabled</InlineCode> on{" "}
        <InlineCode>Select.Root</InlineCode>, or a single option with{" "}
        <InlineCode>disabled</InlineCode> on <InlineCode>Select.Item</InlineCode>.
      </P>
      <Demo name="select/disabled" />

      <H2>API</H2>
      <P>Every part forwards its full set of Base UI props. The additions on top:</P>

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
        Plus the rest of Base UI&apos;s positioner props. <InlineCode>Select.Root</InlineCode> and
        the remaining parts are passthroughs — see{" "}
        <A href="https://base-ui.com/react/components/select">Base UI Select</A> for the complete
        API, including <InlineCode>items</InlineCode>, <InlineCode>value</InlineCode>,{" "}
        <InlineCode>defaultValue</InlineCode>, and <InlineCode>onValueChange</InlineCode>.
      </P>
    </>
  ),
} satisfies Doc;

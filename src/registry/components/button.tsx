import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { A, H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "button",
  title: "Button",
  description: "Triggers an action.",
  body: (
    <>
      <Demo name="button" />

      <P>
        Defaults to <InlineCode>type="button"</InlineCode> so it never submits forms by accident.
        Submit buttons get a subtle press animation.
      </P>

      <H2>Sizes</H2>
      <Demo name="button-sizes" />

      <H2>Colors</H2>
      <Demo name="button-colors" />

      <H2>Icons</H2>
      <P>
        Place an <InlineCode>Icon</InlineCode> on either side of the label. Icon-only buttons need
        an <InlineCode>aria-label</InlineCode>.
      </P>
      <Demo name="button-icons" />

      <H2>Elevated</H2>
      <P>
        Opt in to <InlineCode>elevated</InlineCode> for an inset highlight and border ring.
      </P>
      <Demo name="button-elevated" />

      <H2>Link</H2>
      <P>
        Pass an element to <InlineCode>render</InlineCode> to render the button as something else,
        like a link. Native button semantics are dropped automatically.
      </P>
      <Demo name="button-link" />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "variant", type: '"solid" | "outline" | "plain"', default: '"solid"' },
          { name: "color", type: '"neutral" | "dark/white" | "accent"', default: '"dark/white"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "elevated", type: "boolean", default: "false" },
        ]}
      />
      <P>
        Plus everything from{" "}
        <A href="https://base-ui.com/react/components/button">Base UI Button</A>, including{" "}
        <InlineCode>render</InlineCode> and <InlineCode>disabled</InlineCode>.
      </P>
    </>
  ),
} satisfies Doc;

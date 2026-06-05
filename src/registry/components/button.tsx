import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "button",
  title: "Button",
  description: "Triggers an action. Built on Base UI with solid and plain variants.",
  body: (
    <>
      <Demo name="button" />

      <P>
        Defaults to <InlineCode>type="button"</InlineCode> so it never submits forms by accident.
        Submit buttons get a subtle press animation.
      </P>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "variant", type: '"solid" | "plain"', default: '"solid"' },
          { name: "color", type: '"neutral" | "dark/white" | "accent"', default: '"dark/white"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        ]}
      />
    </>
  ),
} satisfies Doc;

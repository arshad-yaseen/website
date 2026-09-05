import { Basic } from "@/content/demos/button/basic";
import { Sizes } from "@/content/demos/button/sizes";
import { Colors } from "@/content/demos/button/colors";
import { Icons } from "@/content/demos/button/icons";
import { Elevated } from "@/content/demos/button/elevated";
import { Loading } from "@/content/demos/button/loading";
import { AsLink } from "@/content/demos/button/as-link";
import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { A } from "@/ui/components/prose/anchor";
import { H2 } from "@/ui/components/prose/heading";
import { InlineCode } from "@/ui/components/prose/inline-code";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const button = {
  slug: "button",
  title: "Button",
  description: "Triggers an action.",
  source: "src/ui/components/button.tsx",
  body: (
    <>
      <Demo name="button/basic">
        <Basic />
      </Demo>

      <P>
        Defaults to <InlineCode>type="button"</InlineCode> so it never submits forms by accident.
        Submit buttons get a subtle press animation.
      </P>

      <H2>Sizes</H2>
      <Demo name="button/sizes">
        <Sizes />
      </Demo>

      <H2>Colors</H2>
      <Demo name="button/colors">
        <Colors />
      </Demo>

      <H2>Icons</H2>
      <P>
        Place an <InlineCode>Icon</InlineCode> on either side of the label. Icon-only buttons need
        an <InlineCode>aria-label</InlineCode>.
      </P>
      <Demo name="button/icons">
        <Icons />
      </Demo>

      <H2>Elevated</H2>
      <P>
        Opt in to <InlineCode>isElevated</InlineCode> for an inset highlight on solid buttons.
      </P>
      <Demo name="button/elevated">
        <Elevated />
      </Demo>

      <H2>Loading</H2>
      <P>
        Pass <InlineCode>disabled</InlineCode> and drop a dot matrix loader in as the icon for a
        loading state.
      </P>
      <Demo name="button/loading">
        <Loading />
      </Demo>

      <H2>Link</H2>
      <P>
        Pass an element to <InlineCode>render</InlineCode> to render the button as something else,
        like a link. Native button semantics are dropped automatically.
      </P>
      <Demo name="button/as-link">
        <AsLink />
      </Demo>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "variant", type: '"solid" | "outline" | "plain"', default: '"solid"' },
          {
            name: "color",
            type: '"neutral" | "dark/white" | "accent" | "success" | "danger"',
            default: '"dark/white"',
          },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "isElevated", type: "boolean", default: "false" },
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

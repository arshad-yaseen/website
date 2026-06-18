import { Demo } from "@/components/docs/demo";
import { PropsTable } from "@/components/docs/props-table";
import { A, H2, InlineCode, P } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "avatar",
  title: "Avatar",
  description: "A user's image, with initials as a fallback.",
  source: "src/ui/avatar.tsx",
  body: (
    <>
      <Demo name="avatar/basic" />

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="avatar/sizes" />

      <H2>Fallback</H2>
      <P>Shown while the image loads or if it fails.</P>
      <Demo name="avatar/fallback" />

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        <InlineCode>size</InlineCode> is set on <InlineCode>Avatar.Root</InlineCode>. Plus
        everything from <A href="https://base-ui.com/react/components/avatar">Base UI Avatar</A>.
      </P>
    </>
  ),
} satisfies Doc;

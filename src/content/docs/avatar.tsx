import { Demo } from "@/content/components/demo";
import { PropsTable } from "@/content/components/props-table";
import { A } from "@/ui/components/prose/anchor";
import { H2 } from "@/ui/components/prose/heading";
import { InlineCode } from "@/ui/components/prose/inline-code";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const avatar = {
  slug: "avatar",
  title: "Avatar",
  description: "A user’s image, with initials as a fallback.",
  source: "src/ui/components/avatar.tsx",
  body: (
    <>
      <Demo name="avatar/basic" />

      <H2>Sizes</H2>
      <P>Three sizes to fit different layouts.</P>
      <Demo name="avatar/sizes" />

      <H2>Fallback</H2>
      <P>Shown while the image loads or if it fails.</P>
      <Demo name="avatar/fallback" />

      <H2>Group</H2>
      <P>Overlap avatars to show a set of people.</P>
      <Demo name="avatar/group" />

      <H2>API</H2>
      <PropsTable rows={[{ name: "size", type: '"sm" | "md" | "lg"', default: '"md"' }]} />
      <P>
        <InlineCode>size</InlineCode> is set on <InlineCode>Avatar.Root</InlineCode>. Plus
        everything from <A href="https://base-ui.com/react/components/avatar">Base UI Avatar</A>.
      </P>
    </>
  ),
} satisfies Doc;

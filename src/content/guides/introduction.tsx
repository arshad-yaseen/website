import { A } from "@/ui/components/prose/anchor";
import { P } from "@/ui/components/prose/paragraph";
import type { Doc } from "@/content/types/doc";

export const introduction = {
  slug: "introduction",
  title: "Introduction",
  description: "UI components, experiments, and design notes for design engineers.",
  body: (
    <>
      <P>
        This is an ongoing collection, not a finished one. More components will be added, and
        existing ones rewritten as I learn.
      </P>
      <P>
        Components are built on top of <A href="https://base-ui.com">Base UI</A>, unstyled
        accessible primitives, and styled with <A href="https://tailwindcss.com">Tailwind CSS</A>.
      </P>
    </>
  ),
} satisfies Doc;

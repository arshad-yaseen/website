import { notFound, redirect } from "next/navigation";
import { getSection, sections } from "@/content";

type Props = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections
    .filter((section) => section.docs.length > 0)
    .map((section) => ({
      section: section.slug,
    }));
}

export default async function Page({ params }: Props) {
  const { section } = await params;

  const first = getSection(section)?.docs[0];
  if (!first) {
    notFound();
  }

  redirect(`/ui/${section}/${first.slug}`);
}

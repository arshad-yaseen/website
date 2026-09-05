import { notFound, redirect } from "next/navigation";
import { sections } from "@/content/config/sections";
import { getSection } from "@/content/lib/get-section";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.slug }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const [first] = getSection(section)?.docs ?? [];

  if (!first) {
    notFound();
  }

  redirect(`/ui/${section}/${first.slug}`);
}

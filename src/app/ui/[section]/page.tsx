import { notFound, redirect } from "next/navigation";
import { sections } from "@/content/config/sections";
import { getSectionDocs } from "@/content/lib/get-section-docs";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section: section.slug }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const [first] = getSectionDocs(section);

  if (!first) {
    notFound();
  }

  redirect(`/ui/${section}/${first.slug}`);
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Article } from "@/components/docs/article";
import { createMetadata } from "@/lib/metadata";
import { getGuide, getSection, guides, sections } from "@/content";

type Props = {
  params: Promise<{ section: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...guides.map((guide) => ({ section: guide.slug })),
    ...sections
      .filter((section) => section.docs.length > 0)
      .map((section) => ({
        section: section.slug,
      })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const guide = getGuide(section);

  if (!guide) {
    return {};
  }

  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/ui/${guide.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { section } = await params;

  const guide = getGuide(section);
  if (guide) {
    return <Article doc={guide} />;
  }

  const first = getSection(section)?.docs[0];
  if (!first) {
    notFound();
  }

  redirect(`/ui/${section}/${first.slug}`);
}

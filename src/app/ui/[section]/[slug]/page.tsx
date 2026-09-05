import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docBodies } from "@/content/config/doc-bodies";
import { sections } from "@/content/config/sections";
import { getDoc } from "@/content/lib/get-doc";
import { Article } from "@/features/docs/components/article";
import { createMetadata } from "@/shared/lib/create-metadata";

type DocPageProps = {
  params: Promise<{ section: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.docs.map((slug) => ({ section: section.slug, slug })),
  );
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);

  if (!doc) {
    return {};
  }

  return createMetadata({
    title: doc.title,
    description: doc.description,
    path: `/ui/${section}/${doc.slug}`,
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);
  const loadBody = docBodies[slug];

  if (!doc || !loadBody) {
    notFound();
  }

  return <Article doc={doc}>{await loadBody()}</Article>;
}

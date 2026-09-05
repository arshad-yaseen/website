import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { writings } from "@/content/config/writings";
import { getWriting } from "@/content/lib/get-writing";
import { WritingArticle } from "@/features/writings/components/writing-article";
import { articleJsonLd } from "@/features/writings/lib/article-json-ld";
import { JsonLd } from "@/shared/components/json-ld";
import { createMetadata } from "@/shared/lib/create-metadata";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    return {};
  }

  return createMetadata({
    title: writing.title,
    description: writing.description,
    path: `/writings/${writing.slug}`,
    type: "article",
    publishedTime: writing.date,
  });
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    notFound();
  }

  return (
    <>
      <JsonLd schema={articleJsonLd(writing)} />
      <WritingArticle writing={writing} />
    </>
  );
}

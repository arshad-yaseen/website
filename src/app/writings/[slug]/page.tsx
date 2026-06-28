import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { WritingArticle } from "@/components/writings/writing-article";
import { articleJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getWriting, writings } from "@/registry";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleJsonLd(writing)} />
      <WritingArticle writing={writing} />
    </>
  );
}

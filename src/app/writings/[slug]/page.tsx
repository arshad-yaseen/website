import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WritingArticle } from "@/components/writings/writing-article";
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

  return { title: writing?.title, description: writing?.description };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    notFound();
  }

  return <WritingArticle writing={writing} />;
}

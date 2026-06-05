import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/docs/article";
import { getDoc, sections } from "@/registry";

type Props = {
  params: Promise<{ section: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.docs.map((doc) => ({ section: section.slug, slug: doc.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);

  return { title: doc?.title, description: doc?.description };
}

export default async function DocPage({ params }: Props) {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);

  if (!doc) {
    notFound();
  }

  return <Article doc={doc} />;
}

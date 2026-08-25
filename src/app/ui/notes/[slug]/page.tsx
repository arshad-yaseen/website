import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/docs/article";
import { createMetadata } from "@/lib/metadata";
import { getNote, notes } from "@/registry";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return {};
  }

  return createMetadata({
    title: note.title,
    description: note.description,
    path: `/ui/notes/${note.slug}`,
    type: "article",
    publishedTime: note.date,
  });
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  return <Article doc={note} />;
}

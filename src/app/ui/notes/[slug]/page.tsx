import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/content/config/notes";
import { getNote } from "@/content/lib/get-note";
import { Article } from "@/features/docs/components/article";
import { createMetadata } from "@/shared/lib/create-metadata";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
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

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  return <Article doc={note} />;
}

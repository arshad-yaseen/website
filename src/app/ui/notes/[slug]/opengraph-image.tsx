import { ImageResponse } from "next/og";
import { notes } from "@/content/config/notes";
import { getNote } from "@/content/lib/get-note";
import { OgImage } from "@/shared/components/og-image";
import { og } from "@/shared/config/og";
import { site } from "@/shared/config/site";
import { loadOgFonts } from "@/shared/lib/load-og-fonts";

export const alt = `${site.name} · Note`;
export const size = og.size;
export const contentType = og.contentType;

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

type NoteImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: NoteImageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  return new ImageResponse(<OgImage title={note?.title ?? site.name} subtitle={site.name} />, {
    ...og.size,
    fonts: await loadOgFonts(),
  });
}

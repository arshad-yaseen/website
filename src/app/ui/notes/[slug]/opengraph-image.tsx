import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site";
import { getNote, notes } from "@/content";

export const alt = `${siteConfig.name} · Note`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);

  return renderOgImage({
    title: note?.title ?? siteConfig.name,
    subtitle: siteConfig.name,
  });
}

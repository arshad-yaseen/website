import { ImageResponse } from "next/og";
import { writings } from "@/content/config/writings";
import { getWriting } from "@/content/lib/get-writing";
import { OgImage } from "@/shared/components/og-image";
import { og } from "@/shared/config/og";
import { site } from "@/shared/config/site";
import { loadOgFonts } from "@/shared/lib/load-og-fonts";

export const alt = `${site.name} · Writing`;
export const size = og.size;
export const contentType = og.contentType;

export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.slug }));
}

type WritingImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: WritingImageProps) {
  const { slug } = await params;
  const writing = getWriting(slug);

  return new ImageResponse(<OgImage title={writing?.title ?? site.name} subtitle={site.name} />, {
    ...og.size,
    fonts: await loadOgFonts(),
  });
}

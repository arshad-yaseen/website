import { ImageResponse } from "next/og";
import { sections } from "@/content/config/sections";
import { getDoc } from "@/content/lib/get-doc";
import { OgImage } from "@/shared/components/og-image";
import { og } from "@/shared/config/og";
import { site } from "@/shared/config/site";
import { loadOgFonts } from "@fyi/ui/lib/load-og-fonts";

export const alt = `${site.name} · Component`;
export const size = og.size;
export const contentType = og.contentType;

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.docs.map((slug) => ({ section: section.slug, slug })),
  );
}

type DocImageProps = {
  params: Promise<{ section: string; slug: string }>;
};

export default async function Image({ params }: DocImageProps) {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);

  return new ImageResponse(<OgImage title={doc?.title ?? site.name} subtitle={site.name} />, {
    ...og.size,
    fonts: await loadOgFonts(),
  });
}

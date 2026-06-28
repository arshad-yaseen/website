import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site";
import { getWriting, writings } from "@/registry";

export const alt = `${siteConfig.name} — Writing`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const writing = getWriting(slug);

  return renderOgImage({
    title: writing?.title ?? siteConfig.name,
    subtitle: siteConfig.name,
  });
}

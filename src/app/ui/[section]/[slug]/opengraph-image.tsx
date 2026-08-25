import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site";
import { getDoc, sections } from "@/content";

export const alt = `${siteConfig.name} · Component`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.flatMap((section) =>
    section.docs.map((doc) => ({ section: section.slug, slug: doc.slug })),
  );
}

type Props = {
  params: Promise<{ section: string; slug: string }>;
};

export default async function Image({ params }: Props) {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);

  return renderOgImage({
    title: doc?.title ?? siteConfig.name,
    subtitle: siteConfig.name,
  });
}

import type { Metadata } from "next";
import { siteConfig } from "./site";

type CreateMetadataOptions = {
  title: string;
  description?: string;
  /** Root-relative path, resolved against `metadataBase` for canonical/OG URLs. */
  path: string;
  type?: "website" | "article";
  /** ISO 8601 date, only used when `type` is `"article"`. */
  publishedTime?: string;
};

/**
 * Builds a complete, self-contained Metadata object (canonical, Open Graph, and
 * Twitter) for a page. Each page carries the full set of tags because Next.js
 * shallow-merges nested metadata objects, so inheriting only part of `openGraph`
 * from the root is not reliable. The OG/Twitter image is added automatically by
 * the colocated `opengraph-image` file convention.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  publishedTime,
}: CreateMetadataOptions): Metadata {
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title,
          description,
          url: path,
          siteName: siteConfig.name,
          locale: "en_US",
          publishedTime,
          authors: [siteConfig.author.name],
        }
      : {
          type: "website",
          title,
          description,
          url: path,
          siteName: siteConfig.name,
          locale: "en_US",
        };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
  };
}

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

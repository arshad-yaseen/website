import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { notes, pages, sections, writings } from "@/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/ui/notes`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${base}/ui/${page.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const docRoutes: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.docs.map((doc) => ({
      url: `${base}/ui/${section.slug}/${doc.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  );

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${base}/ui/notes/${note.slug}`,
    lastModified: note.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writings.map((writing) => ({
    url: `${base}/writings/${writing.slug}`,
    lastModified: writing.date,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...pageRoutes, ...docRoutes, ...noteRoutes, ...writingRoutes];
}

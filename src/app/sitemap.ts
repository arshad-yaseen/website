import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { notes, guides, sections, writings } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/writings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ui`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/ui/notes`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const pageRoutes: MetadataRoute.Sitemap = guides.slice(1).map((guide) => ({
    url: `${base}/ui/${guide.slug}`,
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

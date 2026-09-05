import type { MetadataRoute } from "next";
import { notes } from "@/content/config/notes";
import { sections } from "@/content/config/sections";
import { writings } from "@/content/config/writings";
import { site } from "@/shared/config/site";

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const base = site.url;

  const landings: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/writings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ui`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/ui/notes`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const docRoutes: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.docs.map((slug) => ({
      url: `${base}/ui/${section.slug}/${slug}`,
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

  return [...landings, ...docRoutes, ...noteRoutes, ...writingRoutes];
}

import type { WritingEntry } from "@/content/types/writing";
import { site } from "@/shared/config/site";

export function articleJsonLd(writing: WritingEntry): object {
  const url = `${site.url}/writings/${writing.slug}`;
  const author = {
    "@type": "Person",
    name: site.author.name,
    url: site.author.url,
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: writing.title,
    description: writing.description,
    datePublished: writing.date,
    dateModified: writing.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    author,
    publisher: author,
  };
}

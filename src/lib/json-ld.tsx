import type { Writing } from "@/content/types";
import { siteConfig } from "./site";

const person = {
  "@type": "Person",
  name: siteConfig.author.name,
  url: siteConfig.author.url,
} as const;

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: person,
  };
}

export function articleJsonLd(writing: Writing) {
  const url = `${siteConfig.url}/writings/${writing.slug}`;

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
    author: person,
    publisher: person,
  };
}

type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

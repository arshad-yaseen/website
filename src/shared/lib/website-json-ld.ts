import { site } from "@/shared/config/site";

/** Schema.org WebSite description of the site as a whole. */
export function websiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: site.author.url,
    },
  };
}

import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/content/lib/get-sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}

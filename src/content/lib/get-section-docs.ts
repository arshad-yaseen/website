import { docs } from "@/content/config/docs";
import { sections } from "@/content/config/sections";
import type { DocEntry } from "@/content/types/doc";

/** Ordered as the section authored them, dropping any slug without a file. */
export function getSectionDocs(section: string): DocEntry[] {
  const slugs = sections.find((entry) => entry.slug === section)?.docs ?? [];
  return slugs.flatMap((slug) => docs.filter((doc) => doc.slug === slug));
}

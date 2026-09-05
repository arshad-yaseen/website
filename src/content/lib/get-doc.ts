import { getSectionDocs } from "@/content/lib/get-section-docs";
import type { DocEntry } from "@/content/types/doc";

export function getDoc(section: string, slug: string): DocEntry | undefined {
  return getSectionDocs(section).find((doc) => doc.slug === slug);
}

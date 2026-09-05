import { getSection } from "@/content/lib/get-section";
import type { Doc } from "@/content/types/doc";

export function getDoc(section: string, slug: string): Doc | undefined {
  return getSection(section)?.docs.find((doc) => doc.slug === slug);
}

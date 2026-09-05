import { sections } from "@/content/config/sections";
import type { Section } from "@/content/types/section";

export function getSection(slug: string): Section | undefined {
  return sections.find((section) => section.slug === slug);
}

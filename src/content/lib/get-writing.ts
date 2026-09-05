import { writings } from "@/content/config/writings";
import type { Writing } from "@/content/types/writing";

export function getWriting(slug: string): Writing | undefined {
  return writings.find((writing) => writing.slug === slug);
}

import { writings } from "@/content/config/writings";
import type { WritingEntry } from "@/content/types/writing";

export function getWriting(slug: string): WritingEntry | undefined {
  return writings.find((writing) => writing.slug === slug);
}

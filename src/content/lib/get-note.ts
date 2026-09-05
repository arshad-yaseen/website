import { notes } from "@/content/config/notes";
import type { Note } from "@/content/types/note";

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

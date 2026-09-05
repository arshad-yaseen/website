import { notes } from "@/content/config/notes";
import type { NoteEntry } from "@/content/types/note";

export function getNote(slug: string): NoteEntry | undefined {
  return notes.find((note) => note.slug === slug);
}

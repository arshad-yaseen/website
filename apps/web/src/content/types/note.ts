import type { Doc } from "@/content/types/doc";

export type Note = Doc & {
  /** Publish date, ISO 8601 (YYYY-MM-DD). */
  date: string;
};

export type NoteEntry = Omit<Note, "body">;

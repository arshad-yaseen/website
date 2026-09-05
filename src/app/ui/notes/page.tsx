import type { Metadata } from "next";
import { NotesIndex } from "@/features/docs/components/notes-index";
import { notesIndex } from "@/features/docs/config/notes-index";
import { createMetadata } from "@/shared/lib/create-metadata";

export const metadata: Metadata = createMetadata({
  title: notesIndex.title,
  description: notesIndex.description,
  path: "/ui/notes",
});

export default function NotesPage() {
  return <NotesIndex />;
}

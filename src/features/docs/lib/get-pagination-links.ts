import { notes } from "@/content/config/notes";
import { sections } from "@/content/config/sections";
import { introduction } from "@/content/guides/introduction";
import { notesIndex } from "@/features/docs/config/notes-index";
import type { PaginationLink } from "@/features/docs/types/pagination-link";

/** The sidebar order, flattened, so previous and next are neighbours in one list. */
export function getPaginationLinks(): PaginationLink[] {
  return [
    { title: introduction.title, href: "/ui" },
    { title: notesIndex.title, href: "/ui/notes" },
    ...notes.map((note) => ({ title: note.title, href: `/ui/notes/${note.slug}` })),
    ...sections.flatMap((section) =>
      section.docs.map((doc) => ({
        title: doc.title,
        href: `/ui/${section.slug}/${doc.slug}`,
      })),
    ),
  ];
}

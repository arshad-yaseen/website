import { notes } from "@/content/config/notes";
import { sections } from "@/content/config/sections";
import { getSectionDocs } from "@/content/lib/get-section-docs";
import { introduction } from "@/content/guides/introduction";
import { notesIndex } from "@/features/docs/config/notes-index";

export type PaginationLink = {
  title: string;
  href: string;
};

/** The sidebar order flattened, so previous and next are neighbours in one list. */
export function getPaginationLinks(): PaginationLink[] {
  return [
    { title: introduction.title, href: "/ui" },
    { title: notesIndex.title, href: "/ui/notes" },
    ...notes.map((note) => ({ title: note.title, href: `/ui/notes/${note.slug}` })),
    ...sections.flatMap((section) =>
      getSectionDocs(section.slug).map((doc) => ({
        title: doc.title,
        href: `/ui/${section.slug}/${doc.slug}`,
      })),
    ),
  ];
}

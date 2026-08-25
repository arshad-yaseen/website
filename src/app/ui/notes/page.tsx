import { Article } from "@/components/docs/article";
import { A, Li, Ul } from "@/components/prose";
import { createMetadata } from "@/lib/metadata";
import { notes } from "@/content";
import type { Doc } from "@/content/types";

const doc: Doc = {
  slug: "notes",
  title: "Notes",
  description: "Short design and engineering notes.",
  body: (
    <Ul>
      {notes.map((note) => (
        <Li key={note.slug}>
          <A href={`/ui/notes/${note.slug}`}>{note.title}</A>
        </Li>
      ))}
    </Ul>
  ),
};

export const metadata = createMetadata({
  title: doc.title,
  description: doc.description,
  path: "/ui/notes",
});

export default function NotesPage() {
  return <Article doc={doc} />;
}

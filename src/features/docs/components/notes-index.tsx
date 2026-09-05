import { notes } from "@/content/config/notes";
import { Article } from "@/features/docs/components/article";
import { notesIndex } from "@/features/docs/config/notes-index";
import { A } from "@/ui/components/prose/anchor";
import { Li, Ul } from "@/ui/components/prose/list";

export function NotesIndex() {
  const doc = { slug: "notes", title: notesIndex.title, description: notesIndex.description };

  return (
    <Article doc={doc}>
      <Ul>
        {notes.map((note) => (
          <Li key={note.slug}>
            <A href={`/ui/notes/${note.slug}`}>{note.title}</A>
          </Li>
        ))}
      </Ul>
    </Article>
  );
}

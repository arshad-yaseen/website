import type { Metadata } from "next";
import { notes } from "@/registry";

export const metadata: Metadata = {
  title: "Notes",
};

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-2xl font-medium tracking-tight">Notes</h1>
      {notes.map((note) => (
        <article key={note.slug} id={note.slug} className="flex flex-col gap-4">
          <header className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-medium tracking-tight">{note.title}</h2>
            <time
              dateTime={note.date}
              className="shrink-0 font-mono text-sm text-neutral-600 dark:text-neutral-400"
            >
              {note.date}
            </time>
          </header>
          {note.body}
        </article>
      ))}
    </div>
  );
}

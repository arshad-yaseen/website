import type { Doc } from "@/registry/types";

export function Article({ doc }: { doc: Doc }) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tight">{doc.title}</h1>
        <p className="text-base/7 text-neutral-600 dark:text-neutral-400">{doc.description}</p>
      </header>
      {doc.body}
    </article>
  );
}

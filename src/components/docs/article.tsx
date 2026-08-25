import type { Doc } from "@/content/types";
import { Button } from "@/ui/button";
import { P } from "../prose";

type ArticleProps = {
  doc: Doc;
};

export function Article({ doc }: ArticleProps) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium tracking-tight text-balance">{doc.title}</h1>
        {doc.source && (
          <Button
            variant="plain"
            size="sm"
            className="shrink-0"
            render={<a href={doc.source} target="_blank" rel="noreferrer" />}
          >
            Source code
          </Button>
        )}
      </header>
      <P>{doc.description}</P>
      {doc.body}
    </article>
  );
}

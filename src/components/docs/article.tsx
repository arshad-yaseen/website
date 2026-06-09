import type { Doc } from "@/registry/types";
import { Button } from "@/ui/button";

type ArticleProps = {
  doc: Doc;
};

export function Article({ doc }: ArticleProps) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-medium tracking-tight">{doc.title}</h1>
          {doc.source && (
            <Button
              variant="plain"
              size="sm"
              className="shrink-0"
              render={
                <a
                  href={doc.source}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Source code
            </Button>
          )}
        </div>
        <p className="text-base/7 text-neutral-600 dark:text-neutral-400">{doc.description}</p>
      </header>
      {doc.body}
    </article>
  );
}

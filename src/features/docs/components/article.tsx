import { getSourceUrl } from "@/content/lib/get-source-url";
import type { DocEntry } from "@/content/types/doc";
import type { PropsWithChildren } from "react";
import { Button } from "@/ui/components/button";
import { P } from "@/ui/components/prose/paragraph";

type ArticleProps = PropsWithChildren<{
  doc: DocEntry;
}>;

export function Article({ doc, children }: ArticleProps) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium tracking-tight text-balance">{doc.title}</h1>
        {doc.source && (
          <Button
            variant="plain"
            size="sm"
            className="shrink-0"
            render={<a href={getSourceUrl(doc.source)} target="_blank" rel="noreferrer" />}
          >
            Source code
          </Button>
        )}
      </header>
      <P>{doc.description}</P>
      {children}
    </article>
  );
}

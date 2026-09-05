import type { WritingEntry } from "@/content/types/writing";
import type { PropsWithChildren } from "react";
import { formatDate } from "@fyi/shared/lib/format-date";
import { cn } from "@fyi/ui/lib/cn";

type WritingArticleProps = PropsWithChildren<{
  writing: WritingEntry;
}>;

export function WritingArticle({ writing, children }: WritingArticleProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-4xl/tight">
          {writing.title}
        </h1>
        <time
          dateTime={writing.date}
          className="font-mono text-xs text-neutral-600 tabular-nums dark:text-neutral-400"
        >
          {formatDate(writing.date)}
        </time>
      </header>
      <div
        className={cn(
          "flex flex-col gap-6",
          // Code blocks are bare in the component docs, but filled inside a writing.
          "`**:data-[slot=code-block]:bg-neutral-100/6",
          "dark:**:data-[slot=code-block]:bg-neutral-900/60",
        )}
      >
        {children}
      </div>
    </article>
  );
}

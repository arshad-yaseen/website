import type { Writing } from "@/content/types/writing";
import { formatDate } from "@/shared/lib/format-date";
import { cn } from "@/ui/lib/cn";

type WritingArticleProps = {
  writing: Writing;
};

export function WritingArticle({ writing }: WritingArticleProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-4xl/tight">
          {writing.title}
        </h1>
        <time dateTime={writing.date} className="font-mono text-xs text-neutral-500 tabular-nums">
          {formatDate(writing.date)}
        </time>
      </header>
      <div
        className={cn(
          "flex flex-col gap-6",
          // Code blocks are bare in the component docs, but filled inside a writing.
          "[&_[data-slot=code-block]]:bg-neutral-100/60",
          "dark:[&_[data-slot=code-block]]:bg-neutral-900/60",
        )}
      >
        {writing.body}
      </div>
    </article>
  );
}

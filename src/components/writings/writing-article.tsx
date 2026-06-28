import type { Writing } from "@/registry/types";
import { formatDate } from "@/utils/date";

type WritingArticleProps = {
  writing: Writing;
};

export function WritingArticle({ writing }: WritingArticleProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl/tight">
          {writing.title}
        </h1>
        <time dateTime={writing.date} className="font-mono text-sm text-neutral-500">
          {formatDate(writing.date)}
        </time>
      </header>
      <div className="writing-content flex flex-col gap-6">{writing.body}</div>
    </article>
  );
}

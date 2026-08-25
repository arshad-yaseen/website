import type { Route } from "next";
import Link from "next/link";
import { writings } from "@/content";
import { formatDate } from "@/lib/date";

export function WritingsList() {
  return (
    <ul className="flex flex-col">
      {writings.map((writing) => (
        <li key={writing.slug}>
          <Link
            href={`/writings/${writing.slug}` as Route}
            className="group flex flex-col gap-1 rounded-md px-3 py-2.5 transition-colors duration-150 motion-reduce:transition-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 hover-open:bg-neutral-100/70 dark:hover-open:bg-neutral-900/50"
          >
            <span className="text-base text-neutral-800 transition-colors duration-150 group-hover:text-neutral-900 motion-reduce:transition-none dark:text-neutral-200 dark:group-hover:text-white">
              {writing.title}
            </span>
            <time
              dateTime={writing.date}
              className="shrink-0 font-mono text-xs text-neutral-500 tabular-nums"
            >
              {formatDate(writing.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}

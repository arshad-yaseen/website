import type { Route } from "next";
import Link from "next/link";
import { writings } from "@/registry";
import { formatDate } from "@/utils/date";

export function WritingsList() {
  return (
    <ul className="flex flex-col">
      {writings.map((writing) => (
        <li key={writing.slug}>
          <Link
            href={`/writings/${writing.slug}` as Route}
            className="group -mx-2 flex flex-col gap-1 rounded-md px-3 py-2.5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 hover-open:bg-neutral-100/70 dark:hover-open:bg-neutral-900/50"
          >
            <span className="text-base text-neutral-800 transition-colors group-hover:text-neutral-900 dark:text-neutral-200 dark:group-hover:text-white">
              {writing.title}
            </span>
            <time
              dateTime={writing.date}
              className="shrink-0 font-mono text-sm text-neutral-500 tabular-nums"
            >
              {formatDate(writing.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}

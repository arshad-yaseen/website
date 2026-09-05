import type { Route } from "next";
import Link from "next/link";
import { writings } from "@/content/config/writings";
import { formatDate } from "@fyi/shared/lib/format-date";
import { cn } from "@fyi/ui/lib/cn";

export function WritingsList() {
  return (
    <ul className="flex flex-col gap-7">
      {writings.map((writing) => (
        <li key={writing.slug} className="flex flex-col gap-1">
          <time
            dateTime={writing.date}
            className="text-sm text-neutral-500 tabular-nums dark:text-neutral-400"
          >
            {formatDate(writing.date, { month: "short" })}
          </time>
          {/* Every slug here comes from the writings registry, which `Route` cannot prove. */}
          <Link
            href={`/writings/${writing.slug}` as Route}
            className={cn(
              "w-fit text-2xl/snug tracking-tight text-pretty",
              "text-accent-500 dark:text-accent-400",
              "hover:text-accent-600 dark:hover:text-accent-300",
              "transition-colors duration-150 motion-reduce:transition-none",
            )}
          >
            {writing.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

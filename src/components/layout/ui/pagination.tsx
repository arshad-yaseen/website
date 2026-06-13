"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/ui/icon";
import { cn } from "@/utils/cn";

const chevronClassName = cn(
  "mt-0.5 hidden size-4 text-neutral-500 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 motion-reduce:transition-none dark:text-neutral-400 pointer-fine:block",
);

export type PaginationItem = {
  title: string;
  href: string;
};

type PaginationProps = {
  items: PaginationItem[];
};

export default function Pagination({ items }: PaginationProps) {
  const pathname = usePathname();
  const index = items.findIndex((item) => item.href === pathname);

  if (index === -1) {
    return null;
  }

  const previous = items[index - 1];
  const next = items[index + 1];

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-between gap-4 border-t-hairline border-current/10 pt-6"
    >
      {previous ? (
        <Link href={previous.href as Route} className="group flex items-start gap-2">
          <Icon name="ChevronLeft" className={cn(chevronClassName, "-ml-6")} />
          <span className="flex flex-col gap-1">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Previous</span>
            <span className="text-sm font-medium">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href as Route} className="group flex items-start gap-2 text-right">
          <span className="flex flex-col gap-1">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Next</span>
            <span className="text-sm font-medium">{next.title}</span>
          </span>
          <Icon name="ChevronRight" className={cn(chevronClassName, "-mr-6")} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

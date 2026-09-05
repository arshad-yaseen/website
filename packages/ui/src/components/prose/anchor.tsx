import type { Route } from "next";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { cn } from "@fyi/ui/lib/cn";

type AProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
}>;

export function A<T extends string>({ href, children }: AProps<T>) {
  const isExternal = !href.startsWith("/") && !href.startsWith("#");

  return (
    <Link
      href={href}
      className={cn(
        "underline underline-offset-2",
        "text-neutral-900 decoration-neutral-400 dark:text-white dark:decoration-neutral-600",
        "hover:decoration-neutral-500 dark:hover:decoration-neutral-500",
        "transition-colors motion-reduce:transition-none",
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

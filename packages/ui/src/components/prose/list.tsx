import type { PropsWithChildren } from "react";
import { cn } from "@fyi/ui/lib/cn";

const MARKER = cn(
  "pl-5 text-base/8 text-pretty text-foreground/80",
  "marker:text-neutral-500 dark:marker:text-neutral-500",
);

export function Ul({ children }: PropsWithChildren) {
  return <ul className={cn("list-disc space-y-2", MARKER)}>{children}</ul>;
}

export function Li({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}

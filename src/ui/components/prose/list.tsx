import type { PropsWithChildren } from "react";
import { cn } from "@/ui/lib/cn";

const MARKER = cn(
  "pl-5 text-base/8 text-pretty text-foreground/80",
  "marker:text-neutral-400 dark:marker:text-neutral-600",
);

export function Ul({ children }: PropsWithChildren) {
  return <ul className={cn("list-disc space-y-2", MARKER)}>{children}</ul>;
}

export function Ol({ children }: PropsWithChildren) {
  return <ol className={cn("list-decimal space-y-3", MARKER)}>{children}</ol>;
}

export function Li({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}

import type { PropsWithChildren } from "react";
import { cn } from "@fyi/ui/lib/cn";

export function InlineCode({ children }: PropsWithChildren) {
  return (
    <code
      className={cn(
        "rounded-sm px-1 py-0.5 text-sm",
        "bg-neutral-200/60 text-neutral-900 ring ring-neutral-200",
        "dark:bg-neutral-800/60 dark:text-white dark:ring-neutral-800",
      )}
    >
      {children}
    </code>
  );
}

import type { PropsWithChildren } from "react";
import { cn } from "@/ui/lib/cn";

type CalloutProps = PropsWithChildren<{
  className?: string;
}>;

export function Callout({ className, children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-lg px-4 py-3",
        "text-base/8 text-pretty text-foreground/80",
        "border-hairline border-current/6! bg-neutral-100/60 dark:bg-neutral-900/60",
        className,
      )}
    >
      {children}
    </aside>
  );
}

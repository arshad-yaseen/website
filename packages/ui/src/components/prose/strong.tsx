import type { PropsWithChildren } from "react";

export function Strong({ children }: PropsWithChildren) {
  return <strong className="font-medium text-neutral-800 dark:text-neutral-200">{children}</strong>;
}

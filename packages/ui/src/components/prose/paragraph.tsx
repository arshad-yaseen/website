import type { PropsWithChildren } from "react";

export function P({ children }: PropsWithChildren) {
  return <p className="text-base/8 text-pretty text-foreground/75">{children}</p>;
}

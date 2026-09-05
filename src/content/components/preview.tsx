import type { PropsWithChildren } from "react";

/** The frame every rendered example sits in, so demos share one stage. */
export function Preview({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border-hairline border-current/10 p-8">
      {children}
    </div>
  );
}

import type { PropsWithChildren } from "react";

export function Preview({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border-hairline border-current/10 p-8">
      {children}
    </div>
  );
}

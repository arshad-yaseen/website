import type { PropsWithChildren } from "react";

export default function WritingsLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto w-full max-w-2xl px-(--layout-padding) pt-12 pb-32 sm:pt-20">
      {children}
    </main>
  );
}

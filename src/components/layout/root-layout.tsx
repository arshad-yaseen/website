import type { PropsWithChildren } from "react";
import Header from "./header";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col min-h-screen w-full [--header-height:--spacing(16)] [--layout-width:var(--container-5xl)]">
      <Header />
      <div className="h-[calc(100dvh-var(--header-height))] w-full">{children}</div>
    </main>
  );
}

import type { PropsWithChildren } from "react";
import Sidebar from "@/components/layout/sidebar";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-(--layout-width)">
      <Sidebar />
      <main className="min-w-0 flex-1 pt-8 pb-32 md:pl-6">{children}</main>
    </div>
  );
}

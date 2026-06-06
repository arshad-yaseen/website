import type { PropsWithChildren } from "react";
import Sidebar from "@/components/layout/sidebar";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full px-(--layout-padding) [--sidebar-width:--spacing(56)]">
      <div className="flex mx-auto max-w-(--layout-width)">
        <Sidebar />
        <main className="min-w-0 flex-1 pt-8 pb-32 md:pl-6">{children}</main>
      </div>
    </div>
  );
}

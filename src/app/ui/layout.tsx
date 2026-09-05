import type { PropsWithChildren } from "react";
import { Pagination } from "@/features/docs/components/pagination";
import { Sidebar } from "@/features/docs/components/sidebar";
import { getPaginationLinks } from "@/features/docs/lib/get-pagination-links";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full px-(--layout-padding) [--sidebar-width:--spacing(56)]">
      <div className="mx-auto flex max-w-(--layout-width)">
        <Sidebar />
        <main className="min-w-0 flex-1 pt-8 pb-32 md:pl-6">
          {children}
          <Pagination links={getPaginationLinks()} />
        </main>
      </div>
    </div>
  );
}

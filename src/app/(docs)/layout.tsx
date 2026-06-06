import type { PropsWithChildren } from "react";
import Pagination, { type PaginationItem } from "@/components/layout/pagination";
import Sidebar from "@/components/layout/sidebar";
import { pages, sections } from "@/registry";

export default function DocsLayout({ children }: PropsWithChildren) {
  const items: PaginationItem[] = [
    ...pages.map((page) => ({ title: page.title, href: `/${page.slug}` })),
    { title: "Notes", href: "/notes" },
    ...sections
      .filter((section) => section.docs.length > 0)
      .flatMap((section) =>
        section.docs.map((doc) => ({ title: doc.title, href: `/${section.slug}/${doc.slug}` })),
      ),
  ];

  return (
    <div className="w-full px-(--layout-padding) [--sidebar-width:--spacing(56)]">
      <div className="flex mx-auto max-w-(--layout-width)">
        <Sidebar />
        <main className="min-w-0 flex-1 pt-8 pb-32 md:pl-6">
          {children}
          <Pagination items={items} />
        </main>
      </div>
    </div>
  );
}

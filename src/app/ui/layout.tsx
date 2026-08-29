import type { PropsWithChildren } from "react";
import { Pagination, type PaginationItem } from "@/components/docs/pagination";
import { Sidebar } from "@/components/docs/sidebar";
import { guides, notes, sections } from "@/content";

export default function DocsLayout({ children }: PropsWithChildren) {
  const items: PaginationItem[] = [
    ...guides.map((guide, index) => ({
      title: guide.title,
      href: index === 0 ? "/ui" : `/ui/${guide.slug}`,
    })),
    { title: "Notes", href: "/ui/notes" },
    ...notes.map((note) => ({ title: note.title, href: `/ui/notes/${note.slug}` })),
    ...sections
      .filter((section) => section.docs.length > 0)
      .flatMap((section) =>
        section.docs.map((doc) => ({ title: doc.title, href: `/ui/${section.slug}/${doc.slug}` })),
      ),
  ];

  return (
    <div className="w-full px-(--layout-padding) [--sidebar-width:--spacing(56)]">
      <div className="mx-auto flex max-w-(--layout-width)">
        <Sidebar />
        <main className="min-w-0 flex-1 pt-8 pb-32 md:pl-6">
          {children}
          <Pagination items={items} />
        </main>
      </div>
    </div>
  );
}

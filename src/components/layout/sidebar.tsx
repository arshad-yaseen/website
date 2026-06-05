import { pages, sections } from "@/registry";
import NavLink from "./nav-link";

export default function Sidebar() {
  return (
    <aside className="hidden w-(--sidebar-width) shrink-0 overflow-y-auto py-8 pr-6 md:block">
      <nav className="flex flex-col gap-8">
        <ul className="flex flex-col gap-1">
          {pages.map((page) => (
            <li key={page.slug}>
              <NavLink href={`/${page.slug}`}>{page.title}</NavLink>
            </li>
          ))}
          <li>
            <NavLink href="/notes">Notes</NavLink>
          </li>
        </ul>
        {sections
          .filter((section) => section.docs.length > 0)
          .map((section) => (
            <div key={section.slug} className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">{section.title}</h4>
              <ul className="flex flex-col gap-1">
                {section.docs.map((doc) => (
                  <li key={doc.slug}>
                    <NavLink href={`/${section.slug}/${doc.slug}`}>{doc.title}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </nav>
    </aside>
  );
}

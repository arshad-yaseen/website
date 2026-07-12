import { pages, sections } from "@/registry";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <nav className="flex flex-col gap-8">
      <ul className="flex flex-col gap-1">
        {pages.slice(0, 1).map((page) => (
          <li key={page.slug}>
            <NavLink href={`/ui/${page.slug}`}>{page.title}</NavLink>
          </li>
        ))}
        <li>
          <NavLink href="/ui/notes">Notes</NavLink>
        </li>
        {pages.slice(1).map((page) => (
          <li key={page.slug}>
            <NavLink href={`/ui/${page.slug}`}>{page.title}</NavLink>
          </li>
        ))}
      </ul>
      {sections
        .filter((section) => section.docs.length > 0)
        .map((section) => (
          <div key={section.slug} className="flex flex-col gap-2">
            <p className="text-sm font-medium">{section.title}</p>
            <ul className="flex flex-col gap-1">
              {section.docs.map((doc) => (
                <li key={doc.slug}>
                  <NavLink href={`/ui/${section.slug}/${doc.slug}`}>{doc.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </nav>
  );
}

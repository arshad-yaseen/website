import { pages, sections } from "@/registry";
import NavLink from "./nav-link";

export default function Nav() {
  return (
    <nav className="flex flex-col gap-8">
      <ul className="flex flex-col gap-1">
        {pages.map((page) => (
          <li key={page.slug}>
            <NavLink href={`/ui/${page.slug}`}>{page.title}</NavLink>
          </li>
        ))}
        <li>
          <NavLink href="/ui/notes">Notes</NavLink>
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
                  <NavLink href={`/ui/${section.slug}/${doc.slug}`}>{doc.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </nav>
  );
}

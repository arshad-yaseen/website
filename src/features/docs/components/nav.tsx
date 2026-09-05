import { sections } from "@/content/config/sections";
import { getSectionDocs } from "@/content/lib/get-section-docs";
import { NavLink } from "@/features/docs/components/nav-link";
import { introduction } from "@/content/guides/introduction";
import { notesIndex } from "@/features/docs/config/notes-index";

export function Nav() {
  return (
    <nav className="flex flex-col gap-8">
      <ul className="flex flex-col gap-1">
        <li>
          <NavLink href="/ui" isExact>
            {introduction.title}
          </NavLink>
        </li>
        <li>
          <NavLink href="/ui/notes">{notesIndex.title}</NavLink>
        </li>
      </ul>
      {sections.map((section) => (
        <div key={section.slug} className="flex flex-col gap-2">
          <p className="text-sm font-medium">{section.title}</p>
          <ul className="flex flex-col gap-1">
            {getSectionDocs(section.slug).map((doc) => (
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

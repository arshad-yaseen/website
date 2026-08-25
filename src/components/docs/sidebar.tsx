import { Nav } from "./nav";

export function Sidebar() {
  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100dvh-var(--header-height))] w-(--sidebar-width) shrink-0 self-start py-8 pr-6 md:block">
      <Nav />
    </aside>
  );
}

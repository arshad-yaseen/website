import { Nav } from "@/features/docs/components/nav";
import { cn } from "@fyi/ui/lib/cn";

export function Sidebar() {
  return (
    <aside
      className={cn(
        "sticky top-(--header-height) hidden md:block",
        "h-[calc(100dvh-var(--header-height))] w-(--sidebar-width) shrink-0",
        "self-start py-8 pr-6",
      )}
    >
      <Nav />
    </aside>
  );
}

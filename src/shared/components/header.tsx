"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/shared/components/logo";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { cn } from "@/ui/lib/cn";

/** One path segment up from the current page, so each logo click walks toward home. */
function parentPath(pathname: string): Route {
  // Every ancestor of a real route is itself a route, which `Route` cannot prove.
  return (pathname.slice(0, pathname.lastIndexOf("/")) || "/") as Route;
}

export function Header() {
  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writings");
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-10",
        !isWriting && "border-b-hairline! border-current/10 bg-background",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-(--header-height) w-full items-center justify-between",
          "max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))] px-(--layout-padding)",
          "border-x-hairline",
          isHome ? "border-current/10" : "border-transparent",
        )}
      >
        <Link href={parentPath(pathname)} aria-label="Arshad Yaseen" className="shrink-0">
          <Logo className="h-6" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

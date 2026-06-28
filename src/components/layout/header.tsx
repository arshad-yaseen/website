"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import ThemeToggle from "../theme/theme-toggle";
import Logo from "./logo";

export default function Header() {
  const pathname = usePathname();
  const isWriting = pathname.startsWith("/writings");

  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-background",
        !isWriting && "border-b-hairline border-current/10",
      )}
    >
      <div
        className={`mx-auto flex h-(--header-height) w-full max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))] items-center justify-between border-x-hairline px-(--layout-padding) ${pathname === "/" ? "border-current/10" : "border-transparent"}`}
      >
        <Link href="/" aria-label="Arshad Yaseen" className="shrink-0">
          <Logo className="h-6" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

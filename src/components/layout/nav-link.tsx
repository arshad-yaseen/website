"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type NavLinkProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
}>;

export default function NavLink<T extends string>({ href, children }: NavLinkProps<T>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="block text-sm text-neutral-600 aria-[current=page]:text-neutral-900 -mx-2 dark:hover:text-neutral-300 hover:text-neutral-800 transition-colors dark:text-neutral-400 dark:aria-[current=page]:text-white dark:aria-[current=page]:bg-neutral-900/80 aria-[current=page]:bg-neutral-200/60 px-2 py-1 rounded-md"
    >
      {children}
    </Link>
  );
}

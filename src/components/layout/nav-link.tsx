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
      className="block text-sm text-neutral-600 aria-[current=page]:text-neutral-900 dark:text-neutral-400 dark:aria-[current=page]:text-white"
    >
      {children}
    </Link>
  );
}

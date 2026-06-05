"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function NavLink({ href, children }: PropsWithChildren<{ href: string }>) {
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

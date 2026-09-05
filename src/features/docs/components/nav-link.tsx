"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/cn";

type NavLinkProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
  /** Only highlight on an exact pathname match, not on descendant routes. */
  isExact?: boolean;
}>;

export function NavLink<T extends string>({ href, isExact, children }: NavLinkProps<T>) {
  const pathname = usePathname();
  const isCurrent = pathname === href;
  const isActive = isCurrent || (!isExact && pathname.startsWith(`${href}/`));

  return (
    <Button
      variant={isActive ? "solid" : "plain"}
      color="neutral"
      className={cn(
        "-mx-2.5 w-[calc(100%+(--spacing(5)))] justify-start",
        !isActive && [
          "[--plain-fg:var(--color-neutral-600)] dark:[--plain-fg:var(--color-neutral-400)]",
          "hover-open:[--plain-fg:var(--color-neutral-900)] dark:hover-open:[--plain-fg:var(--color-white)]",
        ],
      )}
      render={<Link href={href} role="link" aria-current={isCurrent ? "page" : undefined} />}
    >
      {children}
    </Button>
  );
}

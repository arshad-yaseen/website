"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Button } from "@/ui/button";

type NavLinkProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
}>;

export default function NavLink<T extends string>({ href, children }: NavLinkProps<T>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "solid" : "plain"}
      color="neutral"
      className="-mx-2.5 w-[calc(100%+(--spacing(5)))] justify-start"
      render={<Link href={href} role="link" aria-current={isActive ? "page" : undefined} />}
    >
      {children}
    </Button>
  );
}

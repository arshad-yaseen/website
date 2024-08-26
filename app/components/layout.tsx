"use client";

import { PropsWithChildren } from "react";
import { Navbar } from "./nav";
import Footer from "./footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  if (pathname != "/" && pathname != "/blog") {
    return (
      <main className="mx-auto flex relative flex-col items-center text-black bg-white">
        {children}
      </main>
    );
  }
  return (
    <main className="flex-auto min-w-0 max-w-xl lg:mx-auto mt-6 flex flex-col px-2 md:px-0 text-black bg-white dark:text-white dark:bg-black">
      <Navbar />
      {children}
      <Footer />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}

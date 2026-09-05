import Link from "next/link";
import { HeroArt } from "@/features/home/components/hero-art";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/cn";

// A hairline that bleeds past the centered layout box out to the screen edges.
const BLEED_RULE = cn(
  "relative",
  "before:pointer-events-none before:absolute before:top-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-t-hairline before:border-current/10 before:content-['']",
  "after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:w-screen after:-translate-x-1/2 after:border-b-hairline after:border-current/10 after:content-['']",
);

export function Hero() {
  return (
    <section
      className={cn(
        "relative mx-auto w-full",
        "h-[calc(100dvh-var(--header-height))]",
        "max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))]",
        "border-x-hairline border-current/10",
      )}
    >
      <div className="absolute h-100 w-full mask-b-from-52">
        <HeroArt />
      </div>
      <div className="relative z-20 flex size-full flex-col justify-center">
        <h1 className="mx-(--layout-padding) text-xl/12 font-medium tracking-tight text-balance">
          Arshad Yaseen
        </h1>

        <p className="mx-(--layout-padding) text-base/8 text-pretty text-neutral-600 dark:text-neutral-400">
          <span className="relative inline-flex align-bottom">
            High-performance systems, compilers, and most of computer science. Mathematics.
            Interfaces. Less is more.
          </span>
        </p>

        <div
          className={cn(
            BLEED_RULE,
            "mt-4 flex flex-wrap gap-2 bg-background px-(--layout-padding) py-3",
          )}
        >
          <Button className="rounded-full" render={<Link href="/ui" />}>
            Explore UI
          </Button>
          <Button variant="outline" className="rounded-full" render={<Link href="/writings" />}>
            Writings
          </Button>
        </div>
      </div>
    </section>
  );
}

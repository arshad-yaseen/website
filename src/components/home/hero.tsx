import { WritingsList } from "@/components/writings/writings-list";
import { Button } from "@/ui/button";
import Link from "next/link";
import { HeroArt } from "./hero-art";

export function Hero() {
  return (
    <section className="relative mx-auto h-[calc(100dvh-var(--header-height))] w-full max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))] border-x-hairline border-current/10 [--writing-list-item-padding-x:--spacing(3)]">
      <div className="absolute h-100 w-full mask-b-from-52">
        <HeroArt />
      </div>
      <div className="relative z-20 flex size-full flex-col justify-center [--padding-x:var(--layout-padding)] sm:[--padding-x:--spacing(6)]">
        <h1 className="mx-[calc(var(--padding-x)+var(--writing-list-item-padding-x))] text-xl/12 font-medium tracking-tight text-balance">
          Arshad Yaseen
        </h1>

        <p
          className="mx-[calc(var(--padding-x)+var(--writing-list-item-padding-x))] text-base/8 text-pretty text-neutral-600 dark:text-neutral-400"
        >
          <span className="relative inline-flex align-bottom">
            High-performance systems, compilers, and most of computer science. Mathematics. Interfaces. Less is more.
          </span>
        </p>

        <div className="rule-bleed mt-4 flex flex-wrap justify-center gap-2 bg-background px-(--padding-x) py-3">
          <Button className="rounded-full" render={<Link href="/ui" />}>
            Explore UI
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            render={<Link href="https://github.com/arshad-yaseen" target="_blank" />}
          >
            Projects
          </Button>
        </div>

        <div className="rule-bleed bg-background px-(--padding-x) py-6">
          <div className="mx-auto w-full">
            <WritingsList />
          </div>
        </div>
      </div>
    </section>
  );
}

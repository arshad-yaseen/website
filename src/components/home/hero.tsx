import Link from "next/link";
import { Button } from "@/ui/button";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-(--layout-width) flex-col items-center gap-6 text-center">
      <h1 className="max-w-2xl text-4xl/12 tracking-tight text-balance sm:text-6xl/18">
        UI components, crafted with intent.
      </h1>

      <p className="max-w-xl text-base/7 text-pretty text-neutral-600 sm:text-lg/8 dark:text-neutral-400">
        A living collection of components, experiments, and design notes for design engineers, from
        me.
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button size="lg" className="rounded-full" render={<Link href="/introduction" />}>
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          render={<Link href="/components" />}
        >
          Explore components
        </Button>
      </div>
    </section>
  );
}

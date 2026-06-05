import Link from "next/link";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function Hero() {
  return (
    <section className="flex w-full max-w-(--layout-width) flex-col text-center mx-auto items-center gap-6">
      <h1 className="tracking-tight max-w-2xl text-4xl/12 text-balance sm:text-6xl/18">
        UI components, crafted with intent.
      </h1>

      <p className="max-w-xl text-base/7 text-pretty text-neutral-600 dark:text-neutral-400 sm:text-lg/8">
        A living collection of components, experiments, and design notes for design engineers, from
        me.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-2">
        <Button size="lg" className="rounded-full" render={<Link href="/components" />}>
          Explore components
        </Button>
        <Button size="lg" color="neutral" className="rounded-full">
          Github
          <Icon name="ArrowUpRight" />
        </Button>
      </div>
    </section>
  );
}

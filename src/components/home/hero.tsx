import { Button } from "@/ui/button";
import Link from "next/link";
import { HeroArt } from "./hero-art";
import { Icon } from "@/ui/icon";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[calc(100dvh-var(--header-height))] w-full max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))] border-x-hairline border-current/6">
      <div className="absolute w-full mask-b-from-52">
        <HeroArt />
      </div>
      <div className="relative z-20 mx-auto flex size-full flex-col justify-end pt-52">
        <h1 className="mx-(--layout-padding) text-4xl/12 tracking-tight text-balance sm:text-4xl/16">
          Arshad Yaseen
        </h1>

        <p className="mx-(--layout-padding) text-base/7 text-pretty text-neutral-600 dark:text-neutral-400">
          Design Engineer
        </p>

        <div className="mt-4 flex flex-wrap gap-3 border-y-hairline border-current/6 bg-background px-(--layout-padding) py-2">
          <Button size="lg" className="rounded-full" render={<Link href="/introduction" />}>
            Explore UI
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            render={<Link href="https://github.com/arshad-yaseen" target="_blank" />}
          >
            <Icon name="Github" />
            Projects
          </Button>
        </div>

        <div className="grid h-44 w-full grid-cols-2 divide-x-hairline divide-current/6 bg-background"></div>
      </div>
    </section>
  );
}

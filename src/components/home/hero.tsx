import { WritingsList } from "@/components/writings/writings-list";
import { Button } from "@/ui/button";
import Link from "next/link";
import { HeroArt } from "./hero-art";
import { HeroRole } from "./hero-role";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[calc(100dvh-var(--header-height))] w-full max-w-[calc(var(--layout-width)+(var(--layout-padding)*2))] border-x-hairline border-current/10">
      <div className="absolute h-100 w-full mask-b-from-52">
        <HeroArt />
      </div>
      <div className="relative z-20 flex size-full flex-col justify-center">
        <h1 className="mx-(--layout-padding) text-center text-2xl/12 font-medium tracking-tight text-balance">
          Arshad Yaseen
        </h1>

        <HeroRole />

        <div className="rule-bleed mt-4 flex flex-wrap justify-center gap-2 bg-background px-(--layout-padding) py-3">
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

        <div className="rule-bleed bg-background px-(--layout-padding) py-6 sm:px-6">
          <div className="mx-auto w-full">
            <WritingsList />
          </div>
        </div>
      </div>
    </section>
  );
}

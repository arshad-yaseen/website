import { Button } from "@/ui/button";

export default function Hero() {
  return (
    <section className="flex max-w-2xl flex-col items-center gap-8 text-center">
      <h1 className="tracking-tight text-4xl/12 text-balance sm:text-6xl/18">
        Build high-quality motion videos using AI
      </h1>

      <p className="max-w-xl text-base text-pretty text-neutral-600 dark:text-neutral-400 sm:text-lg">
        A living collection of components, experiments, and design notes for design engineers, from
        Arshad Yaseen.
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="rounded-full">
          Get Started
        </Button>
      </div>
    </section>
  );
}

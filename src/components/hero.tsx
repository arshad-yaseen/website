// import { Button } from "@/ui/button";
// import { Icon } from "@/ui/icon";

export default function Hero() {
  return (
    <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
      <h1 className="tracking-tight text-4xl/12 text-balance sm:text-7xl/20">
        UI components, crafted with intent.
      </h1>

      <p className="max-w-xl text-base text-pretty text-neutral-600 dark:text-neutral-400 sm:text-lg">
        A living collection of components, experiments, and design notes for design engineers, from
        Arshad Yaseen.
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {/*<Button>
          Browse components
          <Icon name="ArrowRight01" />
        </Button>*/}
      </div>
    </section>
  );
}

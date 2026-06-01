import { Button } from "@/ui/button";

export default function Hero() {
  return (
    <section className="flex w-full max-w-(--layout-width) mx-auto items-end gap-6">
      <h1 className="tracking-tight max-w-4xl text-4xl/12 text-balance sm:text-5xl/15">
        Build stunning <br /> motion videos using AI
      </h1>

      <div className="flex flex-wrap items-center gap-3 ml-auto mb-1">
        <Button size="lg" className="rounded-full">
          Get Started
        </Button>
      </div>
    </section>
  );
}

import { Preview } from "@/components/docs/preview";
import { Callout, InlineCode, P } from "@/components/docs/prose";
import { cn } from "@/utils/cn";
import type { Note } from "../types";

function Comparison() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Square className="border border-black/15 dark:border-white/10" label="border-black/15" />
      <Square className="ring ring-black/15 dark:ring-white/10" label="ring-black/15" />
    </div>
  );
}

type SquareProps = {
  className: string;
  label: string;
};

function Square({ className, label }: SquareProps) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className={cn("size-32 rounded-2xl shadow-xl", className)} />
      <figcaption className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
        {label}
      </figcaption>
    </figure>
  );
}

export default {
  slug: "rings-over-borders",
  title: "Rings over borders",
  description: "Rings stay crisp over drop shadows. Borders melt into them.",
  date: "2026-06-06",
  body: (
    <>
      <P>
        Same edge, same color, same drop shadow. The left square draws it with a border, the right
        one with a ring.
      </P>

      <Callout className="hidden dark:block">
        Shadows barely show in dark mode. Switch to light mode to see the difference.
      </Callout>

      <Preview>
        <Comparison />
      </Preview>

      <P>
        A border is painted inside the element, so it melts into the shadow beneath it. A ring is a
        box shadow, <InlineCode>0 0 0 1px</InlineCode>, drawn outside the element and composited
        over the drop shadow. The line stays crisp.
      </P>
    </>
  ),
} satisfies Note;

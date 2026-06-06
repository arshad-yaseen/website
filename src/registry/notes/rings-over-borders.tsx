import { Preview } from "@/components/docs/preview";
import { Callout, InlineCode, P } from "@/components/docs/prose";
import { cn } from "@/utils/cn";
import type { Note } from "../types";

type SquareProps = {
  className: string;
  label: string;
};

function Square({ className, label }: SquareProps) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className={cn("size-32 rounded-2xl shadow-lg", className)} />
      <figcaption className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
        {label}
      </figcaption>
    </figure>
  );
}

function ShadowComparison() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Square className="border border-black/15 dark:border-white/10" label="border-black/15" />
      <Square className="ring ring-black/15 dark:ring-white/10" label="ring-black/15" />
    </div>
  );
}

type PillProps = {
  className: string;
  label: string;
};

function Pill({ className, label }: PillProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm",
        className,
      )}
    >
      {label}
    </div>
  );
}

function GradientComparison() {
  return (
    <div className="flex min-h-64 flex-wrap items-center justify-center gap-4 rounded-lg bg-linear-to-b from-neutral-400 to-neutral-600 p-8">
      <Pill className="border border-neutral-300" label="Border" />
      <Pill className="ring ring-black/10" label="Ring" />
    </div>
  );
}

export default {
  slug: "rings-over-borders",
  title: "Rings over borders",
  description: "Why rings draw crisper edges than borders, over shadows and on any background.",
  date: "2025-10-23",
  body: (
    <>
      <P>
        Both squares below draw the same 1px edge in the same color, above the same drop shadow. The
        first uses a border, the second a ring.
      </P>

      <Callout className="hidden dark:block">
        Drop shadows are faint in dark mode. Switch to light mode to see the full effect.
      </Callout>

      <Preview>
        <ShadowComparison />
      </Preview>

      <P>
        A border is painted inside the element, where it meets the drop shadow and softens into it.
        A ring is a box shadow, <InlineCode>0 0 0 1px</InlineCode>, rendered outside the element and
        composited above the drop shadow, so the edge remains a single crisp line.
      </P>

      <P>
        The same principle applies to backgrounds. A solid border is a fixed color chosen against
        one background, and it stops matching on any other. A low-opacity ring darkens whatever is
        behind it, so the edge holds on gradients, dark surfaces, and images.
      </P>

      <GradientComparison />

      <P>
        Rings render a crisp edge above shadows, adapt to any background, and add no width to the
        box. Prefer a ring where you would otherwise reach for a border.
      </P>
    </>
  ),
} satisfies Note;

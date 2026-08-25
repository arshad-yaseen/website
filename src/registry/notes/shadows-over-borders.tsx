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

function ImageComparison() {
  return (
    <div className="flex min-h-64 flex-wrap items-center justify-center gap-4 rounded-lg bg-[url(/notes/shadows-over-borders.webp)] bg-cover bg-center p-8">
      <Pill className="border border-neutral-300" label="Border" />
      <Pill className="ring ring-black/10" label="Shadow" />
    </div>
  );
}

export default {
  slug: "shadows-over-borders",
  title: "Shadows over borders",
  description:
    "Why an edge drawn as a shadow stays crisp over shadows and holds on any background.",
  date: "2025-10-23",
  body: (
    <>
      <P>
        An edge drawn as a shadow stays crisp above other shadows and holds on any background. Both
        squares below draw the same 1px edge, the first with a border, the second with a shadow,
        Tailwind’s <InlineCode>ring</InlineCode>.
      </P>

      <Callout className="hidden dark:block">
        Drop shadows are faint in dark mode. Switch to light mode to see the full effect.
      </Callout>

      <Preview>
        <ShadowComparison />
      </Preview>

      <P>
        A border paints inside the element, where it softens into the drop shadow. A{" "}
        <InlineCode>0 0 0 1px</InlineCode> shadow composites above it, so the line stays crisp.
      </P>

      <P>
        Backgrounds work the same way. A border color is picked for one background, while a
        low-opacity shadow darkens whatever is behind it, so the edge holds on gradients, dark
        surfaces, and images.
      </P>

      <ImageComparison />

      <P>
        Shadows add no width to the box either. Prefer one wherever you would reach for a border.
      </P>
    </>
  ),
} satisfies Note;

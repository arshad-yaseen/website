import type { ComponentProps } from "react";
import { cn } from "@fyi/ui/lib/cn";

// Drawn inline so the select needs no icon dependency.
const STROKE_ICON = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const BASE = cn("block shrink-0");

export function ChevronUpDownIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} className={cn(BASE, className)} {...props}>
      <path d="M5.75 10.75 8 13l2.25-2.25M10.25 5.25 8 3 5.75 5.25" />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} className={cn(BASE, className)} {...props}>
      <path d="M4 8.5 7 11.5 12 4.5" />
    </svg>
  );
}

export function ChevronUpIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} className={cn(BASE, className)} {...props}>
      <path d="M4 10 8 6l4 4" />
    </svg>
  );
}

export function ChevronDownIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} className={cn(BASE, className)} {...props}>
      <path d="M4 6 8 10l4-4" />
    </svg>
  );
}

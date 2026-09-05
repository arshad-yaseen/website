import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// `hairline` is a project border width. Without this, tailwind-merge reads it as a
// border color and drops it whenever a border-color class follows in the same call.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "border-w": ["border-hairline"],
      "border-w-x": ["border-x-hairline"],
      "border-w-y": ["border-y-hairline"],
      "border-w-s": ["border-s-hairline"],
      "border-w-e": ["border-e-hairline"],
      "border-w-t": ["border-t-hairline"],
      "border-w-r": ["border-r-hairline"],
      "border-w-b": ["border-b-hairline"],
      "border-w-l": ["border-l-hairline"],
    },
  },
});

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

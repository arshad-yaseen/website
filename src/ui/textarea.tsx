import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const textareaVariants = cva(
  [
    "block min-h-16 w-full resize-y rounded-md bg-transparent text-foreground",
    "ring ring-black/15 enabled:shadow-sm dark:ring-white/12",
    "enabled:not-data-invalid:hover:ring-black/25 dark:enabled:not-data-invalid:hover:ring-white/20",
    "data-invalid:enabled:hover:ring-danger-500/70",
    "placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
    "transition-[color,box-shadow] duration-150 ease-out motion-reduce:transition-none",

    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
    "data-invalid:ring-danger-500/50 data-invalid:focus-visible:outline-danger-500 dark:data-invalid:ring-danger-500/50",
    "disabled:cursor-not-allowed disabled:bg-neutral-200/50 disabled:opacity-50 dark:disabled:bg-neutral-800/50",

    "touch-manipulation pointer-coarse:text-base",
  ],
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-sm/6",
        md: "px-2.5 py-1.5 text-sm/6",
        lg: "px-3 py-2 text-sm/6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaProps = ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>;

export function Textarea({ size, className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaVariants({ size }), className)} {...props} />;
}

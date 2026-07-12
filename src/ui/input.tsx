import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Input as BaseInput } from "@base-ui/react/input";

const inputVariants = cva(
  [
    "block w-full rounded-md bg-transparent text-foreground",
    "ring ring-black/15 not-data-disabled:shadow-sm dark:ring-white/12",
    "not-data-disabled:not-data-invalid:hover:ring-black/25 dark:not-data-disabled:not-data-invalid:hover:ring-white/20",
    "data-invalid:not-data-disabled:hover:ring-danger-500/70",
    "placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
    "transition-[color,box-shadow] duration-150 motion-reduce:transition-none",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
    "data-invalid:ring-danger-500/50 data-invalid:focus-visible:outline-danger-500 dark:data-invalid:ring-danger-500/50",
    "data-disabled:cursor-not-allowed data-disabled:bg-neutral-200/50 data-disabled:opacity-50 dark:data-disabled:bg-neutral-800/50",
    "touch-manipulation",
  ],
  {
    variants: {
      size: {
        sm: "min-h-7 px-2 py-0.5 text-sm/6",
        md: "min-h-8 px-2.5 py-1 text-sm/6",
        lg: "min-h-9 px-3 py-1.5 text-sm/6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputProps = Omit<BaseInput.Props, "size"> & VariantProps<typeof inputVariants>;

export function Input({ size, className, ...props }: InputProps) {
  return <BaseInput className={cn(inputVariants({ size }), className)} {...props} />;
}

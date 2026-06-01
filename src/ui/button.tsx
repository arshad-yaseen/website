import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button as BaseUIButton } from "@base-ui/react";

const buttonVariants = cva(
  [
    "disabled:cursor-not-allowed cursor-pointer rounded-md relative isolate border-transparent inline-flex items-center justify-center gap-x-2 border font-medium",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
    "disabled:opacity-50",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:my-1",
  ],
  {
    variants: {
      variant: {
        solid: ["bg-(--solid-bg) text-(--solid-fg) *:data-[slot=icon]:text-(--solid-icon)"],
        plain: ["bg-(--plain-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)"],
      },
      color: {
        neutral: [
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-neutral-950)]/5 dark:hover:[--plain-bg:var(--color-white)]/10 [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)]",

          "[--solid-bg:var(--color-neutral-200)] dark:[--solid-bg:var(--color-neutral-800)] hover:[--solid-bg:var(--color-neutral-300)]/60 dark:hover:[--solid-bg:var(--color-neutral-700)]/60 [--solid-icon:var(--color-neutral-900)] dark:[--solid-icon:var(--color-neutral-200)]",
        ],
        "dark/white": [
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-neutral-900)] dark:hover:[--plain-bg:var(--color-white)] [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] hover:[--plain-fg:var(--color-white)] dark:hover:[--plain-fg:var(--color-neutral-900)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)] hover:[--plain-icon:var(--color-neutral-400)] dark:hover:[--plain-icon:var(--color-neutral-500)]",

          "[--solid-bg:var(--color-neutral-900)] dark:[--solid-bg:var(--color-white)] hover:[--solid-bg:var(--color-neutral-800)] dark:hover:[--solid-bg:var(--color-neutral-100)] [--solid-fg:var(--color-white)] dark:[--solid-fg:var(--color-neutral-900)] [--solid-icon:var(--color-neutral-400)] dark:[--solid-icon:var(--color-neutral-500)]",
        ],
      },
      size: {
        sm: [
          "px-[calc(--spacing(2)-1px)] py-[calc(--spacing(0.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-3.5",
        ],
        md: [
          "px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
        lg: [
          "px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

const DEFAULT_VARIANT = "solid";

const DEFAULT_COLOR_BY_VARIANT = {
  solid: "dark/white",
  plain: "neutral",
} as const;

export type ButtonProps = BaseUIButton.Props & VariantProps<typeof buttonVariants>;

export function Button({ children, size, variant, color, className, ...props }: ButtonProps) {
  const resolvedVariant = variant ?? DEFAULT_VARIANT;
  const resolvedColor = color ?? DEFAULT_COLOR_BY_VARIANT[resolvedVariant];

  return (
    <BaseUIButton
      type="button"
      {...props}
      className={cn(
        buttonVariants({
          size,
          color: resolvedColor,
          variant: resolvedVariant,
        }),
        className,
      )}
    >
      {children}
    </BaseUIButton>
  );
}

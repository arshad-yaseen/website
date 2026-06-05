import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button as BaseUIButton } from "@base-ui/react";

const buttonVariants = cva(
  [
    "disabled:cursor-not-allowed cursor-pointer rounded-md relative isolate border-transparent inline-flex items-center justify-center gap-x-1 border font-medium",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:opacity-50",
    "touch-manipulation pointer-coarse:min-h-11",
    "transition-[background-color,color] duration-150 ease-out motion-reduce:transition-none",
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
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-neutral-200)] dark:hover:[--plain-bg:var(--color-neutral-800)] [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)]",

          "[--solid-bg:var(--color-neutral-200)] dark:[--solid-bg:var(--color-neutral-800)] hover:[--solid-bg:var(--color-neutral-300)]/60 dark:hover:[--solid-bg:var(--color-neutral-700)]/60 [--solid-icon:var(--color-neutral-900)] dark:[--solid-icon:var(--color-neutral-400)] dark:hover:[--solid-icon:var(--color-neutral-300)]",
        ],
        "dark/white": [
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-neutral-900)] dark:hover:[--plain-bg:var(--color-white)] [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] hover:[--plain-fg:var(--color-white)] dark:hover:[--plain-fg:var(--color-neutral-900)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)] hover:[--plain-icon:var(--color-neutral-400)] dark:hover:[--plain-icon:var(--color-neutral-500)]",

          "[--solid-bg:var(--color-neutral-900)] dark:[--solid-bg:var(--color-white)] hover:[--solid-bg:var(--color-neutral-800)] dark:hover:[--solid-bg:var(--color-neutral-100)] [--solid-fg:var(--color-white)] dark:[--solid-fg:var(--color-neutral-900)] [--solid-icon:var(--color-neutral-400)] dark:[--solid-icon:var(--color-neutral-500)]",
        ],
        accent: [
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-accent-500)]/10 [--plain-fg:var(--color-accent-600)] dark:[--plain-fg:var(--color-accent-400)] [--plain-icon:var(--color-accent-500)]",

          "[--solid-bg:var(--color-accent-500)] hover:[--solid-bg:var(--color-accent-600)]/90 dark:hover:[--solid-bg:var(--color-accent-500)]/90 [--solid-fg:var(--color-white)] [--solid-icon:var(--color-accent-100)]",
        ],
      },
      size: {
        sm: [
          "min-h-7 px-[calc(--spacing(2)-1px)] py-[calc(--spacing(0.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-3.5",
        ],
        md: [
          "min-h-8 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
        lg: [
          "min-h-9 px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4.5",
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

export function Button({
  children,
  size,
  variant,
  color,
  className,
  type,
  nativeButton,
  render,
  ...props
}: ButtonProps) {
  const resolvedVariant = variant ?? DEFAULT_VARIANT;
  const resolvedColor = color ?? DEFAULT_COLOR_BY_VARIANT[resolvedVariant];
  const isNativeButton = nativeButton ?? !render;

  return (
    <BaseUIButton
      type={isNativeButton ? (type ?? "button") : type}
      nativeButton={isNativeButton}
      render={render}
      {...props}
      className={cn(
        buttonVariants({
          size,
          color: resolvedColor,
          variant: resolvedVariant,
        }),
        type === "submit" &&
          "transition-[background-color,color,transform] active:scale-[0.97] motion-reduce:active:scale-100",
        className,
      )}
    >
      {children}
    </BaseUIButton>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button as BaseUIButton } from "@base-ui/react";

const buttonVariants = cva(
  [
    "data-disabled:cursor-not-allowed cursor-pointer rounded-md relative isolate inline-flex items-center justify-center gap-x-2 font-medium",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-disabled:opacity-50",
    "touch-manipulation pointer-coarse:min-h-11",
    "transition-[background-color,color] *:data-[slot=icon]:transition-[color] duration-150 ease-out motion-reduce:transition-none",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:my-1",
  ],
  {
    variants: {
      variant: {
        solid: ["bg-(--solid-bg) text-(--solid-fg) *:data-[slot=icon]:text-(--solid-icon)"],
        outline: [
          "bg-(--outline-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)",
          "ring ring-(--outline-ring) not-data-disabled:shadow-sm",
        ],
        plain: ["bg-(--plain-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)"],
      },
      color: {
        neutral: [
          "[--plain-bg:transparent] hover-open:[--plain-bg:var(--color-neutral-200)] dark:hover-open:[--plain-bg:var(--color-neutral-800)] [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)]",

          "[--solid-bg:var(--color-neutral-200)] dark:[--solid-bg:var(--color-neutral-800)] hover-open:[--solid-bg:var(--color-neutral-300)]/60 dark:hover-open:[--solid-bg:var(--color-neutral-700)]/60 [--solid-icon:var(--color-neutral-900)] dark:[--solid-icon:var(--color-neutral-400)] dark:hover-open:[--solid-icon:var(--color-neutral-300)]",

          "[--outline-bg:transparent] hover-open:[--outline-bg:var(--color-neutral-200)]/50 dark:hover-open:[--outline-bg:var(--color-neutral-800)]/50 data-disabled:[--outline-bg:var(--color-neutral-200)]/50 dark:data-disabled:[--outline-bg:var(--color-neutral-800)]/50 [--outline-ring:var(--color-black)]/15 dark:[--outline-ring:var(--color-white)]/12",
        ],
        "dark/white": [
          "[--plain-bg:transparent] hover-open:[--plain-bg:var(--color-neutral-900)] dark:hover-open:[--plain-bg:var(--color-white)] [--plain-fg:var(--color-neutral-900)] dark:[--plain-fg:var(--color-white)] hover-open:[--plain-fg:var(--color-white)] dark:hover-open:[--plain-fg:var(--color-neutral-900)] [--plain-icon:var(--color-neutral-500)] dark:[--plain-icon:var(--color-neutral-400)] hover-open:[--plain-icon:var(--color-neutral-400)] dark:hover-open:[--plain-icon:var(--color-neutral-500)]",

          "[--solid-bg:var(--color-neutral-900)] dark:[--solid-bg:var(--color-white)] hover-open:[--solid-bg:var(--color-neutral-800)] dark:hover-open:[--solid-bg:var(--color-neutral-100)] [--solid-fg:var(--color-white)] dark:[--solid-fg:var(--color-neutral-900)] [--solid-icon:var(--color-neutral-400)] dark:[--solid-icon:var(--color-neutral-500)]",

          "[--outline-bg:transparent] hover-open:[--outline-bg:var(--color-neutral-900)] dark:hover-open:[--outline-bg:var(--color-white)] [--outline-ring:var(--color-black)]/60 dark:[--outline-ring:var(--color-white)]/60 hover-open:[--outline-ring:var(--color-neutral-900)] dark:hover-open:[--outline-ring:var(--color-white)]",
        ],
        accent: [
          "[--plain-bg:transparent] hover-open:[--plain-bg:var(--color-accent-500)]/10 [--plain-fg:var(--color-accent-600)] dark:[--plain-fg:var(--color-accent-400)] [--plain-icon:var(--color-accent-500)]",

          "[--solid-bg:var(--color-accent-500)] hover-open:[--solid-bg:var(--color-accent-600)]/90 dark:hover-open:[--solid-bg:var(--color-accent-500)]/90 [--solid-fg:var(--color-white)] [--solid-icon:var(--color-accent-100)]",

          "[--outline-bg:transparent] hover-open:[--outline-bg:var(--color-accent-500)]/10 data-disabled:[--outline-bg:var(--color-accent-500)]/10 [--outline-ring:var(--color-accent-500)]/40",
        ],
        success: [
          "[--plain-bg:transparent] hover-open:[--plain-bg:var(--color-success-500)]/10 [--plain-fg:var(--color-success-600)] dark:[--plain-fg:var(--color-success-400)] [--plain-icon:var(--color-success-500)]",

          "[--solid-bg:var(--color-success-500)] hover-open:[--solid-bg:var(--color-success-600)]/90 dark:hover-open:[--solid-bg:var(--color-success-500)]/90 [--solid-fg:var(--color-white)] [--solid-icon:var(--color-success-100)]",

          "[--outline-bg:transparent] hover-open:[--outline-bg:var(--color-success-500)]/10 data-disabled:[--outline-bg:var(--color-success-500)]/10 [--outline-ring:var(--color-success-500)]/40",
        ],
        danger: [
          "[--plain-bg:transparent] hover-open:[--plain-bg:var(--color-danger-500)]/10 [--plain-fg:var(--color-danger-600)] dark:[--plain-fg:var(--color-danger-400)] [--plain-icon:var(--color-danger-500)]",

          "[--solid-bg:var(--color-danger-500)] hover-open:[--solid-bg:var(--color-danger-600)]/90 dark:hover-open:[--solid-bg:var(--color-danger-500)]/90 [--solid-fg:var(--color-white)] [--solid-icon:var(--color-danger-100)]",

          "[--outline-bg:transparent] hover-open:[--outline-bg:var(--color-danger-500)]/10 data-disabled:[--outline-bg:var(--color-danger-500)]/10 [--outline-ring:var(--color-danger-500)]/40",
        ],
      },
      size: {
        sm: ["min-h-7 px-2 py-0.5 text-sm/6", "*:data-[slot=icon]:size-3.5"],
        md: ["min-h-8 px-2.5 py-1 text-sm/6", "*:data-[slot=icon]:size-4"],
        lg: ["min-h-9 px-3 py-1.5 text-sm/6", "*:data-[slot=icon]:size-4.5"],
      },
      elevated: {
        true: "",
      },
    },
    compoundVariants: [
      {
        elevated: true,
        variant: "solid",
        color: ["neutral", "dark/white"],
        className:
          "inset-ring inset-ring-black/4 dark:inset-ring-white/4 inset-shadow-2xs inset-shadow-black/6 dark:inset-shadow-white/6",
      },
      {
        elevated: true,
        variant: "solid",
        color: ["accent", "success", "danger"],
        className: "inset-ring inset-ring-white/15 inset-shadow-2xs inset-shadow-white/25",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

const DEFAULT_VARIANT = "solid";

const DEFAULT_COLOR_BY_VARIANT = {
  solid: "dark/white",
  outline: "neutral",
  plain: "neutral",
} as const;

export type ButtonProps = BaseUIButton.Props & VariantProps<typeof buttonVariants>;

export function Button({
  children,
  size,
  variant,
  color,
  elevated,
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
          elevated,
        }),
        type === "submit" &&
          "transition-[background-color,color,transform] not-data-disabled:active:scale-[0.97] motion-reduce:active:scale-100",
        className,
      )}
    >
      {children}
    </BaseUIButton>
  );
}

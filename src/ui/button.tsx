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
        plain: ["bg-(--plain-bg) text-(--plain-fg) *:data-[slot=icon]:text-(--plain-icon)"],
      },
      color: {
        neutral: [
          "[--plain-bg:transparent] hover:[--plain-bg:var(--color-neutral-200)] dark:hover:[--plain-bg:var(--color-neutral-800)] [--plain-icon:var(--color-neutral-900)] dark:[--plain-icon:var(--color-neutral-200)]",
        ],
      },
      size: {
        sm: [
          "px-[calc(--spacing(2)-1px)] py-[calc(--spacing(0.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
        md: [
          "px-[calc(--spacing(2.25)-1px)] py-[calc(--spacing(0.75)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
        lg: [
          "px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] text-sm/6",
          "*:data-[slot=icon]:size-4",
        ],
      },
    },
    defaultVariants: {
      variant: "plain",
      color: "neutral",
      size: "md",
    },
  },
);

export type ButtonProps = BaseUIButton.Props & VariantProps<typeof buttonVariants>;

export function Button({ children, size, variant, color, className, ...props }: ButtonProps) {
  return (
    <BaseUIButton
      type="button"
      {...props}
      className={cn(
        buttonVariants({
          size,
          color,
          variant,
        }),
        className,
      )}
    >
      {children}
    </BaseUIButton>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "disabled:cursor-not-allowed relative isolate border-transparent inline-flex items-center justify-center gap-x-2 border font-medium",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    "disabled:opacity-50",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
  ],
  {
    variants: {
      variant: {},
      color: {},
      size: {},
    },
    defaultVariants: {},
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  children,
  size,
  variant,
  color,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
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
    </button>
  );
}

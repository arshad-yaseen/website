import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva([""], {
  variants: {
    variant: {},
    color: {},
    size: {},
  },
  defaultVariants: {},
});

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

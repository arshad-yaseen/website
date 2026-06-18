import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle font-medium select-none",
    "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
  ],
  {
    variants: {
      size: {
        sm: "size-6 text-xs",
        md: "size-8 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarProps = AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>;

function Root({ size, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function Image({ className, ...props }: AvatarPrimitive.Image.Props) {
  return <AvatarPrimitive.Image className={cn("size-full object-cover", className)} {...props} />;
}

function Fallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    />
  );
}

export const Avatar = {
  Root,
  Image,
  Fallback,
};

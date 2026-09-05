import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/ui/lib/cn";

const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle",
    "rounded-full font-medium select-none",
    "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
    "@container",
  ],
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
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

export type AvatarImageProps = AvatarPrimitive.Image.Props;

function Image({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

/** Sized in container units so initials track whatever size the root sets. */
function Fallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center text-[40cqw] leading-none",
        className,
      )}
      {...props}
    />
  );
}

export const Avatar = {
  Root,
  Image,
  Fallback,
};

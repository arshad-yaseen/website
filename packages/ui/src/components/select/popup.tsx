import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@fyi/ui/lib/cn";

const POSITIONER = cn("z-50 outline-hidden select-none");

const POPUP = cn(
  "group relative min-w-(--anchor-width) origin-(--transform-origin)",
  "overflow-hidden rounded-[calc(var(--radius-md)_+_--spacing(1))] bg-clip-padding outline-hidden",
  "bg-background text-foreground",
  "shadow-lg ring shadow-black/5 ring-black/10 dark:shadow-black/40 dark:ring-white/10",
  "transition-[transform,scale,opacity] duration-100 ease-out motion-reduce:transition-none",
  "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
  "data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-75",
  "data-[side=none]:min-w-[calc(var(--anchor-width)_+_--spacing(7))]",
  "data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100",
  "data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:transition-none",
);

export type SelectPopupProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | "side"
    | "sideOffset"
    | "align"
    | "alignOffset"
    | "alignItemWithTrigger"
    | "anchor"
    | "arrowPadding"
    | "collisionAvoidance"
    | "collisionBoundary"
    | "collisionPadding"
    | "sticky"
    | "positionMethod"
  > & {
    /** Element to portal the popup into. Defaults to `document.body`. */
    container?: SelectPrimitive.Portal.Props["container"];
    /** Class applied to the positioner wrapper that owns placement. */
    positionerClassName?: SelectPrimitive.Positioner.Props["className"];
  };

/** Folds the portal and positioner into one part, so callers arrange only the popup. */
export function Popup({
  side,
  sideOffset = 4,
  align,
  alignOffset,
  alignItemWithTrigger,
  anchor,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  sticky,
  positionMethod,
  container,
  positionerClassName,
  className,
  ...props
}: SelectPopupProps) {
  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        anchor={anchor}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        positionMethod={positionMethod}
        data-slot="select-positioner"
        className={cn(POSITIONER, positionerClassName)}
      >
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(POPUP, className)}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

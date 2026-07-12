import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";
import { Select as SelectPrimitive } from "@base-ui/react/select";

const Root = SelectPrimitive.Root;

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false,
> = SelectPrimitive.Root.Props<Value, Multiple>;

function Label({ className, ...props }: SelectPrimitive.Label.Props) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "cursor-default text-sm/6 font-medium text-foreground select-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

const triggerVariants = cva(
  [
    "group/trigger relative inline-flex min-w-44 cursor-default items-center justify-between gap-2 rounded-md font-normal whitespace-nowrap select-none",
    "bg-transparent text-foreground",
    "ring ring-black/15 not-data-disabled:shadow-sm dark:ring-white/12",
    "transition-[background-color,box-shadow,color] duration-150 motion-reduce:transition-none",
    "hover-open:bg-neutral-200/50 dark:hover-open:bg-neutral-800/50",
    "data-disabled:cursor-not-allowed data-disabled:bg-neutral-200/50 data-disabled:opacity-50 dark:data-disabled:bg-neutral-800/50",
    "data-invalid:ring-danger-500/50 dark:data-invalid:ring-danger-500/50",
    "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-invalid:focus-visible:outline-danger-500",
    "touch-manipulation",
    "*:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-neutral-500 dark:*:data-[slot=icon]:text-neutral-400",
  ],
  {
    variants: {
      size: {
        sm: ["min-h-7 py-0.5 ps-2.5 pe-1.5 text-sm/6", "*:data-[slot=icon]:size-3.5"],
        md: ["min-h-8 py-1 ps-2.5 pe-2 text-sm/6", "*:data-[slot=icon]:size-4"],
        lg: ["min-h-9 py-1.5 ps-2.5 pe-2.5 text-sm/6", "*:data-[slot=icon]:size-4.5"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof triggerVariants>;

function Trigger({ size, className, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger className={cn(triggerVariants({ size }), className)} {...props} />
  );
}

const CONTENT_ICON = cn(
  "*:data-[slot=icon]:me-2 *:data-[slot=icon]:inline-block *:data-[slot=icon]:size-4 *:data-[slot=icon]:align-middle *:data-[slot=icon]:text-neutral-500 dark:*:data-[slot=icon]:text-neutral-400",
);

function Value({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      className={cn(
        "min-w-0 truncate text-start data-placeholder:text-neutral-500 dark:data-placeholder:text-neutral-400",
        CONTENT_ICON,
        className,
      )}
      {...props}
    />
  );
}

function Icon({ className, children, ...props }: SelectPrimitive.Icon.Props) {
  return (
    <SelectPrimitive.Icon
      data-slot="icon"
      className={cn("-me-0.5 flex items-center justify-center self-center", className)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className={cn(SVG_BASE, "size-full")} />}
    </SelectPrimitive.Icon>
  );
}

const POSITIONER = cn("z-50 outline-hidden select-none");

const POPUP = cn(
  "group relative min-w-(--anchor-width) origin-(--transform-origin) rounded-[calc(var(--radius-md)_+_--spacing(1))] bg-clip-padding",
  "bg-background text-foreground",
  "shadow-lg ring shadow-black/5 ring-black/10 dark:shadow-black/40 dark:ring-white/10",
  "overflow-hidden outline-hidden",
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

function Popup({
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
        className={cn(POSITIONER, positionerClassName)}
      >
        <SelectPrimitive.Popup className={cn(POPUP, className)} {...props} />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function List({ className, ...props }: SelectPrimitive.List.Props) {
  return (
    <SelectPrimitive.List
      className={cn(
        "relative max-h-(--available-height) scroll-py-7 overflow-y-auto overscroll-contain py-1",
        className,
      )}
      {...props}
    />
  );
}

function Item({ className, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "group/item relative isolate grid cursor-default scroll-my-1 grid-cols-[--spacing(4)_1fr] items-center gap-x-2 rounded-md ps-2.5 pe-4 text-sm/6 outline-hidden select-none",
        "py-[calc((var(--anchor-height,--spacing(8))-(--spacing(6)))/2)]",
        "text-foreground group-data-[side=none]:pe-10",
        "data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-[-0.5px] data-highlighted:before:-z-10 data-highlighted:before:rounded-md data-highlighted:before:bg-neutral-200 data-highlighted:before:content-[''] dark:data-highlighted:before:bg-neutral-800/50",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function ItemIndicator({ className, children, ...props }: SelectPrimitive.ItemIndicator.Props) {
  return (
    <SelectPrimitive.ItemIndicator
      className={cn("col-start-1 flex items-center justify-center", className)}
      {...props}
    >
      {children ?? <CheckIcon className={cn(SVG_BASE, "size-4")} />}
    </SelectPrimitive.ItemIndicator>
  );
}

function ItemText({ className, ...props }: SelectPrimitive.ItemText.Props) {
  return (
    <SelectPrimitive.ItemText
      className={cn("col-start-2 min-w-0 truncate", CONTENT_ICON, className)}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="description"
      className={cn(
        "col-start-2 -mt-0.5 min-w-0 truncate pb-0.5 text-xs/5 text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

function Group({ className, ...props }: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group className={cn("block pb-0.5 last:pb-0", className)} {...props} />;
}

function GroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "py-1.5 ps-8.5 pe-4 text-xs font-medium text-neutral-500 select-none dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

function Separator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-black/10 dark:bg-white/10", className)}
      {...props}
    />
  );
}

const SCROLL_ARROW = cn(
  "z-1 flex h-7 w-full cursor-default items-center justify-center text-neutral-500 dark:text-neutral-400",
  "bg-background",
  "before:absolute before:left-0 before:h-full before:w-full before:content-['']",
);

function ScrollUpArrow({ className, children, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn(SCROLL_ARROW, "top-0 data-[side=none]:before:-top-full", className)}
      {...props}
    >
      {children ?? <ChevronUpIcon className={cn(SVG_BASE, "size-4")} />}
    </SelectPrimitive.ScrollUpArrow>
  );
}

function ScrollDownArrow({ className, children, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn(SCROLL_ARROW, "bottom-0 data-[side=none]:before:-bottom-full", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon className={cn(SVG_BASE, "size-4")} />}
    </SelectPrimitive.ScrollDownArrow>
  );
}

const SVG_BASE = cn("block shrink-0");

const STROKE_ICON = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function ChevronUpDownIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} {...props}>
      <path d="M5.75 10.75 8 13l2.25-2.25M10.25 5.25 8 3 5.75 5.25" />
    </svg>
  );
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} {...props}>
      <path d="M4 8.5 7 11.5 12 4.5" />
    </svg>
  );
}

function ChevronUpIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} {...props}>
      <path d="M4 10 8 6l4 4" />
    </svg>
  );
}

function ChevronDownIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...STROKE_ICON} {...props}>
      <path d="M4 6 8 10l4-4" />
    </svg>
  );
}

export const Select = {
  Root,
  Label,
  Trigger,
  Value,
  Icon,
  Popup,
  List,
  Item,
  ItemIndicator,
  ItemText,
  ItemDescription,
  Group,
  GroupLabel,
  Separator,
  ScrollUpArrow,
  ScrollDownArrow,
};

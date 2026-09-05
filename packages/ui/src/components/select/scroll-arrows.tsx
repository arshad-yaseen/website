import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDownIcon, ChevronUpIcon } from "@fyi/ui/components/select/icons";
import { cn } from "@fyi/ui/lib/cn";

const SCROLL_ARROW = cn(
  "z-1 flex h-7 w-full cursor-default items-center justify-center",
  "bg-background text-neutral-500 dark:text-neutral-400",
  "before:absolute before:left-0 before:size-full before:content-['']",
);

export type SelectScrollUpArrowProps = SelectPrimitive.ScrollUpArrow.Props;

export function ScrollUpArrow({ className, children, ...props }: SelectScrollUpArrowProps) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(SCROLL_ARROW, "top-0 data-[side=none]:before:-top-full", className)}
      {...props}
    >
      {children ?? <ChevronUpIcon className="size-4" />}
    </SelectPrimitive.ScrollUpArrow>
  );
}

export type SelectScrollDownArrowProps = SelectPrimitive.ScrollDownArrow.Props;

export function ScrollDownArrow({ className, children, ...props }: SelectScrollDownArrowProps) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(SCROLL_ARROW, "bottom-0 data-[side=none]:before:-bottom-full", className)}
      {...props}
    >
      {children ?? <ChevronDownIcon className="size-4" />}
    </SelectPrimitive.ScrollDownArrow>
  );
}

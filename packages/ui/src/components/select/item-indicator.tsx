import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon } from "@fyi/ui/components/select/icons";
import { cn } from "@fyi/ui/lib/cn";

export type SelectItemIndicatorProps = SelectPrimitive.ItemIndicator.Props;

export function ItemIndicator({ className, children, ...props }: SelectItemIndicatorProps) {
  return (
    <SelectPrimitive.ItemIndicator
      data-slot="select-item-indicator"
      className={cn("col-start-1 flex items-center justify-center", className)}
      {...props}
    >
      {children ?? <CheckIcon className="size-4" />}
    </SelectPrimitive.ItemIndicator>
  );
}

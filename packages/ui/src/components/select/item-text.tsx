import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@fyi/ui/lib/cn";

export type SelectItemTextProps = SelectPrimitive.ItemText.Props;

export function ItemText({ className, ...props }: SelectItemTextProps) {
  return (
    <SelectPrimitive.ItemText
      data-slot="select-item-text"
      className={cn(
        "col-start-2 min-w-0 truncate",
        "*:data-[slot=icon]:me-2 *:data-[slot=icon]:inline-block *:data-[slot=icon]:size-4 *:data-[slot=icon]:align-middle",
        "*:data-[slot=icon]:text-neutral-500 dark:*:data-[slot=icon]:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

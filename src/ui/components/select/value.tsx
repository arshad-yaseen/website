import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectValueProps = SelectPrimitive.Value.Props;

export function Value({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "min-w-0 truncate text-start",
        "data-placeholder:text-neutral-600 dark:data-placeholder:text-neutral-400",
        "*:data-[slot=icon]:me-2 *:data-[slot=icon]:inline-block *:data-[slot=icon]:size-4 *:data-[slot=icon]:align-middle",
        "*:data-[slot=icon]:text-neutral-500 dark:*:data-[slot=icon]:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

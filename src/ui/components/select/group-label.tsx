import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectGroupLabelProps = SelectPrimitive.GroupLabel.Props;

export function GroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        "py-1.5 ps-8.5 pe-4 select-none",
        "text-xs font-medium text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

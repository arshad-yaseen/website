import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectLabelProps = SelectPrimitive.Label.Props;

export function Label({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "cursor-default text-sm/6 font-medium text-foreground select-none",
        "data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

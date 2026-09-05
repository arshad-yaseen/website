import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectGroupProps = SelectPrimitive.Group.Props;

export function Group({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("block pb-0.5 last:pb-0", className)}
      {...props}
    />
  );
}

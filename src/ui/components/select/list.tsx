import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectListProps = SelectPrimitive.List.Props;

export function List({ className, ...props }: SelectListProps) {
  return (
    <SelectPrimitive.List
      data-slot="select-list"
      className={cn(
        "relative max-h-(--available-height) py-1",
        "scroll-py-7 overflow-y-auto overscroll-contain",
        className,
      )}
      {...props}
    />
  );
}

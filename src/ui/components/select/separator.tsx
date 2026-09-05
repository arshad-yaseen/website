import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/ui/lib/cn";

export type SelectSeparatorProps = SelectPrimitive.Separator.Props;

export function Separator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-2 my-1 h-px bg-black/10 dark:bg-white/10", className)}
      {...props}
    />
  );
}

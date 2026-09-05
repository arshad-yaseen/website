import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronUpDownIcon } from "@/ui/components/select/icons";
import { cn } from "@/ui/lib/cn";

export type SelectIconProps = SelectPrimitive.Icon.Props;

// Carries the shared icon slot so the trigger's own icon rules size and color it.
export function Icon({ className, children, ...props }: SelectIconProps) {
  return (
    <SelectPrimitive.Icon
      data-slot="icon"
      className={cn("-me-0.5 flex items-center justify-center self-center", className)}
      {...props}
    >
      {children ?? <ChevronUpDownIcon className="size-full" />}
    </SelectPrimitive.Icon>
  );
}

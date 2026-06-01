import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";
import { ArrowRight01Icon, Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons";

const Icons = {
  ArrowRight01: ArrowRight01Icon,
  Moon02: Moon02Icon,
  Sun02: Sun02Icon,
};

type IconName = keyof typeof Icons;

type IconProps = Omit<HugeiconsIconProps, "icon"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <HugeiconsIcon {...props} icon={Icons[name]} data-slot="icon" strokeWidth={1.5} size={24} />
  );
}

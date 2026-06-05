import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { ArrowUpRightIcon, GithubIcon, Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons";

const Icons = {
  Moon: Moon02Icon,
  Sun: Sun02Icon,
  ArrowUpRight: ArrowUpRightIcon,
  Github: GithubIcon,
};

type IconName = keyof typeof Icons;

type IconProps = Omit<HugeiconsIconProps, "icon"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <HugeiconsIcon {...props} icon={Icons[name]} data-slot="icon" strokeWidth={1.75} size={24} />
  );
}

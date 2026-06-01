import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";
import { ArrowRight01Icon, Moon02Icon, Sun02Icon, GithubIcon } from "@hugeicons/core-free-icons";

const Icons = {
  ArrowRight: ArrowRight01Icon,
  Moon: Moon02Icon,
  Sun: Sun02Icon,
  Github: GithubIcon,
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

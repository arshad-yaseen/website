import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRightIcon,
  ComputerIcon,
  GithubIcon,
  Moon02Icon,
  PlusSignIcon,
  Sun02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

const ICONS_BY_NAME = {
  Moon: Moon02Icon,
  Sun: Sun02Icon,
  Monitor: ComputerIcon,
  ArrowUpRight: ArrowUpRightIcon,
  ChevronLeft: ArrowLeft01Icon,
  ChevronRight: ArrowRight01Icon,
  Github: GithubIcon,
  Plus: PlusSignIcon,
};

type IconName = keyof typeof ICONS_BY_NAME;

export type IconProps = Omit<HugeiconsIconProps, "icon"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      aria-hidden
      strokeWidth={1.75}
      size={24}
      {...props}
      icon={ICONS_BY_NAME[name]}
      data-slot="icon"
    />
  );
}

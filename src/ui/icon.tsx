import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
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

const Icons = {
  Moon: Moon02Icon,
  Sun: Sun02Icon,
  Monitor: ComputerIcon,
  ArrowUpRight: ArrowUpRightIcon,
  ChevronLeft: ArrowLeft01Icon,
  ChevronRight: ArrowRight01Icon,
  Github: GithubIcon,
  Plus: PlusSignIcon,
};

type IconName = keyof typeof Icons;

type IconProps = Omit<HugeiconsIconProps, "icon"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      aria-hidden
      strokeWidth={1.75}
      size={24}
      {...props}
      icon={Icons[name]}
      data-slot="icon"
    />
  );
}

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const Icon = {
  Moon: MoonIcon,
  Sun: SunIcon,
};

export type IconName = keyof typeof Icon;

"use client";

import { Icon } from "@/ui/icon";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="flex items-center justify-end p-6"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <Icon.Moon className="size-4 dark:hidden" />
      <Icon.Sun className="size-4 hidden dark:block" />
    </button>
  );
}

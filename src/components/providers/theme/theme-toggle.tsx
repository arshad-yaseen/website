"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <Icon.Moon className="size-4 dark:hidden" />
      <Icon.Sun className="size-4 hidden dark:block" />
    </Button>
  );
}

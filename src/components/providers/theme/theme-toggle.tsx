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
      <Icon name="Moon02" className="dark:hidden" />
      <Icon name="Sun02" className="hidden dark:block" />
    </Button>
  );
}

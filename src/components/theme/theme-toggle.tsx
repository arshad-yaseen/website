"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="plain"
      color="neutral"
      aria-label="Toggle theme"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <Icon name="Moon" className="dark:hidden" />
      <Icon name="Sun" className="hidden dark:block" />
    </Button>
  );
}

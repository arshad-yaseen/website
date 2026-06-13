import Link from "next/link";
import Logo from "./logo";
import ThemeToggle from "../theme/theme-toggle";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background px-(--layout-padding)">
      <div className="mx-auto flex h-(--header-height) w-full max-w-(--layout-width) items-center justify-between border-b-hairline border-current/10">
        <Link href="/" aria-label="Arshad Yaseen" className="shrink-0">
          <Logo className="h-6" />
        </Link>
        <div className="flex items-center">
          <Button
            variant="plain"
            aria-label="Toggle theme"
            render={<Link href="https://github.com/arshad-yaseen/ui" target="_blank" />}
          >
            <Icon name="Github" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import Logo from "./logo";
import ThemeToggle from "../theme/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-hairline border-current/10 bg-background">
      <div className="mx-auto flex h-(--header-height) w-full max-w-(--layout-width) items-center justify-between border-x-hairline border-current/10 px-(--layout-padding)">
        <Link href="/" aria-label="Arshad Yaseen" className="shrink-0">
          <Logo className="h-6" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

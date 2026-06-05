import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background">
      <div className="mx-auto flex h-(--header-height) w-full max-w-(--layout-width) items-center justify-between hairline-b border-current/10">
        <Link href="/" className="text-xl font-medium tracking-tight">
          arshad/ui
        </Link>
        <div className="flex items-center space-x-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

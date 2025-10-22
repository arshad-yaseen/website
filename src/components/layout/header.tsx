import ThemeToggle from "../providers/theme/theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center border-b border-b-neutral-300 sticky top-0 justify-between pr-6 pl-8 h-(--header-height)">
      <h1 className="font-serif text-2xl">yasui.</h1>
      <ThemeToggle />
    </header>
  );
}

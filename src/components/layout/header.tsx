import ThemeToggle from "../providers/theme/theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center border-b border-b-neutral-300/80 sticky top-0 justify-between pr-6 sm:pl-8 pl-6 h-(--header-height)">
      <h1 className="text-2xl font-serif">ay.</h1>
      <ThemeToggle />
    </header>
  );
}

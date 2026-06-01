import ThemeToggle from "../providers/theme/theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center sticky top-0 max-w-(--layout-width) mx-auto w-full justify-between h-(--header-height)">
      <h1 className="text-2xl">nasrin</h1>
      <div className="flex items-center space-x-1">
        <ThemeToggle />
      </div>
    </header>
  );
}

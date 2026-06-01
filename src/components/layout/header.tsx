import { Button } from "@/ui/button";
import ThemeToggle from "../providers/theme/theme-toggle";
import { Icon } from "@/ui/icon";

export default function Header() {
  return (
    <header className="flex items-center sticky top-0 justify-between pr-3 sm:pl-8 pl-6 h-(--header-height)">
      <h1 className="text-xl font-serif">arshad/ui</h1>
      <div className="flex items-center space-x-1">
        <Button>
          <Icon name="Github" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}

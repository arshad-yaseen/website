import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="accent">
        <Icon name="Plus" />
        New project
      </Button>
      <Button color="neutral">
        Open
        <Icon name="ArrowUpRight" />
      </Button>
      <Button variant="outline" aria-label="Toggle theme">
        <Icon name="Sun" />
      </Button>
    </div>
  );
}

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="neutral">
        <Icon name="Github" />
        Star on Github
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

import { Button } from "@fyi/ui/components/button";
import { Icon } from "@fyi/ui/components/icon";

export function Icons() {
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

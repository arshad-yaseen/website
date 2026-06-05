import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Continue</Button>
      <Button color="neutral">
        Github
        <Icon name="ArrowUpRight" />
      </Button>
      <Button variant="plain">Cancel</Button>
    </div>
  );
}

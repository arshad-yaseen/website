import { Button } from "@fyi/ui/components/button";

export function Elevated() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button isElevated color="neutral">
        Settings
      </Button>
      <Button isElevated color="accent">
        Settings
      </Button>
    </div>
  );
}

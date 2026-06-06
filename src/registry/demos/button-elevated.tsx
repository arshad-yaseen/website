import { Button } from "@/ui/button";

export default function ButtonElevatedDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button elevated color="neutral">
        Settings
      </Button>
      <Button elevated color="accent">
        Settings
      </Button>
    </div>
  );
}

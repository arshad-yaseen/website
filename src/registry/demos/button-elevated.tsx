import { Button } from "@/ui/button";

export default function ButtonElevatedDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button elevated color="accent">
        Continue
      </Button>
      <Button elevated color="neutral">
        Settings
      </Button>
    </div>
  );
}

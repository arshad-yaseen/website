import { Button } from "@/ui/button";

export default function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" size="sm">
        Small
      </Button>
      <Button variant="outline" size="md">
        Medium
      </Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
    </div>
  );
}

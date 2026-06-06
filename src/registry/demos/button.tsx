import { Button } from "@/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Solid</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="plain">Plain</Button>
    </div>
  );
}

import { Button } from "@fyi/ui/components/button";

export function Basic() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="plain">Plain</Button>
    </div>
  );
}

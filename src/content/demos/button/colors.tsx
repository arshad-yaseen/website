import { Button } from "@/ui/components/button";

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="dark/white">Dark/white</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="accent">Accent</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
    </div>
  );
}

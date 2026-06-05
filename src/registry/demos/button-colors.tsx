import { Button } from "@/ui/button";

export default function ButtonColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="dark/white">Dark/white</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="accent">Accent</Button>
    </div>
  );
}

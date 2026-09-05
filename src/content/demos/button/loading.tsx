import { Button } from "@/ui/components/button";
import { Diffusion } from "@/ui/components/dot-matrix/diffusion";

export function Loading() {
  return (
    <Button variant="outline" disabled>
      <Diffusion />
      Generating…
    </Button>
  );
}

import { Button } from "@fyi/ui/components/button";
import { Diffusion } from "@fyi/ui/components/dot-matrix/diffusion";

export function Loading() {
  return (
    <Button variant="outline" disabled>
      <Diffusion />
      Generating…
    </Button>
  );
}

import { Button } from "@/ui/button";
import { Diffusion } from "@/ui/dot-matrix";

export default function ButtonLoadingDemo() {
  return (
    <Button variant="outline" disabled>
      <Diffusion />
      Generating
    </Button>
  );
}

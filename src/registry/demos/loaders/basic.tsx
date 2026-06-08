import { Bloom, Helix, Orbit, Ripple } from "@/ui/dot-matrix";

export default function LoadersDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <Orbit />
      <Ripple />
      <Bloom />
      <Helix />
    </div>
  );
}

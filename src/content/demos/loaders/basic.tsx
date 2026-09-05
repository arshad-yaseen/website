import { Bloom } from "@/ui/components/dot-matrix/bloom";
import { Helix } from "@/ui/components/dot-matrix/helix";
import { Orbit } from "@/ui/components/dot-matrix/orbit";
import { Ripple } from "@/ui/components/dot-matrix/ripple";

export function Basic() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <Orbit />
      <Ripple />
      <Bloom />
      <Helix />
    </div>
  );
}

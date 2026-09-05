import { CacheWarm } from "@fyi/ui/components/dot-matrix/cache-warm";

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <CacheWarm size={16} />
      <CacheWarm />
      <CacheWarm size={40} />
      <CacheWarm size={64} />
    </div>
  );
}

import { CacheWarm } from "@/ui/dot-matrix";

export default function LoadersSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <CacheWarm size={16} />
      <CacheWarm />
      <CacheWarm size={40} />
      <CacheWarm size={64} />
    </div>
  );
}

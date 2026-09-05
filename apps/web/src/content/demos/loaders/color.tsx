import { Ripple } from "@fyi/ui/components/dot-matrix/ripple";

export function Color() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <Ripple color="var(--color-accent-500)" />
      <Ripple color="var(--color-success-500)" />
      <Ripple color="var(--color-danger-500)" />
    </div>
  );
}

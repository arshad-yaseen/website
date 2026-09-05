import { Input } from "@/ui/components/input";

const sizes = ["sm", "md", "lg"] as const;

export function Sizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Input key={size} size={size} placeholder={`Size ${size}`} />
      ))}
    </div>
  );
}

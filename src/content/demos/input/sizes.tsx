import { Input } from "@/ui/input";

const sizes = ["sm", "md", "lg"] as const;

export default function InputSizesDemo() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Input key={size} size={size} placeholder={`Size ${size}`} />
      ))}
    </div>
  );
}

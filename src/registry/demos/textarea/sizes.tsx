import { Textarea } from "@/ui/textarea";

const sizes = ["sm", "md", "lg"] as const;

export default function TextareaSizesDemo() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Textarea key={size} size={size} rows={2} placeholder={`Size ${size}`} />
      ))}
    </div>
  );
}

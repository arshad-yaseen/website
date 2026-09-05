import { Textarea } from "@fyi/ui/components/textarea";

const sizes = ["sm", "md", "lg"] as const;

export function Sizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Textarea
          key={size}
          aria-label={`Size ${size}`}
          size={size}
          rows={2}
          placeholder={`Size ${size}`}
        />
      ))}
    </div>
  );
}

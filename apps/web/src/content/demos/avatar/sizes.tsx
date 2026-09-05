import { Avatar } from "@fyi/ui/components/avatar";

const sizes = ["sm", "md", "lg"] as const;

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar.Root key={size} size={size}>
          <Avatar.Fallback>AY</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

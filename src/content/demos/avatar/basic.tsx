import { Avatar } from "@/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&q=80"
          alt="Lara Tucci"
        />
        <Avatar.Fallback delay={600}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>AY</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

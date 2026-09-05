import { Avatar } from "@/ui/components/avatar";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root>
        <Avatar.Image src="/avatars/lara.svg" alt="Lara Tucci" />
        <Avatar.Fallback delay={600}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>AY</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

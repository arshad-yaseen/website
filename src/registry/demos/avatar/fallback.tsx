import { Avatar } from "@/ui/avatar";

export default function AvatarFallbackDemo() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://invalid.example/avatar.jpg" alt="" />
      <Avatar.Fallback>AY</Avatar.Fallback>
    </Avatar.Root>
  );
}

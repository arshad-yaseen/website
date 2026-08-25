import { Avatar } from "@/ui/avatar";

export default function AvatarFallbackDemo() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://invalid.example/avatar.jpg" alt="Arshad Yaseen" />
      <Avatar.Fallback>AY</Avatar.Fallback>
    </Avatar.Root>
  );
}

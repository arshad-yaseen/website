import { Avatar } from "@/ui/components/avatar";

export function Fallback() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://invalid.example/avatar.jpg" alt="Arshad Yaseen" />
      <Avatar.Fallback>AY</Avatar.Fallback>
    </Avatar.Root>
  );
}

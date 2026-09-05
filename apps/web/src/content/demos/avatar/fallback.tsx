import { Avatar } from "@fyi/ui/components/avatar";

export function Fallback() {
  return (
    <Avatar.Root>
      <Avatar.Image src="data:," alt="Arshad Yaseen" />
      <Avatar.Fallback>AY</Avatar.Fallback>
    </Avatar.Root>
  );
}

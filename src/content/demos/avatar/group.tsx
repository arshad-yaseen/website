import { Avatar } from "@/ui/components/avatar";

const people = [
  { name: "Lara Tucci", initials: "LT", src: "/avatars/lara.svg" },
  { name: "Devon Lane", initials: "DL", src: "/avatars/devon.svg" },
  { name: "Noah Pierre", initials: "NP", src: "/avatars/noah.svg" },
];

export function Group() {
  return (
    <div className="flex -space-x-2">
      {people.map((person) => (
        <Avatar.Root key={person.name} className="ring-2 ring-background">
          <Avatar.Image src={person.src} alt="" />
          <Avatar.Fallback>{person.initials}</Avatar.Fallback>
        </Avatar.Root>
      ))}
      <Avatar.Root className="ring-2 ring-background">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

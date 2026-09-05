import { Avatar } from "@/ui/components/avatar";

const people = [
  { name: "Lara Tucci", initials: "LT", src: "https://i.pravatar.cc/80?img=5" },
  { name: "Devon Lane", initials: "DL", src: "https://i.pravatar.cc/80?img=12" },
  { name: "Noah Pierre", initials: "NP", src: "https://i.pravatar.cc/80?img=33" },
];

export function Group() {
  return (
    <div className="flex -space-x-2">
      {people.map((person) => (
        <Avatar.Root key={person.name} className="ring-2 ring-background">
          <Avatar.Image src={person.src} alt={person.name} />
          <Avatar.Fallback>{person.initials}</Avatar.Fallback>
        </Avatar.Root>
      ))}
      <Avatar.Root className="ring-2 ring-background">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

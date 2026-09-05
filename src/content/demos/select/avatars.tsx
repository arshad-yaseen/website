import { Avatar } from "@/ui/components/avatar";
import { Select } from "@/ui/components/select";

const people = [
  { value: "lara", name: "Lara Tucci", initials: "LT", src: "/avatars/lara.svg" },
  { value: "devon", name: "Devon Lane", initials: "DL", src: "/avatars/devon.svg" },
  { value: "noah", name: "Noah Pierre", initials: "NP", src: "/avatars/noah.svg" },
];

const items = people.map((person) => ({
  value: person.value,
  label: (
    <>
      <Avatar.Root data-slot="icon">
        <Avatar.Image src={person.src} alt="" />
        <Avatar.Fallback>{person.initials}</Avatar.Fallback>
      </Avatar.Root>
      {person.name}
    </>
  ),
}));

export function Avatars() {
  return (
    <Select.Root items={items} defaultValue="lara">
      <Select.Trigger aria-label="Assignee">
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {items.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

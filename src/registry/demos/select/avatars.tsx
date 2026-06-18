import { Avatar } from "@/ui/avatar";
import { Select } from "@/ui/select";

const people = [
  { value: "lara", name: "Lara Tucci", initials: "LT", src: "https://i.pravatar.cc/80?img=5" },
  { value: "devon", name: "Devon Lane", initials: "DL", src: "https://i.pravatar.cc/80?img=12" },
  { value: "noah", name: "Noah Pierre", initials: "NP", src: "https://i.pravatar.cc/80?img=33" },
];

const items = people.map((person) => ({
  value: person.value,
  label: (
    <>
      <Avatar.Root>
        <Avatar.Image src={person.src} alt={person.name} />
        <Avatar.Fallback>{person.initials}</Avatar.Fallback>
      </Avatar.Root>
      {person.name}
    </>
  ),
}));

export default function SelectAvatarsDemo() {
  return (
    <Select.Root items={items} defaultValue="lara">
      <Select.Trigger>
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

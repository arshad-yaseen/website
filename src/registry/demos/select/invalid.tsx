import { Select } from "@/ui/select";

const sizes = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

export default function SelectInvalidDemo() {
  return (
    <Select.Root items={sizes}>
      <Select.Trigger data-invalid>
        <Select.Value placeholder="Select a size" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {sizes.map((size) => (
            <Select.Item key={size.value} value={size.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{size.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

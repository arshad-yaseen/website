import { Select } from "@/ui/components/select";

const fonts = [
  { label: "Inter", value: "inter" },
  { label: "Berkeley Mono", value: "berkeley-mono" },
  { label: "Libre Baskerville", value: "libre-baskerville" },
];

export function Basic() {
  return (
    <Select.Root items={fonts}>
      <Select.Trigger aria-label="Font">
        <Select.Value placeholder="Select a font" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.ScrollUpArrow />
        <Select.List>
          {fonts.map((font) => (
            <Select.Item key={font.value} value={font.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{font.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
        <Select.ScrollDownArrow />
      </Select.Popup>
    </Select.Root>
  );
}

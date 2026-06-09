import { Select } from "@/ui/select";

const fonts = [
  { label: "Inter", value: "inter" },
  { label: "Berkeley Mono", value: "berkeley-mono" },
  { label: "Libre Baskerville", value: "libre-baskerville" },
];

export default function SelectDemo() {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <Select.Root items={fonts}>
        <Select.Label>Font</Select.Label>
        <Select.Trigger>
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
    </div>
  );
}

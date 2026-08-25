import { Select } from "@/ui/select";

const themes = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

const sizes = ["sm", "md", "lg"] as const;

export default function SelectSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {sizes.map((size) => (
        <Select.Root key={size} items={themes} defaultValue="system">
          <Select.Trigger size={size}>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Popup>
            <Select.List>
              {themes.map((theme) => (
                <Select.Item key={theme.value} value={theme.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{theme.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Root>
      ))}
    </div>
  );
}

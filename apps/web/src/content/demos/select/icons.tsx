import { Icon } from "@fyi/ui/components/icon";
import { Select } from "@fyi/ui/components/select";

const appearances = [
  {
    value: "system",
    label: (
      <>
        <Icon name="Monitor" />
        System
      </>
    ),
  },
  {
    value: "light",
    label: (
      <>
        <Icon name="Sun" />
        Light
      </>
    ),
  },
  {
    value: "dark",
    label: (
      <>
        <Icon name="Moon" />
        Dark
      </>
    ),
  },
];

export function Icons() {
  return (
    <Select.Root items={appearances} defaultValue="system">
      <Select.Trigger aria-label="Theme">
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {appearances.map((appearance) => (
            <Select.Item key={appearance.value} value={appearance.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{appearance.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

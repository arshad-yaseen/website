"use client";

import { Icon } from "@/ui/icon";
import { Select } from "@/ui/select";

const appearances = [
  { label: "System", value: "system", icon: "Monitor" },
  { label: "Light", value: "light", icon: "Sun" },
  { label: "Dark", value: "dark", icon: "Moon" },
] as const;

function renderValue(value: string) {
  const appearance = appearances.find((item) => item.value === value);
  if (!appearance) {
    return null;
  }
  return (
    <>
      <Icon name={appearance.icon} />
      {appearance.label}
    </>
  );
}

export default function SelectIconsDemo() {
  return (
    <Select.Root items={appearances} defaultValue="system">
      <Select.Trigger>
        <Select.Value>{renderValue}</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {appearances.map((appearance) => (
            <Select.Item key={appearance.value} value={appearance.value}>
              <Select.ItemIndicator />
              <Select.ItemText>
                <Icon name={appearance.icon} />
                {appearance.label}
              </Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

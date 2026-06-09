"use client";

import { Select } from "@/ui/select";

const languages = [
  { label: "TypeScript", value: "ts" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Python", value: "py" },
  { label: "Swift", value: "swift" },
];

function renderValue(value: string[]) {
  if (value.length === 0) {
    return "Select languages";
  }
  if (value.length === 1) {
    return languages.find((language) => language.value === value[0])?.label;
  }
  return `${value.length} selected`;
}

export default function SelectMultipleDemo() {
  return (
    <Select.Root items={languages} multiple defaultValue={["ts", "rust"]}>
      <Select.Trigger>
        <Select.Value>{renderValue}</Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup alignItemWithTrigger={false}>
        <Select.List>
          {languages.map((language) => (
            <Select.Item key={language.value} value={language.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{language.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

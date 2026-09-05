import { Fragment } from "react";
import { Select } from "@/ui/components/select";

const groups = [
  {
    value: "Fruits",
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
  },
  {
    value: "Vegetables",
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Spinach", value: "spinach" },
    ],
  },
];

export function Grouped() {
  return (
    <Select.Root items={groups}>
      <Select.Trigger>
        <Select.Value placeholder="Select produce" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {groups.map((group, index) => (
            <Fragment key={group.value}>
              <Select.Group>
                <Select.GroupLabel>{group.value}</Select.GroupLabel>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    <Select.ItemIndicator />
                    <Select.ItemText>{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
              {index < groups.length - 1 && <Select.Separator />}
            </Fragment>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

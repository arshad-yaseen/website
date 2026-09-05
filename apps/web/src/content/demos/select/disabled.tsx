import { Select } from "@fyi/ui/components/select";

const plans = [
  { label: "Hobby", value: "hobby" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

export function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* The whole control is disabled. */}
      <Select.Root items={plans} defaultValue="pro" disabled>
        <Select.Trigger aria-label="Size">
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Popup>
          <Select.List>
            {plans.map((plan) => (
              <Select.Item key={plan.value} value={plan.value}>
                <Select.ItemIndicator />
                <Select.ItemText>{plan.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.List>
        </Select.Popup>
      </Select.Root>

      {/* A single option is disabled. */}
      <Select.Root items={plans} defaultValue="hobby">
        <Select.Trigger aria-label="Size">
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Popup>
          <Select.List>
            {plans.map((plan) => (
              <Select.Item
                key={plan.value}
                value={plan.value}
                disabled={plan.value === "enterprise"}
              >
                <Select.ItemIndicator />
                <Select.ItemText>{plan.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.List>
        </Select.Popup>
      </Select.Root>
    </div>
  );
}

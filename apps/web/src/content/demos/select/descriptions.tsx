import { Select } from "@fyi/ui/components/select";

const plans = [
  { label: "Hobby", value: "hobby", description: "For personal projects and experiments" },
  { label: "Pro", value: "pro", description: "For small teams shipping to production" },
  { label: "Enterprise", value: "enterprise", description: "For organizations with custom needs" },
];

export function Descriptions() {
  return (
    <Select.Root items={plans}>
      <Select.Trigger aria-label="Plan">
        <Select.Value placeholder="Select a plan" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Popup alignItemWithTrigger={false}>
        <Select.List>
          {plans.map((plan) => (
            <Select.Item key={plan.value} value={plan.value}>
              <Select.ItemIndicator />
              <Select.ItemText>{plan.label}</Select.ItemText>
              <Select.ItemDescription>{plan.description}</Select.ItemDescription>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select.Root>
  );
}

import { Input } from "@fyi/ui/components/input";

export function Disabled() {
  return <Input aria-label="Name" disabled defaultValue="Can’t edit this" className="w-64" />;
}

import { Textarea } from "@fyi/ui/components/textarea";

export function Disabled() {
  return <Textarea aria-label="Message" disabled defaultValue="Can’t edit this" className="w-64" />;
}

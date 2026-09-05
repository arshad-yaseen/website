import { Textarea } from "@/ui/components/textarea";

export function Disabled() {
  return <Textarea disabled defaultValue="Can’t edit this" className="w-64" />;
}

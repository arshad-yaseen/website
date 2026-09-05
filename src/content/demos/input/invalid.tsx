import { Input } from "@/ui/components/input";

export function Invalid() {
  return <Input aria-label="Email" data-invalid defaultValue="not-an-email" className="w-64" />;
}

import { Input } from "@/ui/components/input";

export function Invalid() {
  return <Input data-invalid defaultValue="not-an-email" className="w-64" />;
}

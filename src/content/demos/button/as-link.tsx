import Link from "next/link";
import { Button } from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";

export function AsLink() {
  return (
    <Button color="neutral" render={<Link href="/ui" />}>
      Introduction
      <Icon name="ArrowUpRight" />
    </Button>
  );
}

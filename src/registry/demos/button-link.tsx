import Link from "next/link";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export default function ButtonLinkDemo() {
  return (
    <Button color="neutral" render={<Link href="/introduction" />}>
      Introduction
      <Icon name="ArrowUpRight" />
    </Button>
  );
}

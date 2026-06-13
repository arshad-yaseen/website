import { redirect } from "next/navigation";
import { pages } from "@/registry";

export default function UIPage() {
  redirect(`/ui/${pages[0].slug}`);
}

import { redirect } from "next/navigation";
import { guides } from "@/content";

export default function UIPage() {
  redirect(`/ui/${guides[0].slug}`);
}

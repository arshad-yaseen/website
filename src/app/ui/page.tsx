import type { Metadata } from "next";
import { Article } from "@/components/docs/article";
import { createMetadata } from "@/lib/metadata";
import { guides } from "@/content";

const introduction = guides[0];

export const metadata: Metadata = createMetadata({
  title: introduction.title,
  description: introduction.description,
  path: "/ui",
});

export default function UIPage() {
  return <Article doc={introduction} />;
}

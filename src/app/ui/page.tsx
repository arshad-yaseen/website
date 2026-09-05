import type { Metadata } from "next";
import { introduction } from "@/content/guides/introduction";
import { Article } from "@/features/docs/components/article";
import { createMetadata } from "@/shared/lib/create-metadata";

export const metadata: Metadata = createMetadata({
  title: introduction.title,
  description: introduction.description,
  path: "/ui",
});

export default function UIPage() {
  return <Article doc={introduction} />;
}

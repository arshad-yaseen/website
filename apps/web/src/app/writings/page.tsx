import type { Metadata } from "next";
import { WritingsList } from "@/features/writings/components/writings-list";
import { createMetadata } from "@/shared/lib/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Writings",
  path: "/writings",
});

export default function WritingsPage() {
  return <WritingsList />;
}

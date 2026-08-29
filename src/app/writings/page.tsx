import type { Metadata } from "next";

import { WritingsList } from "@/components/writings/writings-list";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Writings",
  path: "/writings",
});

export default function WritingsPage() {
  return <WritingsList />;
}

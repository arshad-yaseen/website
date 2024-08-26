import type { Metadata } from "next";
import { baseUrl } from "../sitemap";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(`${baseUrl}/monacopilot`),
  title: "Monacopilot",
  description: "AI-autocompletion plugin for monaco editor",
};

export default function MonacopilotLayout({ children }: PropsWithChildren) {
  return children;
}

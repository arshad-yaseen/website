import type { ComponentType } from "react";
import type { Doc, Note, Section } from "./types";

import button from "./components/button";
import buttonDemo from "./demos/button";
import buttonColorsDemo from "./demos/button-colors";
import buttonElevatedDemo from "./demos/button-elevated";
import buttonLinkDemo from "./demos/button-link";
import buttonSizesDemo from "./demos/button-sizes";
import introduction from "./pages/introduction";

export const demos = {
  button: buttonDemo,
  "button-colors": buttonColorsDemo,
  "button-elevated": buttonElevatedDemo,
  "button-link": buttonLinkDemo,
  "button-sizes": buttonSizesDemo,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;

export const pages: Doc[] = [introduction];

export const sections: Section[] = [
  { slug: "components", title: "Components", docs: [button] },
  { slug: "experiments", title: "Experiments", docs: [] },
];

export const notes: Note[] = [];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getDoc(section: string, slug: string) {
  return getSection(section)?.docs.find((doc) => doc.slug === slug);
}

import type { Doc, Note, Section } from "./types";

import button from "./components/button";
import helloWorld from "./notes/hello-world";
import introduction from "./pages/introduction";

export const pages: Doc[] = [introduction];

export const sections: Section[] = [
  { slug: "components", title: "Components", docs: [button] },
  { slug: "experiments", title: "Experiments", docs: [] },
];

export const notes: Note[] = [helloWorld];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getDoc(section: string, slug: string) {
  return getSection(section)?.docs.find((doc) => doc.slug === slug);
}

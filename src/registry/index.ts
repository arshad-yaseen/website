import type { ComponentType } from "react";
import type { Doc, Note, Section } from "./types";

import button from "./components/button";
import loaders from "./components/loaders";
import buttonDemo from "./demos/button/basic";
import buttonColorsDemo from "./demos/button/colors";
import buttonElevatedDemo from "./demos/button/elevated";
import buttonIconsDemo from "./demos/button/icons";
import buttonLinkDemo from "./demos/button/link";
import buttonLoadingDemo from "./demos/button/loading";
import buttonSizesDemo from "./demos/button/sizes";
import loadersDemo from "./demos/loaders/basic";
import loadersColorDemo from "./demos/loaders/color";
import loadersGalleryDemo from "./demos/loaders/gallery";
import loadersSizesDemo from "./demos/loaders/sizes";
import ringsOverBorders from "./notes/rings-over-borders";
import introduction from "./pages/introduction";

export const demos = {
  "button/basic": buttonDemo,
  "button/colors": buttonColorsDemo,
  "button/elevated": buttonElevatedDemo,
  "button/icons": buttonIconsDemo,
  "button/link": buttonLinkDemo,
  "button/loading": buttonLoadingDemo,
  "button/sizes": buttonSizesDemo,
  "loaders/basic": loadersDemo,
  "loaders/color": loadersColorDemo,
  "loaders/gallery": loadersGalleryDemo,
  "loaders/sizes": loadersSizesDemo,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;

export const pages: Doc[] = [introduction];

export const sections: Section[] = [
  { slug: "components", title: "Components", docs: [button, loaders] },
  { slug: "experiments", title: "Experiments", docs: [] },
];

export const notes: Note[] = [ringsOverBorders];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getDoc(section: string, slug: string) {
  return getSection(section)?.docs.find((doc) => doc.slug === slug);
}

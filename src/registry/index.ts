import type { ComponentType } from "react";
import type { Doc, Note, Section } from "./types";

import avatar from "./components/avatar";
import button from "./components/button";
import input from "./components/input";
import loaders from "./components/loaders";
import select from "./components/select";
import textarea from "./components/textarea";
import avatarDemo from "./demos/avatar/basic";
import avatarFallbackDemo from "./demos/avatar/fallback";
import avatarGroupDemo from "./demos/avatar/group";
import avatarSizesDemo from "./demos/avatar/sizes";
import buttonDemo from "./demos/button/basic";
import buttonColorsDemo from "./demos/button/colors";
import buttonElevatedDemo from "./demos/button/elevated";
import buttonIconsDemo from "./demos/button/icons";
import buttonLinkDemo from "./demos/button/link";
import buttonLoadingDemo from "./demos/button/loading";
import buttonSizesDemo from "./demos/button/sizes";
import inputDemo from "./demos/input/basic";
import inputDisabledDemo from "./demos/input/disabled";
import inputInvalidDemo from "./demos/input/invalid";
import inputSizesDemo from "./demos/input/sizes";
import loadersDemo from "./demos/loaders/basic";
import loadersColorDemo from "./demos/loaders/color";
import loadersGalleryDemo from "./demos/loaders/gallery";
import loadersSizesDemo from "./demos/loaders/sizes";
import selectDemo from "./demos/select/basic";
import selectAvatarsDemo from "./demos/select/avatars";
import selectDisabledDemo from "./demos/select/disabled";
import selectGroupedDemo from "./demos/select/grouped";
import selectIconsDemo from "./demos/select/icons";
import selectInvalidDemo from "./demos/select/invalid";
import selectMultipleDemo from "./demos/select/multiple";
import selectSizesDemo from "./demos/select/sizes";
import textareaDemo from "./demos/textarea/basic";
import textareaDisabledDemo from "./demos/textarea/disabled";
import textareaInvalidDemo from "./demos/textarea/invalid";
import textareaSizesDemo from "./demos/textarea/sizes";
import ringsOverBorders from "./notes/rings-over-borders";
import introduction from "./pages/introduction";

export const demos = {
  "avatar/basic": avatarDemo,
  "avatar/fallback": avatarFallbackDemo,
  "avatar/group": avatarGroupDemo,
  "avatar/sizes": avatarSizesDemo,
  "button/basic": buttonDemo,
  "button/colors": buttonColorsDemo,
  "button/elevated": buttonElevatedDemo,
  "button/icons": buttonIconsDemo,
  "button/link": buttonLinkDemo,
  "button/loading": buttonLoadingDemo,
  "button/sizes": buttonSizesDemo,
  "input/basic": inputDemo,
  "input/disabled": inputDisabledDemo,
  "input/invalid": inputInvalidDemo,
  "input/sizes": inputSizesDemo,
  "loaders/basic": loadersDemo,
  "loaders/color": loadersColorDemo,
  "loaders/gallery": loadersGalleryDemo,
  "loaders/sizes": loadersSizesDemo,
  "select/basic": selectDemo,
  "select/avatars": selectAvatarsDemo,
  "select/disabled": selectDisabledDemo,
  "select/grouped": selectGroupedDemo,
  "select/icons": selectIconsDemo,
  "select/invalid": selectInvalidDemo,
  "select/multiple": selectMultipleDemo,
  "select/sizes": selectSizesDemo,
  "textarea/basic": textareaDemo,
  "textarea/disabled": textareaDisabledDemo,
  "textarea/invalid": textareaInvalidDemo,
  "textarea/sizes": textareaSizesDemo,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;

const REPO = "https://github.com/arshad-yaseen/ui";

const withSource = <T extends Doc>(doc: T): T =>
  doc.source
    ? { ...doc, source: `${REPO}/${doc.source.includes(".") ? "blob" : "tree"}/main/${doc.source}` }
    : doc;

export const pages: Doc[] = [introduction].map(withSource);

export const sections: Section[] = [
  {
    slug: "components",
    title: "Components",
    docs: [button, input, textarea, select, avatar, loaders].map(withSource),
  },
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

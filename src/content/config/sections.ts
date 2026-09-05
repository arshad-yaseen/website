import type { Section } from "@/content/types/section";

/** The order docs appear in the sidebar, which is a decision rather than a listing. */
export const sections: Section[] = [
  {
    slug: "components",
    title: "Components",
    docs: ["button", "input", "textarea", "select", "avatar", "loaders"],
  },
];

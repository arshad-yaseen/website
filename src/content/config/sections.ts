import { avatar } from "@/content/docs/avatar";
import { button } from "@/content/docs/button";
import { input } from "@/content/docs/input";
import { loaders } from "@/content/docs/loaders";
import { select } from "@/content/docs/select";
import { textarea } from "@/content/docs/textarea";
import type { Section } from "@/content/types/section";

/** The order docs appear in the sidebar, which is a decision rather than a listing. */
export const sections: Section[] = [
  {
    slug: "components",
    title: "Components",
    docs: [button, input, textarea, select, avatar, loaders],
  },
];

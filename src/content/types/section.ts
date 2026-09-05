import type { Doc } from "@/content/types/doc";

export type Section = {
  slug: string;
  title: string;
  docs: Doc[];
};

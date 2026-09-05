import type { Doc } from "@/content/types/doc";

export type Writing = Doc & {
  /** Publish date, ISO 8601 (YYYY-MM-DD). */
  date: string;
};

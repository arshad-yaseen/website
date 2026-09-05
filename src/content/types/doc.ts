import type { ReactNode } from "react";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  body: ReactNode;
  /** Repo-relative path to the documented source, either a file or a directory. */
  source?: string;
};

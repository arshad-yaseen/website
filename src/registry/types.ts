import type { ReactNode } from "react";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  body: ReactNode;
};

export type Note = Doc & {
  date: string;
};

export type Section = {
  slug: string;
  title: string;
  docs: Doc[];
};

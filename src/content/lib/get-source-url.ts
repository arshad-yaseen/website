import { site } from "@/shared/config/site";

/** Links a doc's repo-relative source. A dot in the last segment means a file, not a directory. */
export function getSourceUrl(source: string): string {
  const view = source.split("/").at(-1)?.includes(".") ? "blob" : "tree";
  return `${site.repository}/${view}/main/${source}`;
}

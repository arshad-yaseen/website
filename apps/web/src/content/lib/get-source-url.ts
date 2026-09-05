import { site } from "@/shared/config/site";

/** A dot in the last segment means a file, not a directory. */
export function getSourceUrl(source: string): string {
  const view = source.split("/").at(-1)?.includes(".") ? "blob" : "tree";
  return `${site.repository}/${view}/main/${source}`;
}

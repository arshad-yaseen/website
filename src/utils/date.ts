/** Formats an ISO date (YYYY-MM-DD) as e.g. "June 10, 2026", free of timezone drift. */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

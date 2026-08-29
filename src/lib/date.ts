type DateOptions = {
  month?: "long" | "short";
};

/** Formats an ISO date (YYYY-MM-DD) as e.g. "June 10, 2026", free of timezone drift. */
export function formatDate(iso: string, { month = "long" }: DateOptions = {}) {
  const [year, monthNumber, day] = iso.split("-").map(Number);
  return new Date(year, monthNumber - 1, day).toLocaleDateString("en-US", {
    month,
    day: "numeric",
    year: "numeric",
  });
}

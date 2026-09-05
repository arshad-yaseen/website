type FormatDateOptions = {
  month?: "long" | "short";
};

/** Formats an ISO date (YYYY-MM-DD) as e.g. "June 10, 2026", free of timezone drift. */
export function formatDate(iso: string, { month = "long" }: FormatDateOptions = {}): string {
  // A date-time without a zone parses as local midnight, so the day never shifts.
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month,
    day: "numeric",
    year: "numeric",
  });
}

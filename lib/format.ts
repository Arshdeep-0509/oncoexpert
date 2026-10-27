/** Indian rupee formatting with lakh/crore grouping, e.g. 150000 → "₹1,50,000". */
export function formatRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Up to two initials for an avatar, e.g. "shwetha jayaraj" → "SJ". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** "YYYY-MM-DDTHH:mm" in the visitor's local time, for datetime-local min. Browser only. */
export const localNow = () => {
  const d = new Date();
  d.setSeconds(0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};

/**
 * Joins the last two words with a no-break space, so a heading never ends on one orphaned word.
 * Display only: the words are unchanged.
 */
export const keepLastWords = (text: string) => text.replace(/ (\S+)$/, "\u00a0$1");

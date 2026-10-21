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

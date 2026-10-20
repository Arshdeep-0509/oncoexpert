import type { PriceItem } from "@/content/types";

/** Sum of a list of priced items. Totals are always computed, never typed into content. */
export function totalAmount(items: readonly Pick<PriceItem, "amount">[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

/** Indian rupee formatting with lakh/crore grouping, e.g. 150000 → "₹1,50,000". */
export function formatRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Sum of a numeric field across a list, e.g. total cases across stages. Never type totals in. */
export function sumBy<T>(items: readonly T[], pick: (item: T) => number): number {
  return items.reduce((sum, item) => sum + pick(item), 0);
}

import type * as React from "react";
import type { ChartRow } from "@/content/types";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import "@/components/shared/survival-chart.css";

type SurvivalChartProps = {
  rows: readonly ChartRow[];
  /** Appended to each value, e.g. "%". */
  unit: string;
  /** The data table's caption and the column headers (screen readers). */
  caption: string;
  labels: { row: string; value: string };
  /** Shown under the chart when given (pages keep theirs behind an approval flag). */
  footnote?: string;
  /** Bars are drawn against this maximum. Default 100. */
  max?: number;
  className?: string;
};

/**
 * Horizontal bars, one per row (shared; first used on the lung page). Once in view each bar
 * scales out along X (transform, never width), one after another, while its number counts up.
 * Rows are focusable; hovering or focusing one dims the others. Each row carries its figure as
 * its label; a visually hidden <table> carries the same data for screen readers and assistive
 * tools. Server-rendered; InView and the counters are the only client code.
 */
export function SurvivalChart({ rows, unit, caption, labels, footnote, max = 100, className }: SurvivalChartProps) {
  return (
    <div className={className}>
      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{labels.row}</th>
            <th scope="col">{labels.value}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>
                {row.value}
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <InView threshold={0.35} className="svc-chart">
        <ul className="grid gap-4 md:gap-5">
          {rows.map((row, i) => (
            <li key={row.label}>
              <div
                tabIndex={0}
                role="img"
                aria-label={`${row.label}: ${row.value}${unit}`}
                className={cn(
                  "svc-row grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 rounded-lg px-3 py-3 outline-none focus-visible:ring-2 focus-visible:ring-accent md:grid-cols-[7rem_1fr_auto] md:gap-6",
                )}
                style={{ "--i": i, "--v": row.value / max } as React.CSSProperties}
              >
                <span aria-hidden="true" className="font-display text-lg font-semibold text-ink md:text-xl">
                  {row.label}
                </span>
                <span aria-hidden="true" className="relative h-4 overflow-hidden rounded-full bg-accent-soft md:h-5">
                  <span className="svc-bar absolute inset-0 rounded-full bg-(image:--grad-accent)" />
                </span>
                <span
                  aria-hidden="true"
                  className="min-w-[4ch] text-right font-display text-2xl leading-none font-semibold text-accent tabular-nums md:text-[2rem]"
                >
                  <Counter value={row.value} suffix={unit} delay={0.2 + i * 0.18} duration={1.2} reserveWidth />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </InView>
      {footnote ? <p className="mt-6 measure text-sm leading-relaxed text-muted">{footnote}</p> : null}
    </div>
  );
}

"use client";

import * as React from "react";
import type { SymptomItem } from "@/content/types";
import type { AppointmentService } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { CheckCard } from "@/components/shared/symptom-grid/CheckCard";
import { HoverCard } from "@/components/shared/symptom-grid/HoverCard";
import "@/components/shared/symptom-grid/symptom-grid.css";

type CheckProps = {
  mode: "check";
  /** The line shown while nothing is ticked (e.g. the page's live sentence). */
  empty: string;
  /** Once something is ticked: a line and a button; its note is `notePrefix` + the ticked list. */
  result: { some: string; cta: { label: string; service: AppointmentService; cta?: string }; notePrefix: string };
  labels: { group: string; result: string };
};
type DiscloseProps = { mode: "disclose"; labels: { group: string } };

type SymptomGridProps = (CheckProps | DiscloseProps) & {
  items: readonly SymptomItem[];
  /** Analytics prefix of the page, e.g. "ovarian" (symptom_check sends the count only). */
  page: string;
  className?: string;
};

/**
 * A grid of symptom cards (shared; first used on the ovarian page). A 2 × 2 grid on phones (never a
 * swipe row), four across from lg.
 * - "check": each card is a checkbox (CheckCard; Space or click toggles; teal fill with a small
 *   bounce; with `image`, the photo fills the card). A result panel under the grid shows `empty`
 *   while nothing is ticked; once one or more are, a NEW line and a booking button whose note lists
 *   them. Nothing is stored; analytics gets the count only (symptom_check).
 * - "disclose": hover cards (HoverCard): hovering or focusing a card reveals its `body` over the
 *   photo; on touch screens the body sits under the title.
 */
export function SymptomGrid(props: SymptomGridProps) {
  const { items, page, className } = props;
  const [ticked, setTicked] = React.useState<ReadonlySet<string>>(new Set());

  const toggle = (key: string) => {
    const next = new Set(ticked);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setTicked(next);
    track({ event: "symptom_check", page, count: next.size });
  };

  const grid = "grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4";

  if (props.mode === "disclose") {
    return (
      <ul aria-label={props.labels.group} className={cn(grid, className)}>
        {items.map((item) => (
          <li key={item.key}>
            <HoverCard item={item} />
          </li>
        ))}
      </ul>
    );
  }

  const chosen = items.filter((i) => ticked.has(i.key));
  return (
    <div className={className}>
      <div role="group" aria-label={props.labels.group} className={grid}>
        {items.map((item) => (
          <CheckCard key={item.key} item={item} checked={ticked.has(item.key)} onToggle={() => toggle(item.key)} />
        ))}
      </div>
      <div
        aria-live="polite"
        aria-label={props.labels.result}
        role="region"
        className="mt-6 flex min-h-[6.5rem] flex-col items-start gap-4 rounded-xl bg-surface p-5 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-6"
      >
        {chosen.length === 0 ? (
          <p className="measure text-base leading-relaxed text-text md:text-lg">{props.empty}</p>
        ) : (
          <>
            <p className="measure text-base leading-relaxed font-semibold text-ink md:text-lg">{props.result.some}</p>
            <AppointmentButton
              {...props.result.cta}
              note={`${props.result.notePrefix}${chosen.map((c) => c.title).join(", ")}`}
              arrow
              fullWidthOnMobile
              className="shrink-0"
            />
          </>
        )}
      </div>
    </div>
  );
}

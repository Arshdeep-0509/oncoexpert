"use client";

import * as React from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Filter = "all" | "treatments" | "why";
const FILTERS: readonly Filter[] = ["all", "treatments", "why"];

type ModalityFilterProps = {
  labels: Record<Filter, string>;
  groupLabel: string;
  /** The cards (server-rendered); each carries data-group. */
  children: React.ReactNode;
};

/**
 * The modality filter: a three-way radiogroup (arrow keys, roving tab stop). It sets data-filter
 * on its box; modalities.css hides the other group (its cards on tablets and desktop, its swipe
 * row on phones). The cards are re-mounted on each choice (keyed by it), so they fade back in and
 * their icons draw again. A choice sends thyroid_modality_filter.
 */
export function ModalityFilter({ labels, groupLabel, children }: ModalityFilterProps) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const radios = React.useRef<(HTMLButtonElement | null)[]>([]);

  const choose = (next: Filter, focus = false) => {
    if (focus) radios.current[FILTERS.indexOf(next)]?.focus();
    if (next === filter) return;
    setFilter(next);
    track({ event: "thyroid_modality_filter", label: next });
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = FILTERS.indexOf(filter);
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    choose(FILTERS[(i + step + FILTERS.length) % FILTERS.length], true);
  };

  return (
    <div data-filter={filter} className="tym-filter">
      <div
        role="radiogroup"
        aria-label={groupLabel}
        onKeyDown={onKeyDown}
        className="inline-flex flex-wrap gap-2 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line"
      >
        {FILTERS.map((f, i) => (
          <button
            key={f}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={filter === f}
            tabIndex={filter === f ? 0 : -1}
            onClick={() => choose(f)}
            className={cn(
              "min-h-12 rounded-pill px-5 text-[15px] font-semibold transition-colors",
              filter === f ? "bg-accent text-white" : "text-ink hover:bg-accent-soft",
            )}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      <div key={filter} className="tym-swap mt-8">
        {children}
      </div>
    </div>
  );
}

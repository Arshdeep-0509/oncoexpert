"use client";

import * as React from "react";
import type { TechniqueSideContent } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CompareCard } from "@/components/shared/technique-compare/CompareCard";

type CompareSwitchProps = {
  sides: readonly [TechniqueSideContent, TechniqueSideContent];
  label: string;
  /** Analytics prefix of the page, e.g. "lung" (technique_switch). */
  page: string;
};

/**
 * Below lg: a two-way tab switch (ARIA tabs: arrow keys, Home / End, roving tab stop) with a pill
 * that slides under the chosen tab, and one panel. The panel is keyed by the choice, so it
 * re-enters with a staggered entry (technique-compare.css). A choice sends technique_switch.
 */
export function CompareSwitch({ sides, label, page }: CompareSwitchProps) {
  const [selected, setSelected] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();

  const choose = (i: number, focus = false) => {
    if (focus) tabs.current[i]?.focus();
    if (i === selected) return;
    setSelected(i);
    track({ event: "technique_switch", label: sides[i].label, page });
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowLeft"
        ? 1 - selected
        : e.key === "Home"
          ? 0
          : e.key === "End"
            ? 1
            : null;
    if (next === null) return;
    e.preventDefault();
    choose(next, true);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        data-selected={selected}
        className="tcx-tabs relative mx-auto grid max-w-md grid-cols-2 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line"
      >
        <span
          aria-hidden="true"
          className="tcx-pill absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-pill bg-(image:--grad-accent)"
        />
        {sides.map((side, i) => (
          <button
            key={side.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={selected === i}
            aria-controls={`${id}-panel`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => choose(i)}
            className={cn(
              "relative min-h-12 rounded-pill px-3 text-[15px] font-semibold transition-colors duration-300",
              selected === i ? "text-white" : "text-ink",
            )}
          >
            {side.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} className="mt-6">
        <CompareCard key={sides[selected].key} side={sides[selected]} enter />
      </div>
    </div>
  );
}

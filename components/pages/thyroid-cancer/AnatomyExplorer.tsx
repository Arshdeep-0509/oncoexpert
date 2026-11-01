"use client";

import * as React from "react";
import type { AnatomyKey } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";
import { NeckDiagram } from "@/components/pages/thyroid-cancer/NeckDiagram";

type AnatomyExplorerProps = {
  title: React.ReactNode;
  body: string;
  hotspots: readonly { key: AnatomyKey; label: string; phrase: string; note: string }[];
  labels: { hotspots: string; diagram: string };
};

/**
 * The neck anatomy explorer (understanding.css, tyu-). Three toggle buttons (aria-pressed; arrow
 * keys move and choose) pick a structure: the diagram highlights it and dims the rest, the live
 * paragraph highlights its own phrase for it, and a NEW one-liner appears; a polite live region
 * says what was chosen. Desktop: diagram left, text and buttons right. Phones: text, diagram, then
 * the buttons as large pills.
 */
export function AnatomyExplorer({ title, body, hotspots, labels }: AnatomyExplorerProps) {
  const [index, setIndex] = React.useState(0);
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const spot = hotspots[index];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + hotspots.length) % hotspots.length;
    setIndex(next);
    buttons.current[next]?.focus();
  };

  // The live paragraph with the chosen phrase marked (its own words: nothing is added or changed).
  const at = body.indexOf(spot.phrase);
  const paragraph =
    at < 0 ? (
      body
    ) : (
      <>
        {body.slice(0, at)}
        <mark className="tyu-mark">{spot.phrase}</mark>
        {body.slice(at + spot.phrase.length)}
      </>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-6">
      <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
        {title}
        <p className="mt-5 measure text-base leading-relaxed text-text md:text-lg">{paragraph}</p>
        <p
          key={spot.key}
          className="tyu-note mt-5 measure rounded-lg bg-accent-soft px-5 py-4 text-base leading-relaxed text-ink"
        >
          {spot.note}
        </p>
      </div>
      <div className="mx-auto w-full max-w-[320px] lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:max-w-[400px]">
        <NeckDiagram selected={spot.key} label={labels.diagram} />
      </div>
      <div
        role="group"
        aria-label={labels.hotspots}
        onKeyDown={onKeyDown}
        className="grid gap-3 sm:grid-cols-3 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start"
      >
        {hotspots.map((h, i) => (
          <button
            key={h.key}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "min-h-14 rounded-pill px-6 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none",
              i === index
                ? "bg-accent text-white shadow-soft-sm"
                : "bg-surface text-ink ring-1 ring-line hover:bg-accent-soft",
            )}
          >
            {h.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {spot.label}: {spot.note}
      </p>
    </div>
  );
}

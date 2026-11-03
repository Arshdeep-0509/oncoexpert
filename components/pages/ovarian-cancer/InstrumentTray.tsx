"use client";

import * as React from "react";
import { X } from "lucide-react";
import type { TestKey } from "@/content/pages/ovarian-cancer";
import { track } from "@/lib/analytics";
import { cn, focusRing } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { ScrollFillLine } from "@/components/ui/ScrollFillLine";
import { TrayArt } from "@/components/pages/ovarian-cancer/TrayArt";

type InstrumentTrayProps = {
  tests: readonly { key: TestKey; title: string; kind: string; tells: string }[];
  /** The live sentence, shown in every drawer. */
  body: string;
  tellsLabel: string;
  labels: { tray: string; close: string };
};

/**
 * The instrument tray (diagnostics.css, ovd-). Once in view a line draws across the four tiles and
 * lights a node at each; each tile's illustration plays as its node lights (and replays on hover).
 * Each tile is a button (aria-expanded) that opens its drawer: the live sentence and a NEW "What it
 * tells us" line. Arrow keys move between tiles; Escape closes. Opening sends ovarian_test_open.
 * Desktop one row; tablets 2 × 2; phones a vertical list with ScrollFillLine.
 */
export function InstrumentTray({ tests, body, tellsLabel, labels }: InstrumentTrayProps) {
  const [open, setOpen] = React.useState<TestKey | null>(null);
  const tiles = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();

  const toggle = (key: TestKey, title: string) => {
    if (open !== key) track({ event: "ovarian_test_open", label: title });
    setOpen(open === key ? null : key);
  };
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Escape" && open) {
      setOpen(null);
      return;
    }
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    tiles.current[(i + step + tests.length) % tests.length]?.focus();
  };

  return (
    <InView threshold={0.3} className="ovd-tray relative">
      {/* The line through the nodes (desktop) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        className="ovd-rail pointer-events-none absolute top-6 left-[12.5%] z-10 h-5 w-[75%]"
      >
        <path
          d="M0 10H1000"
          pathLength={1}
          fill="none"
          style={{ stroke: "var(--accent)" }}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          className="ovd-railDraw"
        />
      </svg>
      <ScrollFillLine className="ovd-vline absolute top-8 bottom-8 left-[23px] md:hidden" />

      <ul aria-label={labels.tray} className="ovd-list relative grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {tests.map((t, i) => {
          const expanded = open === t.key;
          return (
            <React.Fragment key={t.key}>
              <li className="ovd-item relative max-md:pl-14" style={{ "--i": i } as React.CSSProperties}>
                <span
                  aria-hidden="true"
                  className="ovd-node absolute top-6 z-20 grid size-5 place-items-center rounded-full bg-surface ring-2 ring-line max-md:left-[14px] md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="ovd-nodeOn size-2.5 rounded-full bg-accent" />
                </span>
                <button
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${id}-${t.key}`}
                  onClick={() => toggle(t.key, t.title)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "ovd-tile flex w-full flex-col items-center gap-3 rounded-xl bg-surface px-5 pt-10 pb-6 text-center ring-1 shadow-soft-sm ring-line transition-shadow hover:shadow-soft md:pt-14",
                    expanded && "ring-2 ring-accent",
                    focusRing,
                  )}
                >
                  <TrayArt test={t.key} />
                  <span className="text-[13px] font-bold tracking-[0.1em] text-muted uppercase">{t.kind}</span>
                  <span className="font-display text-xl leading-snug text-ink">{t.title}</span>
                </button>
              </li>
              <li id={`${id}-${t.key}`} hidden={!expanded} className="ovd-drawer max-md:pl-14 md:col-span-full">
                <div className="relative rounded-xl bg-surface-warm p-6 ring-1 ring-line md:p-8">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(null);
                      tiles.current[i]?.focus();
                    }}
                    aria-label={labels.close}
                    className={cn(
                      "absolute top-2 right-2 grid size-12 place-items-center rounded-full text-muted hover:text-ink",
                      focusRing,
                    )}
                  >
                    <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                  <h3 className="pr-12 font-display text-2xl text-ink">{t.title}</h3>
                  <p className="mt-3 measure text-base leading-relaxed text-text md:text-lg">{body}</p>
                  <p className="mt-4 measure text-base leading-relaxed text-text md:text-lg">
                    <strong className="font-semibold text-accent">{tellsLabel}: </strong>
                    {t.tells}
                  </p>
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </InView>
  );
}

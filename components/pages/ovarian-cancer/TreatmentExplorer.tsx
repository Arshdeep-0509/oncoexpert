"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import type { TreatmentKey } from "@/content/pages/ovarian-cancer";
import { track } from "@/lib/analytics";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";
import { TreatmentPanel } from "@/components/pages/ovarian-cancer/TreatmentPanel";

type Item = { key: TreatmentKey; title: string; body: string; bullets: readonly string[] };

type TreatmentExplorerProps = {
  items: readonly Item[];
  ask: { label: string; service: AppointmentService; notePrefix: string };
  labels: { tabs: string; replay: string };
};

const PREFIX = "#treatments-";

/**
 * The treatment explorer (treatments.css, ovt-). From 768px: ARIA tabs, vertical on desktop
 * (aria-orientation, Up / Down / Home / End, a sliding indicator), a pill row on tablets (Left /
 * Right); selection follows focus. Phones: an accordion, the first panel open. The URL hash
 * #treatments-<key> selects (and opens) an option. Choosing one sends ovarian_treatment_select.
 */
export function TreatmentExplorer({ items, ask, labels }: TreatmentExplorerProps) {
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState<ReadonlySet<number>>(new Set([0]));
  const desktop = useMedia(MEDIA.lg);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();

  // Deep links: #treatments-<key> selects that option (on load and on every hash change).
  React.useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(PREFIX)) return;
      const i = items.findIndex((it) => it.key === location.hash.slice(PREFIX.length));
      if (i < 0) return;
      setSelected(i);
      setOpen((o) => new Set(o).add(i));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const choose = (i: number, focus = false) => {
    if (focus) tabs.current[i]?.focus();
    if (i === selected) return;
    setSelected(i);
    track({ event: "ovarian_treatment_select", label: items[i].title });
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const prev = desktop ? "ArrowUp" : "ArrowLeft";
    const next = desktop ? "ArrowDown" : "ArrowRight";
    const n = items.length;
    const to =
      e.key === next
        ? (selected + 1) % n
        : e.key === prev
          ? (selected - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (to === null) return;
    e.preventDefault();
    choose(to, true);
  };
  const toggle = (i: number) => {
    const next = new Set(open);
    if (next.has(i)) next.delete(i);
    else {
      next.add(i);
      track({ event: "ovarian_treatment_select", label: items[i].title });
    }
    setOpen(next);
  };

  return (
    <>
      {/* Tablet and desktop: tabs */}
      <div className="hidden gap-10 md:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        <div
          role="tablist"
          aria-label={labels.tabs}
          aria-orientation={desktop ? "vertical" : "horizontal"}
          onKeyDown={onKeyDown}
          className="relative flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-2"
        >
          <span
            aria-hidden="true"
            className="ovt-indicator absolute top-0 left-0 hidden h-16 w-1 rounded-full bg-accent lg:block"
            style={{ "--i": selected } as React.CSSProperties}
          />
          {items.map((it, i) => (
            <button
              key={it.key}
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
                "min-h-12 rounded-pill px-5 text-[15px] font-semibold transition-colors lg:h-16 lg:rounded-lg lg:px-6 lg:text-left lg:text-base",
                selected === i
                  ? "bg-accent text-white lg:bg-accent-soft lg:text-accent"
                  : "bg-surface text-ink ring-1 ring-line hover:bg-accent-soft lg:ring-0",
              )}
            >
              {it.title}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`}>
          <TreatmentPanel key={items[selected].key} item={items[selected]} ask={ask} replayLabel={labels.replay} />
        </div>
      </div>

      {/* Phones: an accordion */}
      <ul className="grid gap-3 md:hidden">
        {items.map((it, i) => {
          const expanded = open.has(i);
          return (
            <li key={it.key} className="rounded-xl bg-surface ring-1 ring-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${id}-acc-${i}`}
                  onClick={() => toggle(i)}
                  className="flex min-h-14 w-full items-center justify-between gap-3 rounded-xl px-5 text-left font-display text-lg text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {it.title}
                  <ChevronDown
                    className={cn("size-5 shrink-0 text-muted transition-transform", expanded && "rotate-180")}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div id={`${id}-acc-${i}`} hidden={!expanded} className="px-5 pb-6">
                {expanded ? <TreatmentPanel item={it} ask={ask} replayLabel={labels.replay} /> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

"use client";

import * as React from "react";
import {
  Crosshair,
  Dna,
  Hand,
  HeartPulse,
  Network,
  ScanEye,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ModalityKey, TreatmentPointIcon, treatments as content } from "@/content/pages/stomach-cancer";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Content = typeof content;
type Stop = Content["pathway"]["stops"][number];

const pointIcons: Record<TreatmentPointIcon, LucideIcon> = {
  nodes: Network,
  survival: HeartPulse,
  visualization: ScanEye,
  tremor: Hand,
  targeted: Crosshair,
  "side-effects": ShieldCheck,
  genetics: Dna,
  response: TrendingUp,
};

const cardId = (key: ModalityKey) => `gastro-modality-${key}`;
const DWELL_MS = 600;

type Selection = { kind: "stop"; key: string } | { kind: "card"; key: ModalityKey };

/**
 * The care pathway and the four modality cards, kept in step. A stop lights its card(s); a card
 * (hovered or tapped; keyboard users have the stop buttons) lights its stop(s): FLOT lights both "before" and "after". Desktop:
 * a rail with four stops over a four-column grid (two columns on tablets). Phones: the stops as a
 * row of chips over a swipe row of the cards (a chip scrolls the row; a swipe moves the chips).
 * `stomach_modality_select` for stops and chips at once, for cards after a short dwell.
 */
export function ModalityExplorer({ content }: { content: Content }) {
  const { stops } = content.pathway;
  const [sel, setSel] = React.useState<Selection>({ kind: "stop", key: stops[0].key });
  const row = React.useRef<HTMLDivElement>(null);
  const pending = React.useRef<ModalityKey | null>(null);
  const dwell = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(dwell.current), []);

  const litCards: readonly ModalityKey[] =
    sel.kind === "stop" ? (stops.find((s) => s.key === sel.key)?.cards ?? []) : [sel.key];
  const cardsOf = (s: Stop): readonly ModalityKey[] => s.cards;
  const litStops: readonly string[] =
    sel.kind === "stop" ? [sel.key] : stops.filter((s) => cardsOf(s).includes(sel.key)).map((s) => s.key);
  const lastLit = Math.max(...stops.map((s, i) => (litStops.includes(s.key) ? i : -1)));
  const titleOf = (key: ModalityKey) => content.items.find((i) => i.key === key)?.title ?? key;

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const chooseStop = (stop: Stop) => {
    setSel({ kind: "stop", key: stop.key });
    track({ event: "stomach_modality_select", label: stop.label });
    // Phones: bring the stop's first card into the row.
    const scroller = row.current;
    const card = document.getElementById(cardId(stop.cards[0]))?.parentElement;
    if (!scroller || !card || scroller.scrollWidth <= scroller.clientWidth) return;
    const pad = parseFloat(getComputedStyle(scroller.firstElementChild!).paddingLeft) || 0;
    const left = Math.min(card.offsetLeft - pad, scroller.scrollWidth - scroller.clientWidth);
    if (Math.abs(scroller.scrollLeft - left) < 4) return;
    pending.current = stop.cards[0];
    scroller.scrollTo({ left, behavior: reduce() ? "auto" : "smooth" });
  };

  const previewCard = (key: ModalityKey) => {
    setSel({ kind: "card", key });
    window.clearTimeout(dwell.current);
    dwell.current = window.setTimeout(() => track({ event: "stomach_modality_select", label: titleOf(key) }), DWELL_MS);
  };

  // Phones: a swipe selects the card in view (browsing, not reported).
  React.useEffect(() => {
    const scroller = row.current;
    if (!scroller) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (scroller.scrollWidth <= scroller.clientWidth) return;
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-key") as ModalityKey | null;
          if (!entry.isIntersecting || !key) continue;
          if (pending.current) {
            if (key === pending.current) pending.current = null;
            continue;
          }
          setSel({ kind: "card", key });
        }
      },
      { root: scroller, threshold: 0.6 },
    );
    scroller.querySelectorAll("[data-key]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const stopButton = (stop: Stop, i: number, variant: "rail" | "chip") => {
    const on = litStops.includes(stop.key);
    return (
      <button
        key={stop.key}
        type="button"
        aria-pressed={on}
        aria-controls={stop.cards.map(cardId).join(" ")}
        onClick={() => chooseStop(stop)}
        data-on={on ? "" : undefined}
        className={cn(
          variant === "rail"
            ? "gastro-m-stop group relative flex flex-col items-center gap-3 rounded-2xl px-2 pt-0 pb-2 text-center outline-none"
            : "gastro-m-chip flex min-h-12 shrink-0 snap-start items-center gap-2 rounded-pill px-4 text-sm font-semibold whitespace-nowrap outline-none",
        )}
      >
        {variant === "rail" ? (
          <>
            <span
              aria-hidden="true"
              className="gastro-m-node grid size-12 place-items-center rounded-full text-sm font-bold tabular-nums"
            >
              {i + 1}
            </span>
            <span className="max-w-[16ch] text-sm leading-snug font-semibold md:text-base">{stop.label}</span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="gastro-m-chipNum grid size-6 place-items-center rounded-full text-xs font-bold tabular-nums"
            >
              {i + 1}
            </span>
            {stop.label}
          </>
        )}
      </button>
    );
  };

  return (
    <div>
      {/* The care pathway: a rail (from 768px) or a chip row (phones) */}
      <div role="group" aria-label={content.pathway.label}>
        <div className="relative hidden md:block">
          <div aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] h-0.5 rounded-pill bg-line">
            <span
              className="gastro-m-fill absolute inset-y-0 left-0 w-full origin-left rounded-pill bg-(image:--grad-accent)"
              style={{ "--f": Math.max(0, lastLit) / (stops.length - 1) } as React.CSSProperties}
            />
          </div>
          <div className="relative grid grid-cols-4 gap-2">{stops.map((s, i) => stopButton(s, i, "rail"))}</div>
        </div>
        <div className="-mx-(--gutter) no-scrollbar flex snap-x scroll-px-(--gutter) gap-2 overflow-x-auto px-(--gutter) pb-1 md:hidden">
          {stops.map((s, i) => stopButton(s, i, "chip"))}
        </div>
      </div>

      {/* The cards */}
      <div
        ref={row}
        role="region"
        aria-label={content.a11y.cards}
        tabIndex={0}
        className="gastro-m-row -mx-(--gutter) mt-6 no-scrollbar snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto overscroll-x-contain outline-none md:mx-0 md:mt-10 md:snap-none md:overflow-visible"
      >
        <ul className="flex gap-4 px-(--gutter) pt-2 pb-4 md:grid md:grid-cols-2 md:gap-5 md:p-0 lg:grid-cols-4">
          {content.items.map((item) => {
            const on = litCards.includes(item.key);
            return (
              <li key={item.key} data-key={item.key} className="flex w-[84%] shrink-0 snap-start md:w-auto">
                <article
                  id={cardId(item.key)}
                  data-on={on ? "" : undefined}
                  onMouseEnter={() => previewCard(item.key)}
                  onClick={() => previewCard(item.key)}
                  className="gastro-m-card flex w-full flex-col rounded-2xl bg-surface p-5 md:p-6"
                >
                  <span className="self-start rounded-pill bg-accent-soft px-3 py-1 text-xs font-bold tracking-[0.12em] text-accent-hover">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl leading-snug font-(--display-weight) tracking-(--display-tracking) text-ink md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{item.body.join(" ")}</p>
                  <ul className="mt-auto grid gap-2.5 pt-5">
                    {item.points.map((pt) => {
                      const Icon = pointIcons[pt.icon];
                      return (
                        <li key={pt.label} className="flex items-center gap-3 text-base text-text">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-warm text-accent">
                            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          {pt.label}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

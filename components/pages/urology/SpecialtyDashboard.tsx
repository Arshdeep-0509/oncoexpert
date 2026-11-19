"use client";

import * as React from "react";
import type { SpecialtyKey, specialties as content } from "@/content/pages/urology";
import { track } from "@/lib/analytics";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { SpecialtyCard } from "@/components/pages/urology/SpecialtyCard";
import { SpecialtyMap } from "@/components/pages/urology/SpecialtyMap";
import { HOTSPOTS, MAP_BOX } from "@/components/pages/urology/specialty-map";
import { spStyles as s } from "@/components/pages/urology/specialties-styles";

type Content = typeof content;
type Item = Content["items"][number];

const cardId = (key: SpecialtyKey) => `uro-specialty-${key}`;
/** Hovering or focusing a card counts as a choice (analytics) only after this dwell. */
const DWELL_MS = 600;

/** The code chip text ("C64") or the rare tag ("RARE"). */
const codeOf = (item: Item) => ("code" in item ? item.code : item.tag);

/**
 * "CLINICAL DASHBOARD V2.0": the map and the six cards, one specialty active at a time.
 * Desktop and tablets: the map (sticky) beside the cards; a pin, a card hovered or a card's button
 * focused selects it (the organ glows, the card lifts). Phones: a strip of six chips over a swipe
 * row of the cards, kept in step both ways (a chip scrolls the row; a swipe moves the chip).
 */
export function SpecialtyDashboard({ content }: { content: Content }) {
  const [active, setActive] = React.useState<SpecialtyKey>(content.items[0].key);
  const scroller = React.useRef<HTMLDivElement>(null);
  // While the row scrolls to a chosen card, swipe updates wait until that card arrives.
  const pending = React.useRef<SpecialtyKey | null>(null);
  const dwell = React.useRef<number | undefined>(undefined);
  const titleOf = React.useCallback(
    (key: SpecialtyKey) => content.items.find((i) => i.key === key)?.title ?? key,
    [content.items],
  );

  const choose = React.useCallback(
    (key: SpecialtyKey) => {
      setActive(key);
      track({ event: "urology_specialty_select", label: titleOf(key) });
    },
    [titleOf],
  );

  // A card hovered or focused: select at once, report it after a short dwell.
  const preview = React.useCallback(
    (key: SpecialtyKey) => {
      setActive(key);
      window.clearTimeout(dwell.current);
      dwell.current = window.setTimeout(
        () => track({ event: "urology_specialty_select", label: titleOf(key) }),
        DWELL_MS,
      );
    },
    [titleOf],
  );
  React.useEffect(() => () => window.clearTimeout(dwell.current), []);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Phones: a chip scrolls the row to its card.
  const fromChip = (key: SpecialtyKey) => {
    choose(key);
    const row = scroller.current;
    const card = document.getElementById(cardId(key))?.parentElement;
    if (!row || !card || row.scrollWidth <= row.clientWidth) return;
    const pad = parseFloat(getComputedStyle(row.firstElementChild!).paddingLeft) || 0;
    const left = Math.min(card.offsetLeft - pad, row.scrollWidth - row.clientWidth);
    if (Math.abs(row.scrollLeft - left) < 4) return;
    pending.current = key;
    row.scrollTo({ left, behavior: reduce() ? "auto" : "smooth" });
  };

  // Desktop: a pin brings its card into view when it is off screen.
  const fromPin = (key: SpecialtyKey) => {
    choose(key);
    const card = document.getElementById(cardId(key));
    if (!card) return;
    const box = card.getBoundingClientRect();
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
    if (box.top >= header && box.bottom <= window.innerHeight) return;
    const offset = header + 24;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(card, { offset: -offset });
    else window.scrollTo({ top: box.top + window.scrollY - offset, behavior: reduce() ? "auto" : "smooth" });
  };

  // Phones: a swipe moves the active chip (not reported: browsing, not a choice).
  React.useEffect(() => {
    const row = scroller.current;
    if (!row) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (row.scrollWidth <= row.clientWidth) return;
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-key") as SpecialtyKey | null;
          if (!entry.isIntersecting || !key) continue;
          if (pending.current) {
            if (key === pending.current) pending.current = null;
            continue;
          }
          setActive(key);
        }
      },
      { root: row, threshold: 0.6 },
    );
    row.querySelectorAll("[data-key]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8 lg:gap-10">
      {/* Phones: the organ chips */}
      <div role="group" aria-label={content.a11y.strip} className="grid grid-cols-3 gap-2 md:hidden">
        {content.items.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={active === item.key}
            aria-controls={cardId(item.key)}
            onClick={() => fromChip(item.key)}
            data-rare={"tag" in item ? "" : undefined}
            className={cn(
              s.pill,
              "flex min-h-12 flex-col items-center justify-center rounded-xl px-1.5 py-1.5 text-center leading-tight",
            )}
          >
            <span className="text-[11px] font-bold tracking-[0.08em] tabular-nums">{codeOf(item)}</span>
            <span className="text-[13px] font-medium">{item.short}</span>
          </button>
        ))}
      </div>

      {/* Tablets and desktop: the map with its pins */}
      <div className="hidden md:col-span-6 md:block lg:col-span-5">
        <div className="sticky top-[calc(var(--header-h)+24px)] rounded-3xl bg-surface-alt p-5 ring-1 ring-line lg:p-7">
          <div
            className="relative mx-auto w-full max-w-[420px]"
            style={{ aspectRatio: `${MAP_BOX.width} / ${MAP_BOX.height}` }}
          >
            <SpecialtyMap active={active} label={content.a11y.map} />
            <div role="group" aria-label={content.a11y.organs}>
              {content.items.map((item) => {
                const h = HOTSPOTS[item.key];
                const left = h.side === "left" ? h.cx - h.w : h.side === "right" ? h.cx : h.cx - h.w / 2;
                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={active === item.key}
                    aria-controls={cardId(item.key)}
                    onClick={() => fromPin(item.key)}
                    className={cn(
                      "group absolute flex min-h-12 -translate-y-1/2 items-center rounded-full outline-none",
                      h.side === "left"
                        ? "justify-end pr-2.5"
                        : h.side === "right"
                          ? "justify-start pl-2.5"
                          : "justify-center",
                    )}
                    style={{
                      left: `${(left / MAP_BOX.width) * 100}%`,
                      top: `${(h.cy / MAP_BOX.height) * 100}%`,
                      width: `${(h.w / MAP_BOX.width) * 100}%`,
                    }}
                  >
                    <span
                      data-rare={"tag" in item ? "" : undefined}
                      className={cn(
                        s.pill,
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs whitespace-nowrap group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2",
                      )}
                    >
                      <span className="font-bold tracking-[0.06em] tabular-nums">{codeOf(item)}</span>
                      <span className="font-medium">{item.short}</span>
                      <span className="sr-only">{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* The cards: a swipe row on phones, a column (two from xl) beside the map */}
      <div className="md:col-span-6 lg:col-span-7">
        <div
          ref={scroller}
          role="region"
          aria-label={content.a11y.cards}
          tabIndex={0}
          className={cn(
            s.row,
            "-mx-(--gutter) no-scrollbar snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto overscroll-x-contain outline-none",
            "md:mx-0 md:snap-none md:overflow-visible",
          )}
        >
          <ul className="flex gap-4 px-(--gutter) pt-2 pb-4 md:flex-col md:gap-4 md:p-0 xl:grid xl:grid-cols-2 xl:gap-5">
            {content.items.map((item) => (
              <li key={item.key} data-key={item.key} className="flex w-[84%] shrink-0 snap-start md:w-auto">
                <SpecialtyCard
                  id={cardId(item.key)}
                  item={item}
                  scheme={content.scheme}
                  action={content.action}
                  note={`${content.protocolNote}${item.title}`}
                  active={active === item.key}
                  onPreview={() => preview(item.key)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

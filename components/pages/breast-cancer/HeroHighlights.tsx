import type * as React from "react";
import { hero } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { highlightIcons } from "@/components/pages/breast-cancer/highlight-icons";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";

/*
 * Card placement around the arch.
 * Desktop/tablet: top-left, middle-right, bottom-left (the ribbon has the middle left).
 * Phones, a zig-zag: top right (the ribbon has the top left), middle left, and pinned half outside
 * the arch's bottom-right corner (the pause button has the bottom left).
 */
const CARD_POSITION = [
  "max-md:top-[13%] max-md:-right-[7%] md:top-[4%] md:-left-[14%] lg:top-[9%] lg:-left-[16%]",
  "max-md:top-1/2 max-md:-left-[7%] max-md:-translate-y-1/2 md:top-[40%] md:-right-[8%] lg:top-[44%] lg:-right-[12%]",
  "max-md:-right-[7%] max-md:bottom-0 max-md:translate-y-1/2 md:bottom-[3%] md:-left-[14%] lg:bottom-[7%] lg:-left-[20%]",
] as const;
const FLOAT = ["6.5s", "7.5s", "7s"] as const;

/** A compact card: the icon beside its label (which wraps to two lines at most). */
function HighlightCard({ index }: { index: number }) {
  const item = hero.highlights[index];
  const Icon = highlightIcons[item.key];
  return (
    <div className="flex items-center gap-2 rounded-[16px] border border-line bg-white/90 py-2 pr-3 pl-2 shadow-soft-lg md:gap-2.5 md:rounded-[18px] md:py-2.5 md:pr-4 md:pl-2.5">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent md:size-9 lg:size-10"
      >
        <Icon className="size-3.5 md:size-[18px] lg:size-5" strokeWidth={1.75} />
      </span>
      <p className="font-display text-[12px] leading-tight font-semibold text-ink md:text-[14px] lg:text-[15px]">
        {item.label}
      </p>
    </div>
  );
}

/**
 * The three floating cards around the arch (rendered inside HeroStage): Awareness Programmes,
 * Screening and Survivor Support Groups, each a small icon beside its label. They pop in after
 * the intro, then float; on every screen size.
 */
export function HeroHighlights() {
  return (
    <div role="list" aria-label={hero.a11y.highlights}>
      {hero.highlights.map((item, i) => (
        <div
          key={item.key}
          role="listitem"
          className={cn("absolute z-10 w-max max-w-[55%] md:max-w-[210px]", CARD_POSITION[i])}
        >
          <div className={cn(styles.step, styles.pop)} style={at(1 + i * 0.15)}>
            <div
              className="motion-safe:animate-float"
              style={{ "--float-duration": FLOAT[i], animationDelay: `-${i * 2.1}s` } as React.CSSProperties}
            >
              <HighlightCard index={i} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

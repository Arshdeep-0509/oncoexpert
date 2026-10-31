import type * as React from "react";
import { hero } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { highlightIcons } from "@/components/pages/breast-cancer/highlight-icons";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";

/*
 * Card placement around the photo, clear of her face (upper left of the picture).
 * Desktop/tablet: top right, middle right (over the pink fabric), bottom left (over her shirt).
 * Phones, a zig-zag: top right, middle left (below her chin), bottom right; the pause button has
 * the bottom left and the ribbon the top left.
 */
const CARD_POSITION = [
  "max-md:top-[8%] max-md:right-[4%] md:top-[6%] md:right-[2%]",
  "max-md:top-[64%] max-md:left-[4%] md:top-[48%] md:right-[1%]",
  "max-md:right-[4%] max-md:bottom-[6%] md:bottom-[10%] md:left-[6%]",
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
          className={cn("absolute z-10 w-max max-w-[50%] md:max-w-[210px]", CARD_POSITION[i])}
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

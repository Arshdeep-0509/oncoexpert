import type * as React from "react";
import { hero } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { HeroCounter } from "@/components/pages/breast-cancer/HeroCounter";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";

/*
 * Stat card placement around the arch.
 * Desktop/tablet: top-left, middle-right, bottom-left.
 * Phones: the first two are pinned half outside the arch's bottom corners; the third
 * moves to the strip under the arch.
 */
const CARD_POSITION = [
  "max-md:-left-[5%] max-md:bottom-0 max-md:translate-y-1/2 md:top-[4%] md:-left-[14%] lg:top-[9%] lg:-left-[16%]",
  "max-md:-right-[5%] max-md:bottom-0 max-md:translate-y-1/2 md:top-[40%] md:-right-[8%] lg:top-[44%] lg:-right-[12%]",
  "max-md:hidden md:bottom-[3%] md:-left-[14%] lg:bottom-[7%] lg:-left-[20%]",
] as const;
const FLOAT = ["6.5s", "7.5s", "7s"] as const;

function StatCard({ index, className }: { index: number; className?: string }) {
  const stat = hero.stats[index];
  return (
    <div
      className={cn(
        "rounded-[20px] border border-line bg-white/90 px-4 py-3 shadow-soft-lg md:rounded-[16px] md:px-3.5 md:py-2.5 lg:rounded-[20px] lg:px-5 lg:py-4",
        className,
      )}
    >
      <p className="font-display text-[1.75rem] leading-none font-semibold text-ink md:text-[1.6rem] lg:text-[2.25rem]">
        <HeroCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-muted md:mt-1 md:text-[12px] lg:mt-1.5 lg:text-[13px]">
        {stat.label}
      </p>
    </div>
  );
}

/** The three floating stat cards around the arch (rendered inside HeroStage). */
export function HeroStats() {
  return (
    <div role="list" aria-label={hero.a11y.stats}>
      {hero.stats.map((stat, i) => (
        <div
          key={stat.label}
          role="listitem"
          className={cn("absolute z-10 w-[46%] md:w-[50%] lg:w-[min(200px,44%)]", CARD_POSITION[i])}
        >
          <div className={cn(styles.step, styles.pop)} style={at(1 + i * 0.15)}>
            <div
              className="motion-safe:animate-float"
              style={{ "--float-duration": FLOAT[i], animationDelay: `-${i * 2.1}s` } as React.CSSProperties}
            >
              <StatCard index={i} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

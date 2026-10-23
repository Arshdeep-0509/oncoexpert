import type * as React from "react";
import { hero, surgeon } from "@/content/pages/home";
import { cn } from "@/lib/utils";
import { HeroCounter } from "@/components/pages/home/HeroCounter";
import { at, styles } from "@/components/pages/home/hero-styles";

/** Float loop length and start offset per chip (desktop), so the four never move in step. */
const FLOAT = [
  [6.4, 0],
  [7.6, 0.9],
  [6.9, 1.7],
  [8, 2.6],
] as const;

/**
 * The four stats as glass chips: floating around the ring on desktop (their own parallax
 * layer), a 2×2 grid of compact cards under it on tablets and phones. Each pops in, counts up,
 * then floats. No backdrop blur: the chips animate (see docs/PROJECT.md, performance notes).
 */
export function HeroStats() {
  return (
    <div className={cn(styles.areaStats, styles.scrollStage, "mt-8 md:mt-10 lg:mt-0")}>
      <div data-depth="16" className="lg:absolute lg:inset-0">
        <ul
          aria-label={hero.a11y.stats}
          className="mx-auto grid max-w-[520px] grid-cols-2 gap-3 lg:absolute lg:inset-0 lg:block lg:max-w-none"
        >
          {surgeon.stats.map((stat, i) => {
            const step = 1.2 + i * 0.12;
            const [float, phase] = FLOAT[i];
            return (
              <li key={stat.label} className={cn(styles.chip, styles.step, styles.pop)} style={at(step)}>
                <div
                  className={cn(styles.float, styles.loop)}
                  style={{ "--float": `${float}s`, "--phase": `${phase}s` } as React.CSSProperties}
                >
                  {/* Glass without blur: white/8 over a dark backing, so the ring never shows through the text. */}
                  <p className="flex h-full flex-col rounded-2xl bg-ink/70 bg-linear-to-b from-white/10 to-white/[0.06] px-4 py-3.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.55)] ring-1 ring-white/15 xl:min-w-[158px] xl:px-5 xl:py-4">
                    <span className="font-display text-[1.6rem] leading-none font-bold tracking-[-0.02em] text-white xl:text-[1.85rem]">
                      <HeroCounter value={stat.value} suffix={stat.suffix} at={step + 0.15} />
                    </span>
                    <span className="mt-2 text-[11px] leading-snug font-semibold tracking-[0.14em] text-white/70 uppercase">
                      {stat.label}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

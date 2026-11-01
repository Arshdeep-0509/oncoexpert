import type * as React from "react";
import { Check } from "lucide-react";
import { hero } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { at, styles } from "@/components/pages/thyroid-cancer/hero-styles";

/**
 * The three live figures as glass chips under both columns: 100% counts up; 0% is shown as it is,
 * with a calm check (never a countdown); "High" fades in. They pop in and float (pausable).
 * Desktop and tablets three across; phones a swipe row.
 */
export function HeroStats() {
  return (
    <SwipeRow label={hero.a11y.stats} gridClassName="md:grid-cols-3 md:gap-4" dots={false}>
      {hero.stats.map((stat, i) => (
        <div key={stat.label} className={cn(styles.step, styles.pop, "h-full")} style={at(1.9 + i * 0.12)}>
          <div
            className={cn(
              styles.float,
              "flex h-full items-center gap-4 rounded-xl bg-surface/85 px-5 py-4 ring-1 shadow-soft ring-white",
            )}
            style={{ "--i": i } as React.CSSProperties}
          >
            <p className="font-display text-[2.2rem] leading-none font-semibold text-ink md:text-[2.5rem]">
              {"text" in stat ? (
                <span className={cn(styles.step, styles.fadeIn)} style={at(2.3)}>
                  {stat.text}
                </span>
              ) : stat.value === 0 ? (
                `${stat.value}${stat.suffix}`
              ) : (
                <Counter value={stat.value} suffix={stat.suffix} delay={2} duration={1.4} reserveWidth />
              )}
            </p>
            <p className="flex items-center gap-2 text-base leading-snug font-semibold text-muted">
              {"text" in stat || stat.value !== 0 ? null : (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-highlight text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </SwipeRow>
  );
}

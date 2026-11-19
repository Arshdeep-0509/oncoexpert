import type * as React from "react";
import { HandHeart } from "lucide-react";
import { hero } from "@/content/pages/stomach-cancer";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { at, styles } from "@/components/pages/stomach-cancer/hero-styles";

/* A stylised stomach (400 × 360): the gullet entering at the top, the J-shaped body with its
   fundus to the right, the outlet and the first curve of the duodenum to the left. */
const GULLET = "M246 6 C 246 30, 246 52, 250 76";
const OUTER =
  "M250 76 C 274 46, 330 52, 344 100 C 358 148, 350 218, 318 256 C 286 294, 220 310, 166 300 " +
  "C 128 292, 104 272, 92 248 L 84 230 C 102 214, 126 220, 152 228 C 186 238, 222 224, 236 192 " +
  "C 248 164, 246 120, 250 76 Z";
const DUODENUM = "M86 240 C 62 248, 48 272, 54 296 C 60 318, 82 330, 106 324";
const PYLORUS = "M80 222 L 92 254";
/* The inner folds (rugae). */
const FOLDS = [
  "M272 108 C 292 140, 294 180, 284 214",
  "M304 122 C 322 162, 322 206, 302 240",
  "M252 238 C 222 262, 184 272, 146 262",
  "M232 270 C 200 286, 162 288, 128 274",
] as const;
/* The flow of nourishment: down the gullet, round the body, out through the outlet. */
const FLOW = "M246 6 C 246 40, 250 70, 262 104 C 284 160, 292 220, 242 254 C 198 282, 142 280, 92 244";

const DRAW = [
  { d: GULLET, at: 0.3, w: 5 },
  { d: OUTER, at: 0.5, w: 4.5, long: true },
  { d: PYLORUS, at: 1.3, w: 3.5 },
  { d: DUODENUM, at: 1.35, w: 4 },
] as const;

/**
 * The hero's visual (no photo): the stomach in warm turmeric line art drawing itself in, its folds
 * following, a saffron tint filling it, then saffron pulses of nourishment flowing down the gullet
 * and through the stomach while the folds move gently and the glow breathes, inside a periwinkle
 * ribbon ring; the 48px pause button, and the trust card ("5,000+ Surgeries Performed"): beside the
 * stomach's empty top-left from 768px, just under the art on phones. The box is square, so nothing
 * shifts while the page loads.
 */
export function HeroVisual() {
  const { card } = hero;
  return (
    <div className="relative mx-auto w-full max-w-[460px] md:max-w-[540px] lg:mr-0">
      <div className="relative mx-auto aspect-square w-[90%] md:w-full">
        {/* Backdrop: the warm glow, the periwinkle ribbon ring, a faint saffron ring */}
        <div aria-hidden="true" className={cn(styles.step, styles.pop, "absolute inset-0")} style={at(0.1)}>
          <div
            className={cn(
              styles.glow,
              "absolute inset-[5%] rounded-full bg-[radial-gradient(circle,var(--surface)_0%,color-mix(in_srgb,var(--petal)_85%,transparent)_42%,transparent_70%)]",
            )}
          />
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
            <circle
              cx="200"
              cy="200"
              r="194"
              fill="none"
              stroke="var(--highlight)"
              strokeOpacity={0.45}
              strokeWidth={1.5}
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
            <circle
              cx="200"
              cy="200"
              r="156"
              fill="none"
              stroke="var(--accent-bright)"
              strokeOpacity={0.18}
              strokeWidth={1.5}
            />
          </svg>
        </div>

        {/* The stomach */}
        <svg
          role="img"
          aria-label={hero.a11y.visual}
          viewBox="20 -10 360 360"
          className="absolute inset-[9%] overflow-visible"
        >
          <defs>
            <linearGradient id="gastro-hero-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-bright)" />
            </linearGradient>
          </defs>
          <path d={OUTER} fill="var(--petal)" className={styles.fill} />
          {DRAW.map((s) => (
            <path
              key={s.d}
              d={s.d}
              pathLength={1}
              fill="none"
              stroke="url(#gastro-hero-grad)"
              strokeWidth={s.w}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(styles.line, "long" in s && styles.lineLong)}
              style={{ "--d": `${s.at}s` } as React.CSSProperties}
            />
          ))}
          {FOLDS.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--accent-bright)"
              strokeOpacity={0.7}
              strokeWidth={2.5}
              strokeLinecap="round"
              className={cn(styles.line, styles.fold)}
              style={{ "--d": `${1.5 + i * 0.12}s`, "--i": i } as React.CSSProperties}
            />
          ))}
          {[0, 1].map((i) => (
            <path
              key={i}
              d={FLOW}
              pathLength={1}
              fill="none"
              stroke="var(--accent-bright)"
              strokeWidth={6}
              strokeLinecap="round"
              className={styles.flow}
              style={{ "--s": `${2.6 + i * 2.25}s` } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className={cn(styles.step, styles.fadeUp, "absolute top-0 right-0 z-10")} style={at(1.8)}>
          <MotionToggle
            hero
            pause={hero.a11y.pause}
            play={hero.a11y.play}
            className="size-12 bg-surface/90 shadow-soft-sm"
          />
        </div>
      </div>

      {/* The trust card over the art's lower edge */}
      <div
        className={cn(
          styles.step,
          styles.pop,
          "relative z-10 mx-4 -mt-6 flex items-center gap-4 rounded-2xl bg-surface p-4 ring-1 shadow-soft-lg ring-line md:absolute md:top-[6%] md:-left-4 md:mx-0 md:mt-0 md:max-w-[320px] md:p-5 lg:-left-10",
        )}
        style={at(1.6)}
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <HandHeart className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="min-w-0">
          <span className="block font-display text-xl leading-tight font-(--display-weight) text-ink md:text-2xl">
            <Counter value={card.value} suffix={card.suffix} reserveWidth /> {card.label}
          </span>
          <span className="mt-1 block text-sm text-muted md:text-base">{card.note}</span>
        </p>
      </div>
    </div>
  );
}

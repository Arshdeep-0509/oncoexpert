import type * as React from "react";
import { hero, specialties } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { SHAPES } from "@/components/pages/urology/specialty-map";
import { at, styles } from "@/components/pages/urology/hero-styles";

const chips = hero.chips.map((key) => specialties.items.find((item) => item.key === key)!);

/* Chip positions around the art: phones (the first two only, in opposite corners), then from md. */
const CHIP_POSITIONS = [
  "left-0 top-[4%] md:-left-6 md:top-[14%] lg:-left-10",
  "right-0 bottom-[2%] md:-right-4 md:top-[44%] md:bottom-auto lg:-right-6",
  "md:left-0 md:bottom-[14%] lg:-left-8",
  "md:right-6 md:bottom-[2%]",
] as const;

/* The gauge ring and its ticks (400 × 400). */
const TICKS = Array.from({ length: 25 }, (_, i) => {
  const a = (-90 + i * 15) * (Math.PI / 180);
  const r1 = 176;
  const r2 = i % 6 === 0 ? 190 : 184;
  const p = (r: number) => `${(200 + r * Math.cos(a)).toFixed(1)} ${(200 + r * Math.sin(a)).toFixed(1)}`;
  return `M${p(r1)} L${p(r2)}`;
}).join(" ");

/* The urinary tract (the specialties map's shapes, 360 × 450), drawn in turn. */
const DRAW = [
  ...SHAPES.kidneys.map((d) => ({ d, at: 0.3, w: 3.5, kidney: true })),
  ...SHAPES.adrenals.map((d) => ({ d, at: 0.75, w: 3, kidney: false })),
  ...SHAPES.ureters.map((d) => ({ d, at: 0.95, w: 3, kidney: false })),
  { d: SHAPES.bladder, at: 1.25, w: 3.5, kidney: false },
  { d: SHAPES.urethra, at: 1.7, w: 3, kidney: false },
];
const { prostate } = SHAPES;
/* The flow: from each kidney down its ureter, then out through the urethra. */
const FLOW = [...SHAPES.ureters, SHAPES.urethra] as const;

/**
 * The hero's visual (no photo): the urinary tract in kidney-green line art drawing itself in, the
 * organs filling softly, then marigold pulses flowing down the ureters and the kidneys breathing,
 * inside a sage glow with a gauge ring; the four dashboard chips (ICD-10 code · organ) float around
 * it. The box is square, so nothing shifts while the page loads. Phones: smaller, two chips.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-[88%] max-w-[420px] md:w-[78%] md:max-w-[520px] lg:mr-0 lg:w-full lg:max-w-[540px]">
      {/* Backdrop: glow, gauge ring, ticks */}
      <div aria-hidden="true" className={cn(styles.step, styles.pop, "absolute inset-0")} style={at(0.1)}>
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,var(--surface)_0%,color-mix(in_srgb,var(--accent-soft)_85%,transparent)_45%,transparent_70%)]" />
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
          <circle cx="200" cy="200" r="196" fill="none" stroke="var(--line)" strokeWidth={1.5} strokeDasharray="2 7" />
          <circle
            cx="200"
            cy="200"
            r="168"
            pathLength={1}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.25}
            strokeWidth={1.25}
            transform="rotate(-90 200 200)"
            className={styles.ring}
          />
          <path
            d={TICKS}
            pathLength={1}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeLinecap="round"
            className={styles.tick}
          />
        </svg>
      </div>

      {/* The urinary tract */}
      <svg
        role="img"
        aria-label={hero.a11y.visual}
        viewBox="60 50 240 390"
        className="absolute inset-x-[16%] inset-y-[5%] h-[90%] w-[68%] overflow-visible"
      >
        <defs>
          <linearGradient id="uro-hero-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-bright)" />
          </linearGradient>
        </defs>
        {/* Soft fills, after the lines */}
        <g className={styles.fill}>
          {SHAPES.kidneys.map((d) => (
            <path key={d} d={d} fill="var(--surface)" className={styles.kidney} />
          ))}
          <path d={SHAPES.bladder} fill="var(--surface)" />
          <ellipse {...prostate} fill="var(--petal)" />
        </g>
        {DRAW.map((s) => (
          <path
            key={s.d}
            d={s.d}
            pathLength={1}
            fill="none"
            stroke="url(#uro-hero-grad)"
            strokeWidth={s.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(styles.line, s.kidney && styles.kidney)}
            style={{ "--d": `${s.at}s` } as React.CSSProperties}
          />
        ))}
        <ellipse
          {...prostate}
          pathLength={1}
          fill="none"
          stroke="url(#uro-hero-grad)"
          strokeWidth={3}
          className={styles.line}
          style={{ "--d": "1.5s" } as React.CSSProperties}
        />
        {/* The flow */}
        {FLOW.map((d, i) => (
          <path
            key={`flow-${d}`}
            d={d}
            pathLength={1}
            fill="none"
            stroke="var(--highlight)"
            strokeWidth={4}
            strokeLinecap="round"
            className={styles.pulse}
            style={{ "--s": `${2.4 + i * 0.6}s` } as React.CSSProperties}
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

      {/* Dashboard chips (words from the specialties) */}
      <ul aria-label={hero.a11y.chips} className="contents">
        {chips.map((item, i) => (
          <li
            key={item.key}
            className={cn(
              styles.step,
              styles.pop,
              "absolute z-10",
              CHIP_POSITIONS[i],
              i >= hero.phoneChips && styles.phoneHidden,
            )}
            style={at(1.9 + i * 0.15)}
          >
            <span
              className={cn(
                styles.chipFloat,
                "flex min-h-10 items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm leading-none whitespace-nowrap text-ink ring-1 shadow-soft ring-line md:min-h-11 md:px-3.5",
              )}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className={cn(styles.live, "size-2 shrink-0 rounded-full bg-highlight")}
                style={{ "--i": i } as React.CSSProperties}
              />
              {"code" in item ? (
                <>
                  <span className="text-xs font-medium text-muted tabular-nums">{specialties.scheme}</span>
                  <span className="font-semibold tracking-wide tabular-nums">{item.code}</span>
                </>
              ) : (
                <span className="rounded-md bg-surface-warm px-1.5 py-1 text-[11px] font-bold tracking-[0.12em] text-ink ring-1 ring-highlight">
                  {item.tag}
                </span>
              )}
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <span className="font-medium">{item.short}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

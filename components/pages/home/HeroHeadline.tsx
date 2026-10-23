import type * as React from "react";
import { hero } from "@/content/pages/home";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/home/hero-styles";

const FIRST_WORD = 0.4;
const WORD_GAP = 0.07;

/**
 * The blue end, lifted 22% toward white: the logo-ring blue itself is only 3.2:1 on the hero navy,
 * this is 5.0:1 (teal 5.6, orange 5.1).
 */
const BLUE = "color-mix(in oklab, var(--logo-ring-right-3) 78%, white)";

/** Colour at `t` (0–1) along the accent gradient: logo-ring blue → teal → orange. */
function gradientAt(t: number) {
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  return t <= 0.5
    ? `color-mix(in oklab, var(--logo-ring-end) ${pct(t * 2)}, ${BLUE})`
    : `color-mix(in oklab, var(--logo-ring-left-1) ${pct(t * 2 - 1)}, var(--logo-ring-end))`;
}

/**
 * Eyebrow and H1. Each word rises inside its own mask, 0.07s apart; the emphasis words
 * ("Trusted & Experienced") land last, each painted with its slice of the accent gradient,
 * and the last one gets the hand-drawn orange underline.
 */
export function HeroHeadline() {
  const words = hero.title.split(" ");
  const emphasis = hero.emphasis.split(" ");
  const from = words.findIndex((_, i) => emphasis.every((w, j) => words[i + j] === w));
  const isEmphasis = (i: number) => from >= 0 && i >= from && i < from + emphasis.length;

  // Plain words in reading order first, then the emphasis words.
  const order = [...words.keys()].sort((a, b) => Number(isEmphasis(a)) - Number(isEmphasis(b)));
  const delayOf = (i: number) => FIRST_WORD + order.indexOf(i) * WORD_GAP;

  // Each emphasis word's share of the phrase, by characters (spaces count), for its gradient slice.
  const phraseLength = hero.emphasis.length;
  const slices = emphasis.map((w, j) => {
    const start = j === 0 ? 0 : emphasis.slice(0, j).join(" ").length + 1;
    return { from: start / phraseLength, to: (start + w.length) / phraseLength };
  });

  return (
    <>
      <p
        className={cn(
          styles.step,
          styles.fadeDown,
          "inline-flex min-h-8 items-center gap-2.5 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs leading-none font-semibold tracking-[0.16em] text-accent-glow uppercase ring-1 ring-white/15",
        )}
        style={at(0.2)}
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
        {hero.eyebrow}
      </p>

      <h1
        id="hero-title"
        className="mt-5 font-display text-[2.1rem] leading-[1.06] font-bold tracking-[-0.03em] text-white md:mt-6 md:text-[clamp(2.75rem,6vw,3.5rem)] lg:text-[clamp(2.5rem,3.9vw,3.5rem)]"
      >
        {words.map((word, i) => {
          const emphasised = isEmphasis(i);
          const slice = emphasised ? slices[i - from] : null;
          const last = emphasised && i === from + emphasis.length - 1;
          return (
            <span key={i}>
              {i > 0 ? " " : null}
              <span className={styles.wordMask}>
                <span
                  className={cn(
                    styles.word,
                    styles.step,
                    styles.wordRise,
                    slice && styles.gradWord,
                    last && "relative",
                  )}
                  style={
                    {
                      "--d": `${delayOf(i).toFixed(2)}s`,
                      ...(slice ? { "--from": gradientAt(slice.from), "--to": gradientAt(slice.to) } : {}),
                    } as React.CSSProperties
                  }
                >
                  {word}
                  {last ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      className={styles.underline}
                    >
                      <path
                        d="M4 13 C 60 5, 130 3, 190 8 S 270 15, 296 6"
                        pathLength={1}
                        fill="none"
                        style={{ stroke: "var(--highlight)" }}
                        strokeWidth={3.5}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  ) : null}
                </span>
              </span>
            </span>
          );
        })}
      </h1>
    </>
  );
}

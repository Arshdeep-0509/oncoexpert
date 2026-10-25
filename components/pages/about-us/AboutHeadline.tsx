import type * as React from "react";
import { hero } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/about-us/about-styles";

const FIRST_WORD = 0.55;
const WORD_GAP = 0.12;
/** The part of the H1 set in the name gradient. */
const NAME = hero.card.name;

/** Colour at `t` (0–1) along the name gradient: --name-1 → --name-2 → --name-3 (care.css). */
function gradientAt(t: number) {
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  return t <= 0.5
    ? `color-mix(in oklab, var(--name-2) ${pct(t * 2)}, var(--name-1))`
    : `color-mix(in oklab, var(--name-3) ${pct(t * 2 - 1)}, var(--name-2))`;
}

/**
 * Eyebrow and H1. Each word rises inside its own mask, 0.12s apart; the words of his name are
 * painted with their slice of the name gradient (by characters, so the phrase reads as one
 * gradient though each word moves on its own).
 */
export function AboutHeadline() {
  const words = hero.title.split(" ");
  const nameWords = NAME.split(" ");
  const from = words.findIndex((_, i) => nameWords.every((w, j) => words[i + j] === w));
  const slices = nameWords.map((w, j) => {
    const start = j === 0 ? 0 : nameWords.slice(0, j).join(" ").length + 1;
    return { from: start / NAME.length, to: (start + w.length) / NAME.length };
  });

  return (
    <>
      <p
        className={cn(
          styles.step,
          styles.fadeDown,
          "inline-flex min-h-8 items-center gap-2.5 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs leading-none font-semibold tracking-[0.16em] text-accent-glow uppercase ring-1 ring-white/15",
        )}
        style={at(0.45)}
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-5 font-display text-[2.4rem] leading-[1.04] font-bold tracking-[-0.035em] text-white md:text-[3.5rem] lg:text-[clamp(3.25rem,5vw,4.5rem)]"
      >
        {words.map((word, i) => {
          const slice = from >= 0 && i >= from && i < from + nameWords.length ? slices[i - from] : null;
          return (
            <span key={i}>
              {i > 0 ? " " : null}
              <span className={styles.wordMask}>
                <span
                  className={cn(styles.word, styles.step, styles.wordRise, slice && styles.gradWord)}
                  style={
                    {
                      "--d": `${(FIRST_WORD + i * WORD_GAP).toFixed(2)}s`,
                      ...(slice ? { "--from": gradientAt(slice.from), "--to": gradientAt(slice.to) } : {}),
                    } as React.CSSProperties
                  }
                >
                  {word}
                </span>
              </span>
            </span>
          );
        })}
      </h1>
    </>
  );
}

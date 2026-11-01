import type * as React from "react";
import { hero } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/thyroid-cancer/hero-styles";

const FIRST_WORD = 0.25;
const WORD_GAP = 0.06;

/** Colour at `t` (0–1) along the accent gradient (periwinkle → lighter periwinkle). */
const gradientAt = (t: number) => `color-mix(in oklab, var(--accent-bright) ${Math.round(t * 100)}%, var(--accent))`;

function Word({ word, index, slice }: { word: string; index: number; slice?: { from: number; to: number } }) {
  return (
    <span className={styles.wordMask}>
      <span
        className={cn(styles.word, styles.step, styles.wordRise, slice && styles.gradWord)}
        style={
          {
            "--d": `${(FIRST_WORD + index * WORD_GAP).toFixed(2)}s`,
            ...(slice ? { "--from": gradientAt(slice.from), "--to": gradientAt(slice.to) } : {}),
          } as React.CSSProperties
        }
      >
        {word}
      </span>
    </span>
  );
}

/**
 * The live eyebrow and the H1. Each word rises in its mask; "Expert Surgical Care" carries the
 * gradient (each word its slice) and draws its underlines once the words have landed.
 */
export function HeroHeadline() {
  const words = hero.lines.join(" ").split(" ");
  const emphasis = hero.emphasis.split(" ");
  const from = words.findIndex((_, i) => emphasis.every((w, j) => words[i + j] === w));
  const length = hero.emphasis.length;
  const sliceOf = (i: number) => {
    const j = i - from;
    if (from < 0 || j < 0 || j >= emphasis.length) return undefined;
    const start = j === 0 ? 0 : emphasis.slice(0, j).join(" ").length + 1;
    return { j, from: start / length, to: (start + emphasis[j].length) / length };
  };

  return (
    <>
      <p
        className={cn(
          styles.step,
          styles.fadeDown,
          "inline-flex min-h-8 items-center gap-2 rounded-pill bg-accent-soft px-3.5 py-1.5 text-[11px] leading-tight font-semibold tracking-[0.12em] text-accent uppercase md:text-xs",
        )}
        style={at(0.05)}
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-4 font-display text-[clamp(1.95rem,8.2vw,2.4rem)] leading-[1.08] tracking-(--display-tracking) text-ink md:mt-5 md:text-[3rem] lg:text-[clamp(2.6rem,3.7vw,3.5rem)]"
      >
        {words.map((word, i) => {
          const slice = sliceOf(i);
          return (
            <span key={i}>
              {i > 0 ? " " : null}
              {slice ? (
                <span className={styles.phrase}>
                  <Word word={word} index={i} slice={slice} />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    className={styles.underline}
                    style={{ "--u": `${slice.j * 0.12}s` } as React.CSSProperties}
                  >
                    <path
                      d="M4 12 C 70 5, 150 4, 210 8 S 276 15, 296 8"
                      pathLength={1}
                      fill="none"
                      style={{ stroke: "var(--petal)" }}
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ) : (
                <Word word={word} index={i} />
              )}
            </span>
          );
        })}
      </h1>
    </>
  );
}

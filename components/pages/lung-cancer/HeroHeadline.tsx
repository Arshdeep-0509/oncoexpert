import type * as React from "react";
import { hero } from "@/content/pages/lung-cancer";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/lung-cancer/hero-styles";

const FIRST_WORD = 0.25;
const WORD_GAP = 0.05;

function Word({ word, index, emphasis = false }: { word: string; index: number; emphasis?: boolean }) {
  return (
    <span className={styles.wordMask}>
      <span
        className={cn(styles.word, styles.step, styles.wordRise, emphasis && styles.gradWord)}
        style={{ "--d": `${(FIRST_WORD + index * WORD_GAP).toFixed(2)}s` } as React.CSSProperties}
      >
        {word}
      </span>
    </span>
  );
}

/**
 * The NEW eyebrow and the H1. Each word rises in its own mask, 0.05s apart; "Breathing" is painted
 * with the accent gradient and draws an underline once the words have landed. The live heading's
 * line breaks are layout, so the words wrap freely (balanced, theme CSS).
 */
export function HeroHeadline() {
  const words = hero.lines.join(" ").split(" ");
  return (
    <>
      <p
        className={cn(
          styles.step,
          styles.fadeDown,
          "inline-flex min-h-8 items-center gap-2 rounded-pill bg-surface/80 px-3.5 py-1.5 text-[11px] leading-tight font-semibold tracking-[0.12em] text-accent uppercase ring-1 ring-line md:text-xs",
        )}
        style={at(0.05)}
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
        {hero.eyebrow}
      </p>

      <h1
        id="hero-title"
        className="mt-4 font-display text-[clamp(1.8rem,7.6vw,2.2rem)] leading-[1.08] tracking-(--display-tracking) text-ink md:mt-5 md:text-[3rem] lg:text-[clamp(2.6rem,3.6vw,3.45rem)]"
      >
        {words.map((word, i) => (
          <span key={i}>
            {i > 0 ? " " : null}
            {word === hero.emphasis ? (
              <span className={styles.phrase}>
                <Word word={word} index={i} emphasis />
                <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className={styles.underline}>
                  <path
                    d="M4 12 C 70 5, 150 4, 210 8 S 276 15, 296 8"
                    pathLength={1}
                    fill="none"
                    style={{ stroke: "var(--highlight)" }}
                    strokeOpacity={0.75}
                    strokeWidth={5}
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ) : (
              <Word word={word} index={i} />
            )}
          </span>
        ))}
      </h1>
    </>
  );
}

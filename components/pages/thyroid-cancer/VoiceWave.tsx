import { Check } from "lucide-react";

/** Class names in dashboard.css (prefix tyd-). */
const styles = {
  wave: "tyd-wave",
  check: "tyd-check",
} as const;

// Flat, then a steady wave of even peaks: the voice unchanged after surgery.
const FLAT = 64;
const PEAKS = 6;
const STEP = (200 - FLAT) / PEAKS;
const WAVE =
  `M0 20 H${FLAT} ` +
  Array.from({ length: PEAKS }, (_, i) => {
    const x = FLAT + i * STEP;
    const y = i % 2 === 0 ? 6 : 34;
    return `Q${x + STEP / 2} ${y} ${x + STEP} 20`;
  }).join(" ");

/**
 * Under the 0% gauge: a calm check in a ring, and a voice line that runs flat, then steady,
 * drawn once when the panel comes into view. Decorative.
 */
export function VoiceWave() {
  return (
    <div aria-hidden="true" className="mx-auto mt-4 flex w-full max-w-[240px] items-center gap-3">
      <span
        className={`${styles.check} grid size-9 shrink-0 place-items-center rounded-full bg-accent-glow/15 text-accent-glow ring-1 ring-accent-glow/40`}
      >
        <Check className="size-5" strokeWidth={2.5} />
      </span>
      <svg viewBox="0 0 200 40" className="h-9 w-full">
        <path
          d={WAVE}
          pathLength={1}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.wave} stroke-accent-glow`}
        />
      </svg>
    </div>
  );
}

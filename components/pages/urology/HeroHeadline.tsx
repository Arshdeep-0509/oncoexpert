import { hero } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/urology/hero-styles";

/** Splits each live line into plain and emphasis parts (the emphasis may span a line break). */
function lineParts() {
  const full = hero.lines.join(" ");
  const start = full.indexOf(hero.emphasis);
  const end = start < 0 ? -1 : start + hero.emphasis.length;
  let offset = 0;
  return hero.lines.map((line) => {
    const from = offset;
    offset += line.length + 1;
    if (start < 0 || end <= from || start >= from + line.length) return [{ text: line, accent: false }];
    const a = Math.max(start, from) - from;
    const b = Math.min(end, from + line.length) - from;
    return [
      { text: line.slice(0, a), accent: false },
      { text: line.slice(a, b), accent: true },
      { text: line.slice(b), accent: false },
    ].filter((p) => p.text);
  });
}

/**
 * The live eyebrow (a pill with the live dot) and the page's one H1, on its live lines, with
 * "Precision & Compassion" in the accent where the live page colours it. Each line rises in turn.
 */
export function HeroHeadline() {
  return (
    <>
      <p
        className={cn(
          styles.step,
          styles.fadeDown,
          "inline-flex min-h-8 items-center gap-2 rounded-pill bg-surface px-3.5 py-1.5 text-[11px] leading-tight font-semibold tracking-[0.12em] text-accent uppercase ring-1 shadow-soft-sm ring-line md:text-xs",
        )}
        style={at(0.05)}
      >
        <span aria-hidden="true" className={cn(styles.live, "size-1.5 shrink-0 rounded-full bg-highlight")} />
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-5 font-display text-[clamp(2.05rem,9vw,2.6rem)] leading-[1.06] font-(--display-weight) tracking-(--display-tracking) text-ink md:mt-6 md:text-[3.4rem] lg:text-[clamp(2.9rem,4.1vw,4rem)]"
      >
        {lineParts().map((parts, i) => (
          <span key={i} className={cn(styles.step, styles.fadeUp, "block")} style={at(0.2 + i * 0.12)}>
            {parts.map((p, j) =>
              p.accent ? (
                <span key={j} className="text-accent">
                  {p.text}
                </span>
              ) : (
                <span key={j}>{p.text}</span>
              ),
            )}
          </span>
        ))}
      </h1>
    </>
  );
}

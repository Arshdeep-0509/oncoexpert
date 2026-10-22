import type { SectionTone } from "@/content/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";

const darkTones: readonly SectionTone[] = ["plum", "ink", "black"];

type SectionPlaceholderProps = {
  id: string;
  tone: SectionTone;
  /** Position on the page (the hero is 1). */
  index: number;
  /** The section's heading from content/pages/home.ts (one string per line). */
  title: string | readonly string[];
};

/**
 * Skeleton band for a Home section that is not built yet: its number and anchor, its real
 * heading and an empty frame, in the tone the finished section will use.
 */
export function SectionPlaceholder({ id, tone, index, title }: SectionPlaceholderProps) {
  const onDark = darkTones.includes(tone);
  const lines = typeof title === "string" ? [title] : title;

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <p
        className={cn(
          "text-[13px] font-semibold tracking-[0.08em] tabular-nums",
          onDark ? "text-accent-glow" : "text-accent",
        )}
      >
        {String(index).padStart(2, "0")} · #{id}
      </p>
      <h2 id={`${id}-title`} className={cn("mt-3 max-w-3xl heading-2", onDark ? "text-white" : "text-ink")}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <div
        aria-hidden="true"
        className={cn(
          "mt-10 h-44 rounded-xl border border-dashed md:h-60",
          onDark ? "border-white/20 bg-white/[0.03]" : "border-line bg-surface/60",
        )}
      />
    </Section>
  );
}

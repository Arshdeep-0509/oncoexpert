import * as React from "react";
import { cn } from "@/lib/utils";
import type { SectionTone } from "@/content/types";
import { Section } from "@/components/ui/Section";

type PlaceholderBlock = {
  /** Optional anchor inside the section, e.g. "appointment" for the booking hero's form. */
  id?: string;
  /** What will go here: a heading or label from the page's content file. */
  label: string;
  /** Wider block: spans two columns from md. */
  wide?: boolean;
};

type SectionPlaceholderProps = {
  /** The section's final, stable anchor id. */
  id: string;
  tone?: SectionTone;
  /** The section's heading from the page's content file. */
  title: string;
  /** "h1" for the hero, "h2" (default) for every other band. */
  as?: "h1" | "h2";
  /** Rough layout of the finished section. */
  blocks?: readonly PlaceholderBlock[];
  /** Taller band for the hero. */
  hero?: boolean;
  className?: string;
};

/**
 * A page section during the foundation step: its final id, tone and heading, and dashed blocks
 * that sketch its layout. Static (no animation), so it never waits for the intro. Each one is
 * replaced by the real section as the page is built.
 */
export function SectionPlaceholder({
  id,
  tone = "surface",
  title,
  as: Heading = "h2",
  blocks = [],
  hero = false,
  className,
}: SectionPlaceholderProps) {
  const onDark = tone === "plum" || tone === "ink" || tone === "black";
  const frame = onDark ? "border-white/30" : "border-line";
  return (
    <Section
      id={id}
      tone={tone}
      className={cn(hero && "flex min-h-[80svh] items-center pt-[calc(var(--header-h)+48px)]", className)}
    >
      <p
        className={cn(
          "inline-flex rounded-pill px-3 py-1 font-mono text-sm",
          onDark ? "bg-white/10 text-white" : "bg-accent-soft text-accent",
        )}
      >
        #{id}
      </p>
      <Heading className={cn("mt-4 measure", hero ? "heading-1" : "heading-2", onDark ? "text-white" : "text-ink")}>
        {title}
      </Heading>
      {blocks.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.label}
              id={block.id}
              className={cn(
                "flex min-h-28 items-center rounded-lg border-2 border-dashed p-5",
                frame,
                block.wide && "md:col-span-2",
              )}
            >
              <p className={onDark ? "text-white/80" : "text-muted"}>{block.label}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Section>
  );
}

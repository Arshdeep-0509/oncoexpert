import * as React from "react";
import { cn } from "@/lib/utils";
import type { SectionLook } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /**
   * ONE word (or short phrase) of a string `title` to emphasise: set in the serif italic
   * in the accent colour. Must appear in `title` exactly; otherwise the title renders plain.
   */
  emphasis?: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** "soft" (default): pill eyebrow, heading-* scale. "classic": text eyebrow, type-* scale. */
  variant?: SectionLook;
  /** Heading level. Default h2. */
  as?: HeadingLevel;
  /** id on the heading, for aria-labelledby on the section. */
  id?: string;
  className?: string;
};

const styles = {
  soft: {
    wrapper: "flex flex-col",
    alignCenter: "mx-auto items-center text-center",
    alignLeft: "items-start",
    eyebrow: "mb-4 md:mb-5",
    heading: { h1: "heading-1", h2: "heading-2", h3: "heading-3" },
    intro: "measure mt-4 text-base md:mt-5 md:text-lg",
    introOnDark: "text-white/75",
  },
  classic: {
    wrapper: "",
    alignCenter: "mx-auto text-center",
    alignLeft: "",
    eyebrow: "mb-4",
    heading: { h1: "type-h1", h2: "type-h2", h3: "type-h3" },
    intro: "type-body mt-5",
    introOnDark: "text-white/70",
  },
} as const satisfies Record<SectionLook, unknown>;

function renderTitle(title: React.ReactNode, emphasis: string | undefined, onDark: boolean) {
  if (!emphasis || typeof title !== "string") return title;
  const at = title.indexOf(emphasis);
  if (at === -1) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`SectionHeading: emphasis "${emphasis}" not found in "${title}"`);
    }
    return title;
  }
  return (
    <>
      {title.slice(0, at)}
      <em className={cn("font-serif font-normal italic", onDark ? "text-accent-glow" : "text-accent")}>{emphasis}</em>
      {title.slice(at + emphasis.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  intro,
  align = "left",
  onDark = false,
  variant = "soft",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const s = styles[variant];
  return (
    <div className={cn(s.wrapper, "max-w-3xl", align === "center" ? s.alignCenter : s.alignLeft, className)}>
      {eyebrow ? (
        <Eyebrow variant={variant} onDark={onDark} className={s.eyebrow}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading id={id} className={cn(s.heading[Heading], onDark ? "text-white" : "text-ink")}>
        {renderTitle(title, emphasis, onDark)}
      </Heading>
      {intro ? <p className={cn(s.intro, onDark ? s.introOnDark : "text-muted")}>{intro}</p> : null}
    </div>
  );
}

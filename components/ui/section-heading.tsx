import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /**
   * ONE word (or short phrase) of `title` to emphasise: set in Fraunces italic in the
   * accent colour. Must appear in `title` exactly; otherwise the title renders plain.
   */
  emphasis?: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** Heading level. Default h2. */
  as?: "h1" | "h2" | "h3";
  /** id on the heading, for aria-labelledby on the section. */
  id?: string;
  className?: string;
};

function renderTitle(title: string, emphasis: string | undefined, onDark: boolean) {
  if (!emphasis) return title;
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
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-3xl flex-col", align === "center" ? "mx-auto items-center text-center" : "items-start", className)}>
      {eyebrow ? (
        <Eyebrow onDark={onDark} className="mb-4 md:mb-5">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        id={id}
        className={cn(
          Heading === "h1" ? "heading-1" : Heading === "h2" ? "heading-2" : "heading-3",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {renderTitle(title, emphasis, onDark)}
      </Heading>
      {intro ? (
        <p className={cn("measure mt-4 text-base md:mt-5 md:text-lg", onDark ? "text-white/75" : "text-muted")}>{intro}</p>
      ) : null}
    </div>
  );
}

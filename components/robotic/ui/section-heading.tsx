import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/robotic/ui/eyebrow";

type SectionHeadingProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** Heading level. Default h2. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow onDark={onDark} className="mb-4">{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          Heading === "h1" ? "type-h1" : Heading === "h2" ? "type-h2" : "type-h3",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className={cn("type-body mt-5", onDark ? "text-white/70" : "text-muted")}>{intro}</p>
      ) : null}
    </div>
  );
}

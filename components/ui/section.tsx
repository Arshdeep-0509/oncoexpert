import * as React from "react";
import { cn } from "@/lib/utils";
import type { SectionTone } from "@/content/types";
import { Container } from "@/components/ui/container";

const toneClasses: Record<SectionTone, string> = {
  surface: "bg-surface text-text",
  alt: "bg-surface-alt text-text",
  warm: "bg-surface-warm text-text",
  plum: "on-dark bg-ink bg-(image:--grad-plum) text-white",
};

type SectionProps = Omit<React.ComponentProps<"section">, "id"> & {
  /** Anchor id, e.g. "overview" → #overview. */
  id: string;
  tone?: SectionTone;
  /** Wrap children in <Container>. Default true. */
  contained?: boolean;
  /** Remove the default vertical padding (var(--section-y)). */
  flush?: boolean;
};

/** Page band. Vertical padding is the theme's --section-y (64–128px, fluid). */
export function Section({
  id,
  tone = "surface",
  contained = true,
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative isolate",
        toneClasses[tone],
        !flush && "py-(--section-y)",
        className,
      )}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

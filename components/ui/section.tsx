import * as React from "react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/content/robotic-surgery";
import { Container } from "@/components/ui/container";

const toneClasses: Record<Tone, string> = {
  black: "bg-black text-white",
  ink: "bg-ink text-white",
  surface: "bg-surface text-text",
  white: "bg-white text-text",
};

type SectionProps = React.ComponentProps<"section"> & {
  tone?: Tone;
  /** Wrap children in <Container>. Default true. */
  contained?: boolean;
  /** Remove the default 72px / 120px vertical padding. */
  flush?: boolean;
};

/** Page band. 72px vertical padding on mobile, 120px on desktop. */
export function Section({
  tone = "white",
  contained = true,
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("relative isolate", toneClasses[tone], !flush && "py-[72px] lg:py-[120px]", className)}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

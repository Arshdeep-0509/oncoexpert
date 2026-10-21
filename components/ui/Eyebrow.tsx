import * as React from "react";
import { Ribbon } from "lucide-react";
import type { SectionLook } from "@/content/types";
import { cn } from "@/lib/utils";

type EyebrowProps = React.ComponentProps<"p"> & {
  /** "soft" (default): tinted pill with a ribbon icon. "classic": the label text alone. */
  variant?: SectionLook;
  /** On dark bands: glow text (and a translucent white pill). */
  onDark?: boolean;
  /** Hide the small ribbon icon (soft only). */
  noIcon?: boolean;
};

/** Small uppercase label above a heading. */
export function Eyebrow({
  variant = "soft",
  onDark = false,
  noIcon = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  if (variant === "classic") {
    return (
      <p className={cn("type-eyebrow", onDark ? "text-accent-glow" : "text-accent", className)} {...props}>
        {children}
      </p>
    );
  }
  return (
    <p
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 rounded-pill px-3 py-1 text-xs leading-none font-semibold tracking-[0.16em] uppercase",
        onDark ? "bg-white/10 text-accent-glow ring-1 ring-white/15" : "bg-accent-soft text-accent",
        className,
      )}
      {...props}
    >
      {noIcon ? null : <Ribbon className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}

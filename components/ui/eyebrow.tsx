import * as React from "react";
import { Ribbon } from "lucide-react";
import { cn } from "@/lib/utils";

type EyebrowProps = React.ComponentProps<"p"> & {
  /** On dark (plum) bands: translucent white pill, glow text. */
  onDark?: boolean;
  /** Hide the small ribbon icon. */
  noIcon?: boolean;
};

/** Small pill above a heading: 12px uppercase, wide tracking, tiny ribbon icon. */
export function Eyebrow({ onDark = false, noIcon = false, className, children, ...props }: EyebrowProps) {
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

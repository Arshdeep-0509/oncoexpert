import * as React from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = React.ComponentProps<"p"> & {
  /** On dark backgrounds the eyebrow uses the glow accent instead of primary. */
  onDark?: boolean;
};

export function Eyebrow({ onDark = false, className, ...props }: EyebrowProps) {
  return <p className={cn("type-eyebrow", onDark ? "text-glow" : "text-primary", className)} {...props} />;
}

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 1240px content width plus side gutters. The gutter is the theme's --gutter:
 * 20px on mobile, 32px from md (the robotic theme switches at lg).
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[calc(1240px+2*var(--gutter))] px-(--gutter)", className)} {...props} />
  );
}

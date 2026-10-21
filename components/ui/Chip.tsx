import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipProps = React.ComponentProps<"span"> & {
  variant?: "soft" | "outline" | "onDark";
  icon?: LucideIcon;
};

const variants = {
  soft: "bg-accent-soft text-accent",
  outline: "border border-line bg-surface text-ink",
  onDark: "bg-white/10 text-white ring-1 ring-white/15",
} as const;

/** Small label pill: tags, facts, "Covered by insurance" … */
export function Chip({ variant = "soft", icon: Icon, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-pill px-3 py-1 text-sm leading-tight font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

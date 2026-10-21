import { cn } from "@/lib/utils";

/** Small dot marking the current page's nav item. */
export function ActiveDot({ onDark }: { onDark: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-1.5 shrink-0 rounded-full transition-colors duration-300",
        onDark ? "bg-accent-glow" : "bg-accent",
      )}
    />
  );
}

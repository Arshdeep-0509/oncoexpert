import { cn } from "@/lib/utils";

/** Desktop nav link: 2px underline grows from the centre; it stays on the active / open item. */
export function navLinkClass(onDark: boolean) {
  return cn(
    "relative inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[15px] font-medium transition-colors duration-300",
    "after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:transition-transform after:duration-500 after:ease-out-expo",
    "hover:after:scale-x-100 data-[active=true]:after:scale-x-100 data-[state=open]:after:scale-x-100",
    onDark
      ? "text-white/80 hover:text-white data-[active=true]:text-white after:bg-accent-glow"
      : "text-ink/75 hover:text-ink data-[active=true]:text-ink after:bg-accent",
  );
}

export function ActiveDot({ onDark }: { onDark: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-1.5 shrink-0 rounded-full transition-colors duration-300", onDark ? "bg-accent-glow" : "bg-accent")}
    />
  );
}

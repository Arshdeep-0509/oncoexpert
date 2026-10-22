import { surgeon } from "@/content/pages/home";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";

/**
 * Full-width stats band under the surgeon: a thin accent-gradient rule, then four large numbers
 * (4 across on desktop, 2×2 on phones) that count up once when scrolled into view.
 */
export function SurgeonStats() {
  return (
    <div className="mt-16 md:mt-20">
      <div aria-hidden="true" className="h-px w-full bg-(image:--grad-accent)" />
      <ul aria-label={surgeon.a11y.stats} className="grid grid-cols-2 lg:grid-cols-4">
        {surgeon.stats.map((stat, i) => (
          <li
            key={stat.label}
            className={cn(
              "flex flex-col px-4 py-7 md:px-6 md:py-9 lg:py-10",
              i % 2 === 1 && "border-l border-line",
              i >= 2 && "max-lg:border-t max-lg:border-line",
              i === 2 && "lg:border-l lg:border-line",
              // Cells on the left edge line up with the rule and the content above
              i === 0 && "pl-0 md:pl-0",
              i === 2 && "max-lg:pl-0",
            )}
          >
            <span className="font-display text-[clamp(2.25rem,6vw,3.5rem)] leading-none font-bold tracking-[-0.03em] text-ink">
              <Counter value={stat.value} suffix={stat.suffix} reserveWidth />
            </span>
            <span className="mt-3 text-[11px] leading-snug font-semibold tracking-[0.16em] text-muted uppercase md:text-xs">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="h-px w-full bg-line" />
    </div>
  );
}

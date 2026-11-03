import { Lightbulb } from "lucide-react";
import { diagnosis } from "@/content/pages/lung-cancer";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";

/**
 * The "Did you know?" band: a lightbulb badge, the live sentence verbatim, and under it a plain
 * scale of the four stages, Stage I marked "Found early" and the bar fading towards Stage IV
 * (no figures: it only shows what the sentence says). The bar fills once the band is on screen
 * (diagnosis.css).
 */
export function DidYouKnow() {
  const { lead, body, stages, early, late } = diagnosis.callout;
  return (
    <InView
      threshold={0.5}
      className="lud-band mt-12 grid gap-5 rounded-xl bg-surface p-6 ring-1 shadow-soft ring-line md:mt-16 md:grid-cols-[auto_1fr] md:gap-8 md:p-9"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent md:size-16">
        <Lightbulb className="size-7 md:size-8" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold tracking-[0.12em] text-accent uppercase">{lead}</p>
        <p className="mt-2 measure font-display text-xl leading-snug text-ink md:text-2xl">{body}</p>

        <div aria-hidden="true" className="mt-6 max-w-xl">
          <div className="relative h-2.5 overflow-hidden rounded-full bg-line">
            <span className="lud-fill absolute inset-0 rounded-full bg-[linear-gradient(90deg,var(--accent),color-mix(in_srgb,var(--accent)_15%,transparent))]" />
          </div>
          <ol className="mt-3 grid grid-cols-4 text-sm">
            {stages.map((stage, i) => (
              <li
                key={stage}
                className={cn(
                  "flex flex-col gap-1",
                  i === 0 ? "font-bold text-ink" : "text-muted",
                  i === stages.length - 1 && "items-end text-right",
                )}
              >
                {stage}
                {i === 0 ? <span className="text-xs font-semibold text-accent">{early}</span> : null}
                {i === stages.length - 1 ? <span className="text-xs">{late}</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </InView>
  );
}

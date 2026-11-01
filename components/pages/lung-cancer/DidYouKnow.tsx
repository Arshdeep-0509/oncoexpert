import { diagnosis } from "@/content/pages/lung-cancer";
import { InView } from "@/components/ui/InView";

/**
 * The "Did you know?" band: the live sentence verbatim beside a large "I" (the stage it names, not
 * a statistic), and a line under it that fills once the band is on screen (diagnosis.css).
 */
export function DidYouKnow() {
  const { lead, body, figure } = diagnosis.callout;
  return (
    <InView
      threshold={0.5}
      className="lud-band mt-12 grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl bg-surface p-6 ring-1 shadow-soft ring-line md:mt-16 md:gap-8 md:p-9"
    >
      <span
        aria-hidden="true"
        className="lud-figure font-display text-[5.5rem] leading-none font-semibold md:text-[7.5rem]"
      >
        {figure}
      </span>
      <div className="min-w-0">
        <p className="measure text-lg leading-relaxed text-text md:text-xl">
          <strong className="font-semibold text-ink">{lead}</strong> {body}
        </p>
        <span aria-hidden="true" className="mt-5 block h-1 overflow-hidden rounded-full bg-line">
          <span className="lud-fill block h-full w-full rounded-full bg-(image:--grad-accent)" />
        </span>
      </div>
    </InView>
  );
}

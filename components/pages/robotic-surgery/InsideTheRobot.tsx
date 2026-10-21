import { insideTheRobot } from "@/content/pages/robotic-surgery";
import { PinnedShowcase } from "@/components/pages/robotic-surgery/inside-the-robot/PinnedShowcase";
import { CompactPinnedShowcase } from "@/components/pages/robotic-surgery/inside-the-robot/CompactPinnedShowcase";
import { StepList } from "@/components/pages/robotic-surgery/inside-the-robot/StepList";

/**
 * Scroll-driven tour of the machine: side-by-side pinned on desktop, stacked pinned
 * on phones/tablets, and a plain card list with prefers-reduced-motion (pure CSS switch).
 */
export function InsideTheRobot() {
  return (
    <section
      id="inside-the-robot"
      data-tone="black"
      aria-label={insideTheRobot.eyebrow}
      className="relative bg-black text-white"
    >
      <div className="hidden lg:motion-safe:block">
        <PinnedShowcase />
      </div>
      <div className="hidden motion-safe:max-lg:block">
        <CompactPinnedShowcase />
      </div>
      <div className="hidden motion-reduce:block">
        <StepList />
      </div>
    </section>
  );
}

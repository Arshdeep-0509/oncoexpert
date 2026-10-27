import { recoveryPath } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { keepLastWords } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PathTimeline } from "@/components/pages/colorectal-cancer/PathTimeline";
import "@/components/pages/colorectal-cancer/path.css";

const steps = recoveryPath.steps.map((step) => {
  const img = colorectalImages[step.image];
  return {
    icon: step.icon,
    title: step.title,
    body: step.body,
    image: { src: img.src, alt: img.alt, focal: img.focal },
  };
});

/**
 * 3 · #path "Your Path to Recovery": the six steps from diagnosis to long-term health.
 * Desktop: pinned for 2 screens; the road draws, milestones light up, each card rises and the
 * step's photo crossfades. Tablets: a swipe row with a progress bar. Phones: a vertical timeline.
 * Milestone buttons jump to each step (keyboard too). Layouts: path.css; behaviour: PathTimeline.
 */
export function RecoveryPath() {
  return (
    <section id="path" aria-labelledby="path-title" className="relative bg-surface">
      <PathTimeline
        heading={
          <SectionHeading
            id="path-title"
            title={keepLastWords(recoveryPath.title)}
            emphasis={recoveryPath.emphasis}
            intro={recoveryPath.intro}
          />
        }
        steps={steps}
        labels={recoveryPath.a11y}
      />
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { treatments } from "@/content/pages/stomach-cancer";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModalityExplorer } from "@/components/pages/stomach-cancer/ModalityExplorer";
import "@/components/pages/stomach-cancer/modalities.css";

/**
 * 4 · #modalities "Comprehensive Treatment Modalites" (warm: periwinkle mist; "Modalites" as live).
 * The heading on its live lines, the intro and "Explore All Procedures" (→ the robotic page's
 * techniques, PENDING DOCTOR), then the ModalityExplorer island: the care pathway rail (NEW labels,
 * PENDING DOCTOR) above the four cards, kept in step.
 */
export function Modalities() {
  return (
    <Section id="modalities" tone="warm" aria-labelledby="modalities-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="modalities-title"
          title={treatments.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          intro={treatments.intro}
        />
        <Button
          href={treatments.link.href}
          variant="secondary"
          icon={ArrowRight}
          cta={treatments.link.cta}
          fullWidthOnMobile
          className="shrink-0 bg-surface"
        >
          {treatments.link.label}
        </Button>
      </div>
      <div className="mt-10 md:mt-14">
        <ModalityExplorer content={treatments} />
      </div>
    </Section>
  );
}

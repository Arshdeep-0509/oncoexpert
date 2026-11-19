import type * as React from "react";
import { ArrowRight } from "lucide-react";
import { treatments, type ModalityKey } from "@/content/pages/stomach-cancer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModalityCard } from "@/components/pages/stomach-cancer/ModalityCard";
import "@/components/pages/stomach-cancer/modalities.css";

const itemOf = (key: ModalityKey) => treatments.items.find((i) => i.key === key)!;
const { journey } = treatments;
type Phase = (typeof journey.phases)[number];
const rolesOf = (phase: Phase): Partial<Record<ModalityKey, string>> => ("roles" in phase ? phase.roles : {});

/** A phase's numbered node (it sits on the journey line). */
function Node({ step, className }: { step?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "gastro-m-node relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-display text-lg font-(--display-weight) tabular-nums",
        step ? "bg-accent text-white" : "bg-highlight/30 text-ink",
        className,
      )}
    >
      {step ?? "+"}
    </span>
  );
}

/** A phase's label and its one-line note. */
function PhaseText({ label, note }: { label: string; note: string }) {
  return (
    <div>
      <p className="text-sm font-bold tracking-[0.12em] text-accent-hover uppercase">{label}</p>
      <p className="mt-1 text-base font-medium text-ink md:text-lg">{note}</p>
    </div>
  );
}

/**
 * 4 · #modalities "Comprehensive Treatment Modalites" (warm: periwinkle mist; "Modalites" as live).
 * The heading on its live lines, the intro and "Explore All Procedures" (→ the robotic page's
 * techniques, PENDING DOCTOR), then the four treatments as a journey in the order care usually
 * follows: 1 Before surgery (FLOT), 2 Surgery (D2 Gastrectomy, the operation; Robotic Surgery, the
 * technique), 3 After surgery (FLOT again, in short), and a separate branch for advanced disease
 * (Immunotherapy). Desktop: three columns joined by a line that draws in on view, the branch under
 * step 3; phones and tablets: a vertical timeline, the branch last. Server-rendered; no client code.
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

      <InView threshold={0.15} className="gastro-m-journey relative mt-10 md:mt-14">
        <p className="sr-only">{journey.label}</p>
        {/* The line joining the phases (vertical on phones and tablets, horizontal on desktop) */}
        <span aria-hidden="true" className="gastro-m-line" />

        <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6">
          {journey.phases.map((phase, p) => (
            <li
              key={phase.key}
              className={cn("gastro-m-phase relative pl-16 lg:pl-0", p < 2 && "lg:row-span-2")}
              style={{ "--p": p } as React.CSSProperties}
            >
              <Node step={phase.step} className="absolute top-0 left-0 lg:static" />
              <div className="pt-1 lg:mt-4 lg:pt-0">
                <PhaseText label={phase.label} note={phase.note} />
              </div>
              <div className="mt-4 lg:mt-6">
                <div className="grid gap-4">
                  {phase.cards.map((key) => (
                    <ModalityCard
                      key={key}
                      item={itemOf(key)}
                      role={rolesOf(phase)[key]}
                      compact={"reminder" in phase && phase.reminder}
                      note={"reminder" in phase && phase.reminder ? phase.note : undefined}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
          {/* Advanced disease: its own branch (desktop: under step 3; phones: the last stop) */}
          <li
            className="gastro-m-phase relative pl-16 lg:col-start-3 lg:mt-4 lg:pl-0"
            style={{ "--p": 3 } as React.CSSProperties}
          >
            <Node className="absolute top-0 left-0 lg:static" />
            <div className="pt-1 lg:mt-4 lg:pt-0">
              <PhaseText label={journey.advanced.label} note={journey.advanced.note} />
            </div>
            <div className="mt-4 lg:mt-6">
              {journey.advanced.cards.map((key) => (
                <ModalityCard key={key} item={itemOf(key)} className="ring-highlight/60" />
              ))}
            </div>
          </li>
        </ol>
      </InView>
    </Section>
  );
}

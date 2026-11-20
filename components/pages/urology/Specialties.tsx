import { specialties } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialtyDashboard } from "@/components/pages/urology/SpecialtyDashboard";
import "@/components/pages/urology/specialties.css";

/**
 * 2 · #specialties "Oncological Specialties". The live "CLINICAL DASHBOARD V2.0" label heads a real
 * dashboard (the SpecialtyDashboard island): the map, the pins and the six cards.
 */
export function Specialties() {
  return (
    <Section id="specialties" tone="surface" aria-labelledby="specialties-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="specialties-title" title={specialties.title} intro={specialties.intro} />
        <p className="inline-flex min-h-9 shrink-0 items-center gap-2.5 self-start rounded-lg bg-ink px-3.5 text-[11px] font-semibold tracking-[0.16em] text-white tabular-nums md:self-end md:text-xs">
          <span aria-hidden="true" className={cn("size-2 rounded-full bg-highlight")} />
          {specialties.badge}
        </p>
      </div>
      <div className="mt-8 md:mt-12">
        <SpecialtyDashboard content={specialties} />
      </div>
    </Section>
  );
}

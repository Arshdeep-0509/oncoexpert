import { modalities } from "@/content/pages/thyroid-cancer";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModalityCard } from "@/components/pages/thyroid-cancer/ModalityCard";
import { ModalityFilter } from "@/components/pages/thyroid-cancer/ModalityFilter";
import "@/components/pages/thyroid-cancer/modalities.css";

/** The wide bento tiles on desktop. */
const WIDE = new Set(["Thyroidectomy", "Expert Surgery"]);

const treatments = modalities.items.map((m) => ({ ...m, group: "treatments" as const }));
const why = modalities.strengths.map((m) => ({ ...m, group: "why" as const }));

/**
 * 5 · #modalities "Specialized Treatment Modalities": the eight live cards with a filter. Desktop: a
 * five-column bento (Thyroidectomy and Expert Surgery wide). Tablets: two columns. Phones: a
 * two-column grid per group under its NEW label (no sideways scrolling). "Affordable Treatment" links to #packages and "Expert
 * Surgery"'s nerve monitors to #dashboard (their own words become the links).
 */
export function Modalities() {
  return (
    <section id="modalities" aria-labelledby="modalities-title" className="bg-surface-warm py-(--section-y)">
      <Container>
        <SectionHeading id="modalities-title" title={modalities.title} />
        <div className="mt-8">
          <ModalityFilter labels={modalities.filters} groupLabel={modalities.a11y.filter}>
            <InView threshold={0.2} className="tym-reveal">
              {/* Tablet and desktop */}
              <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-5">
                {[...treatments, ...why].map((m) => (
                  <ModalityCard key={m.title} {...m} className={WIDE.has(m.title) ? "lg:col-span-2" : undefined} />
                ))}
              </div>
              {/* Phones: a two-column grid per group (one column under 360px) */}
              <div className="grid gap-8 md:hidden">
                {[
                  { key: "treatments", label: modalities.filters.treatments, cards: treatments },
                  { key: "why", label: modalities.filters.why, cards: why },
                ].map((group) => (
                  <div key={group.key} data-group={group.key}>
                    <h3 className="mb-3 text-sm font-bold tracking-[0.12em] text-accent uppercase">{group.label}</h3>
                    <div className="grid gap-3 min-[360px]:grid-cols-2">
                      {group.cards.map((m) => (
                        <ModalityCard key={m.title} {...m} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </InView>
          </ModalityFilter>
        </div>
      </Container>
    </section>
  );
}

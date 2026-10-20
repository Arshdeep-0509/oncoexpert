import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { locationsSection as copy } from "@/content/shared/sections";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwipeRow } from "@/components/ui/swipe-row";
import { Reveal } from "@/components/ui/reveal";

/** #locations: the clinics from content/site.ts. Desktop: 3 cards. Phones: a swipe row. */
export function Locations({ id = "locations", tone = "surface" }: { id?: string; tone?: SectionTone }) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeading id={`${id}-title`} title={copy.heading} intro={copy.intro} />
      </Reveal>

      <Reveal className="mt-10 md:mt-12" delay={0.05}>
        <SwipeRow label={copy.a11y.list} gridClassName="md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((loc) => (
            <article
              key={loc.name}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-soft-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                {loc.image ? (
                  <Image
                    src={loc.image.src}
                    alt={copy.imageAlt(loc.name, loc.area)}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 82vw"
                    className="object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.05]"
                  />
                ) : (
                  // Placeholder until a photo of this clinic is added (content/site.ts → locations).
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink bg-(image:--grad-plum)">
                    <MapPin className="size-10 text-accent-glow/80" strokeWidth={1.75} />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.35rem] leading-snug text-ink">{loc.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-muted">
                  <MapPin className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  {loc.area}
                </p>
                <a
                  href={loc.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-auto inline-flex min-h-12 items-center gap-1.5 self-start pt-5 font-semibold text-accent hover:text-accent-hover"
                >
                  {copy.mapLabel}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    {" "}
                    {loc.name} {site.a11y.newTab}
                  </span>
                </a>
              </div>
            </article>
          ))}
        </SwipeRow>
      </Reveal>
    </Section>
  );
}

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { SectionLook, SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { locationsSection as copy } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { Reveal } from "@/components/ui/Reveal";

const looks = {
  soft: {
    card: "rounded-lg border border-line bg-surface shadow-soft-sm",
    sizes: "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 82vw",
    zoom: "motion-safe:group-hover:scale-[1.05]",
    placeholder: "bg-ink bg-(image:--grad-plum)",
    name: "font-display text-[1.35rem] leading-snug",
    link: "mt-auto min-h-12 pt-5",
  },
  classic: {
    card: "rounded-[22px] border border-border bg-white shadow-card",
    sizes: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
    zoom: "motion-safe:group-hover:scale-[1.06]",
    placeholder: "bg-linear-to-br from-ink to-teal",
    name: "type-h3",
    link: "mt-6 min-h-11",
  },
} as const satisfies Record<SectionLook, Record<string, string>>;

type LocationsProps = { id?: string; tone?: SectionTone; look?: SectionLook };

/**
 * #locations: the clinics from content/site.ts.
 * soft: 3 cards on desktop, a swipe row on phones. classic: a staggered 1/2/3-column grid.
 */
export function Locations({ id = "locations", tone = "surface", look = "soft" }: LocationsProps) {
  const s = looks[look];
  const cards = copy.items.map((loc) => (
    <article key={loc.name} className={cn("group flex h-full flex-col overflow-hidden", s.card)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {loc.image ? (
          <Image
            src={loc.image.src}
            alt={copy.imageAlt(loc.name, loc.area)}
            fill
            sizes={s.sizes}
            className={cn("object-cover transition-transform duration-700 ease-out-expo", s.zoom)}
          />
        ) : (
          // Placeholder until a photo of this clinic is added (content/site.ts → locations).
          <div aria-hidden="true" className={cn("absolute inset-0 grid place-items-center", s.placeholder)}>
            <MapPin className="size-10 text-accent-glow/80" strokeWidth={1.75} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={cn("text-ink", s.name)}>{loc.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-muted">
          <MapPin className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
          {loc.area}
        </p>
        <a
          href={loc.mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group/link inline-flex items-center gap-1.5 self-start font-semibold text-accent hover:text-accent-hover",
            s.link,
          )}
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
  ));

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeading id={`${id}-title`} variant={look} title={copy.heading} intro={copy.intro} />
      </Reveal>

      {look === "classic" ? (
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards}
        </Reveal>
      ) : (
        <Reveal className="mt-10 md:mt-12" delay={0.05}>
          <SwipeRow label={copy.a11y.list} gridClassName="md:grid-cols-2 lg:grid-cols-3">
            {cards}
          </SwipeRow>
        </Reveal>
      )}
    </Section>
  );
}

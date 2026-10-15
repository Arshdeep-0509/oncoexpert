import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { locations } from "@/content/robotic-surgery";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Locations() {
  return (
    <Section id="locations" tone="surface">
      <Reveal>
        <SectionHeading title={locations.heading} intro={locations.intro} />
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.items.map((loc) => (
          <article key={loc.name} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-white shadow-card">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              {loc.image ? (
                <Image
                  src={loc.image.src}
                  alt={locations.imageAlt(loc.name, loc.area)}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.06]"
                />
              ) : (
                // Placeholder until a photo of this clinic is added (see content/robotic-surgery.ts).
                <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-ink to-teal">
                  <MapPin className="size-10 text-glow/80" strokeWidth={1.75} aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="type-h3 text-ink">{loc.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-muted">
                <MapPin className="size-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
                {loc.area}
              </p>
              <a
                href={loc.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-6 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-primary hover:text-primary-hover"
              >
                {locations.mapLabel}
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
      </Reveal>
    </Section>
  );
}

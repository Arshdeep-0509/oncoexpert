import { understanding } from "@/content/pages/stomach-cancer";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StomachWall } from "@/components/pages/stomach-cancer/StomachWall";
import "@/components/pages/stomach-cancer/understanding.css";

/**
 * 2 · #understanding "Understanding Stomach (Gastric) Cancer" (surface). Desktop: the heading, both
 * live paragraphs and the two word tiles ("Early", "Multi") left; the stomach wall right. Tablets and
 * phones: text, tiles, then the wall.
 */
export function Understanding() {
  return (
    <Section id="understanding" tone="surface" aria-labelledby="understanding-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            id="understanding-title"
            title={understanding.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          />
          <div className="mt-5 grid gap-4 md:mt-6">
            {understanding.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="measure text-base leading-relaxed text-muted md:text-lg">
                {p}
              </p>
            ))}
          </div>
          <Reveal stagger className="mt-8 grid grid-cols-2 gap-3 md:gap-4" itemClassName="h-full">
            {understanding.tiles.map((t) => (
              <div key={t.key} className="h-full rounded-2xl bg-surface-warm p-4 ring-1 ring-line md:p-6">
                <p className="font-serif text-3xl leading-none text-accent italic md:text-4xl">{t.title}</p>
                <p className="mt-2 text-sm leading-snug font-medium text-ink md:text-base">{t.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <StomachWall />
        </div>
      </div>
    </Section>
  );
}

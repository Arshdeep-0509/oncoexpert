import Image from "next/image";
import { overview } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MultimodalityDiagram } from "./MultimodalityDiagram";

/**
 * 2 · #overview. Text + consultation photo (photo first on phones), then the
 * multimodality diagram full width.
 */
export function Overview() {
  const img = breastImages[overview.image];

  return (
    <Section id="overview" tone="surface" aria-labelledby="overview-title">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading id="overview-title" eyebrow={overview.eyebrow} title={overview.title} emphasis={overview.emphasis} />
          {overview.paragraphs.map((p) => (
            <p key={p} className="measure mt-6 text-[1.125rem] leading-[1.75] text-text">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal className="max-md:order-first" delay={0.1}>
          <div className="relative mx-auto w-full max-w-[520px] max-md:pr-3 max-md:pb-3 md:pr-5 md:pb-5">
            {/* Blush offset shape */}
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-accent-soft md:translate-x-5 md:translate-y-5" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-soft md:aspect-[4/5]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1023px) 40vw, 520px"
                className="object-cover"
                style={{ objectPosition: img.focal }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 md:mt-20">
        <MultimodalityDiagram {...overview.diagram} />
      </div>
    </Section>
  );
}

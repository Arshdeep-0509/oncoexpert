import Image from "next/image";
import { techniques } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechniqueDetails } from "@/components/pages/colorectal-cancer/TechniqueDetails";
import { TechniqueSwitch } from "@/components/pages/colorectal-cancer/TechniqueSwitch";
import { styles } from "@/components/pages/colorectal-cancer/techniques-styles";
import "@/components/pages/colorectal-cancer/techniques.css";

const image = (key: keyof typeof colorectalImages) => {
  const img = colorectalImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
};

/**
 * 4 · #techniques "Minimally Invasive Excellence": Robotic vs Laparoscopic.
 * Phones and tablets: the switch (TechniqueSwitch). Desktop: both sides at once; hovering or
 * focusing one dims the other. The robotic side is the dark one, its arms photo drifting slowly.
 */
export function Techniques() {
  const arms = colorectalImages[techniques.robotic.image];
  return (
    <Section id="techniques" tone="warm" aria-labelledby="techniques-title">
      <Reveal>
        <SectionHeading id="techniques-title" title={techniques.title} emphasis={techniques.emphasis} align="center" />
      </Reveal>

      <Reveal className="mt-10 md:mt-12 lg:hidden">
        <TechniqueSwitch
          content={techniques}
          images={{ robotic: image(techniques.robotic.image), laparoscopic: image(techniques.laparoscopic.image) }}
        />
      </Reveal>

      <Reveal className={cn(styles.pair, "mt-14 hidden grid-cols-2 gap-6 lg:grid")}>
        {/* Robotic: dark, the arms photo drifting behind */}
        <article
          aria-labelledby="techniques-robotic"
          className={cn(
            styles.side,
            "relative isolate flex flex-col overflow-hidden rounded-xl bg-ink p-10 shadow-soft-lg xl:p-12",
          )}
        >
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-[62%] opacity-55 blend-on-dark">
            <div className={cn(styles.drift, "relative size-full")}>
              <Image
                src={arms.src}
                alt=""
                fill
                sizes="420px"
                className="object-cover"
                style={{ objectPosition: arms.focal }}
              />
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--ink)_38%,transparent)]"
          />
          <span
            aria-hidden="true"
            className="absolute top-4 right-8 font-display text-[7rem] leading-none font-semibold text-white/10"
          >
            {techniques.robotic.letter}
          </span>
          <div className="flex max-w-[30rem] flex-1 flex-col">
            <TechniqueDetails
              technique={techniques.robotic}
              idealForLabel={techniques.idealForLabel}
              link={techniques.link}
              headingId="techniques-robotic"
              onDark
            />
          </div>
        </article>

        {/* Laparoscopic: light */}
        <article
          aria-labelledby="techniques-laparoscopic"
          className={cn(
            styles.side,
            "relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface p-10 shadow-soft xl:p-12",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute top-4 right-8 font-display text-[7rem] leading-none font-semibold text-accent-soft"
          >
            {techniques.laparoscopic.letter}
          </span>
          <div className="relative flex flex-1 flex-col">
            <TechniqueDetails
              technique={techniques.laparoscopic}
              idealForLabel={techniques.idealForLabel}
              headingId="techniques-laparoscopic"
            />
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

import { precision } from "@/content/pages/endometrial-cancer";
import { endometrialImages } from "@/content/pages/endometrial-cancer.images";
import { keepLastWords } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PrecisionDetails } from "@/components/pages/endometrial-cancer/PrecisionDetails";
import { PrecisionSwitch } from "@/components/pages/endometrial-cancer/PrecisionSwitch";
import { styles } from "@/components/pages/endometrial-cancer/precision-styles";
import "@/components/pages/endometrial-cancer/precision.css";

const image = (key: keyof typeof endometrialImages) => {
  const img = endometrialImages[key];
  return { src: img.src, focal: img.focal };
};
const images = { robotic: image(precision.robotic.image), laparoscopic: image(precision.laparoscopic.image) };

/**
 * 4 · #precision "Advanced Surgical Precision": Robotic (Gold Standard) vs Advanced Laparoscopy,
 * the colorectal comparison pattern with this page's content (page-specific: the features are
 * icon + title + text, the switches carry their own labels, and the robotic card has the lens).
 * Phones and tablets: the switch. Desktop: both cards; hovering or focusing one dims the other.
 */
export function Precision() {
  return (
    <Section id="precision" tone="alt" aria-labelledby="precision-title">
      <Reveal>
        <SectionHeading
          id="precision-title"
          title={keepLastWords(precision.title)}
          intro={precision.intro}
          align="center"
        />
      </Reveal>

      <Reveal className="mt-10 md:mt-12 lg:hidden">
        <PrecisionSwitch content={precision} images={images} />
      </Reveal>

      <Reveal className={cn(styles.pair, "mt-14 hidden grid-cols-2 gap-6 lg:grid")}>
        <article
          aria-labelledby="precision-robotic"
          className={cn(styles.side, "flex flex-col rounded-xl bg-ink p-10 shadow-soft-lg xl:p-12")}
        >
          <PrecisionDetails
            approach={precision.robotic}
            image={images.robotic}
            zoom
            onDark
            headingId="precision-robotic"
          />
        </article>
        <article
          aria-labelledby="precision-laparoscopic"
          className={cn(styles.side, "flex flex-col rounded-xl border border-line bg-surface p-10 shadow-soft xl:p-12")}
        >
          <PrecisionDetails
            approach={precision.laparoscopic}
            image={images.laparoscopic}
            headingId="precision-laparoscopic"
          />
        </article>
      </Reveal>
    </Section>
  );
}

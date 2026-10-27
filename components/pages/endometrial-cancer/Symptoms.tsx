import { symptoms } from "@/content/pages/endometrial-cancer";
import { endometrialImages } from "@/content/pages/endometrial-cancer.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { SymptomCard } from "@/components/pages/endometrial-cancer/SymptomCard";
import "@/components/pages/endometrial-cancer/symptoms.css";

/**
 * 3 · #symptoms "When Should You See a Specialist?": the four warning signs as photo cards (desktop 4
 * across, tablets 2 × 2, phones stacked and all open), then a calm reassurance line (NEW, PENDING
 * DOCTOR) and "Book Consultation".
 */
export function Symptoms() {
  return (
    <Section id="symptoms" aria-labelledby="symptoms-title">
      <Reveal>
        <SectionHeading id="symptoms-title" title={symptoms.title} intro={symptoms.intro} align="center" />
      </Reveal>
      <Reveal stagger as="ul" className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {symptoms.items.map((item, i) => (
          <SymptomCard
            key={item.title}
            id={`symptom-${i + 1}`}
            icon={item.icon}
            title={item.title}
            body={item.body}
            image={endometrialImages[item.image]}
          />
        ))}
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center md:mt-14">
        <p className="text-base leading-relaxed text-text md:text-lg">{symptoms.reassurance}</p>
        <AppointmentButton {...symptoms.cta} arrow fullWidthOnMobile />
      </Reveal>
    </Section>
  );
}

import Image from "next/image";
import { howItWorks } from "@/content/pages/book-appointment";
import { bookImages } from "@/content/pages/book-appointment.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { at, styles } from "@/components/pages/book-appointment/booking-styles";
import "@/components/pages/book-appointment/booking.css";

/**
 * #how-it-works: book → we call to confirm → consult the specialist. A line runs through the
 * three numbered stops (across on desktop, down on phones) and draws itself as the steps
 * enter the screen; each step follows it in.
 */
export function HowItWorks() {
  const image = bookImages[howItWorks.image];
  return (
    <Section id="how-it-works" tone="alt" aria-labelledby="how-it-works-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            id="how-it-works-title"
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            emphasis={howItWorks.emphasis}
          />
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-soft">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover"
              style={{ objectPosition: image.focal }}
            />
          </div>
        </Reveal>
      </div>

      <InView className="relative mt-12 md:mt-16">
        {/* The line: through the centres of the numbered stops */}
        <span
          aria-hidden="true"
          className={cn(
            styles.line,
            "absolute top-6 bottom-6 left-6 w-0.5 bg-(image:--grad-accent) md:top-6 md:right-[calc(100%/6)] md:bottom-auto md:left-[calc(100%/6)] md:h-0.5 md:w-auto",
          )}
        />
        <ol className="relative grid gap-8 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(styles.stepItem, "flex gap-5 md:flex-col md:items-center md:text-center")}
              style={at(0.35 + i * 0.3)}
            >
              <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-surface font-display text-lg font-bold text-accent tabular-nums ring-1 shadow-soft-sm ring-line">
                {i + 1}
              </span>
              <span className="md:mt-5">
                <span className="block heading-3 text-ink">{step.title}</span>
                <span className="mt-2 block max-w-[34ch] text-base text-muted">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </InView>
    </Section>
  );
}

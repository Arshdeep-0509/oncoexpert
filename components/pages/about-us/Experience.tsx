import { experience } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { styles } from "@/components/pages/about-us/about-styles";
import "@/components/pages/about-us/about.css";

/**
 * #experience: the "10+" as a giant number that counts up on a navy band, with its label. Behind
 * it, the logo ring motif: two faint conic rings turning slowly in opposite directions (transform
 * only), stopped by the band's pause button, off screen and while the number is hovered.
 * PENDING DOCTOR: the years (10+ here, 15+ on Home, 25 on the booking page).
 */
export function Experience() {
  const { stat } = experience;
  return (
    <section
      id="experience"
      aria-labelledby="experience-label"
      data-tone="plum"
      className={cn(styles.band, "on-dark relative isolate overflow-hidden bg-ink bg-(image:--grad-plum) text-white")}
    >
      <Container className="relative grid place-items-center py-24 text-center md:py-32">
        <div className={cn(styles.bandNumber, "relative flex flex-col items-center")}>
          <p className="font-display text-[clamp(6.5rem,24vw,13rem)] leading-[0.9] font-bold tracking-[-0.05em] text-white tabular-nums">
            <Counter value={stat.value} suffix={stat.suffix} reserveWidth duration={1.8} />
          </p>
          <h2 id="experience-label" className="mt-5 max-w-[24ch] text-lg font-semibold text-white/80 md:text-xl">
            {stat.label}
          </h2>
        </div>
        {/* The rings: decorative, centred on the number */}
        <span
          aria-hidden="true"
          className={cn(styles.ring, styles.ringSpin, "-z-10 size-[min(88vw,560px)] opacity-25")}
        />
        <span
          aria-hidden="true"
          className={cn(
            styles.ring,
            styles.ringSpin,
            styles.ringReverse,
            "-z-10 size-[min(64vw,400px)] rotate-180 opacity-15",
          )}
        />
        <div className="absolute right-(--gutter) bottom-6">
          <MotionToggle pause={experience.a11y.pause} play={experience.a11y.play} onDark />
        </div>
      </Container>
    </section>
  );
}

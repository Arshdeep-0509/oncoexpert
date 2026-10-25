import Image from "next/image";
import { hero, pageName } from "@/content/pages/book-appointment";
import { bookImages } from "@/content/pages/book-appointment.images";
import { appointmentSection } from "@/content/shared/sections";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { reassuranceIcons } from "@/components/pages/book-appointment/icons";
import { at, styles } from "@/components/pages/book-appointment/booking-styles";
import { EmergencyBanner } from "@/components/pages/book-appointment/EmergencyBanner";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { BookingForm } from "@/components/pages/book-appointment/booking-form/BookingForm";
import "@/components/pages/book-appointment/booking.css";

/**
 * The hero's choreography, in seconds after --intro (booking.css). --intro is 0.2s before the
 * overlay starts fading and the fade takes 0.6s, so the first visible beats start at ~0.45:
 * the words rise one by one as the page is revealed, the card slides up beside them, then the
 * body, the three rows, the emergency band (EmergencyBanner, 2.0) and the doctor.
 */
const T = {
  eyebrow: 0.45,
  firstWord: 0.55,
  wordGap: 0.11,
  card: 0.6,
  body: 1.2,
  rows: 1.5,
  rowGap: 0.2,
  doctor: 2.2,
};

/**
 * #hero: the form IS the hero. Desktop: headline, body, three reassurance rows and the doctor
 * on the left; the guided form in a large card on the right; #emergency along the bottom.
 * Phones: a compact headline, then the form card, then #emergency, then the rest.
 */
export function BookingHero() {
  const words = hero.title.split(" ");
  const doctor = bookImages[hero.doctor.image];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate bg-surface bg-(image:--grad-hero)")}
    >
      <Container
        className={cn(
          styles.grid,
          "pt-[calc(var(--header-h)+20px)] pb-12 md:pt-[calc(var(--header-h)+40px)] md:pb-16 lg:pt-[calc(var(--header-h)+56px)] lg:pb-20",
        )}
      >
        {/* Headline */}
        <div className={styles.areaHead}>
          <p
            className={cn(
              styles.step,
              styles.fadeDown,
              "inline-flex min-h-7 items-center gap-2 rounded-pill bg-accent-soft px-3 py-1 text-xs leading-none font-semibold tracking-[0.16em] text-accent uppercase",
            )}
            style={at(T.eyebrow)}
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[1.875rem] leading-[1.08] font-bold tracking-[-0.03em] text-ink md:mt-5 md:text-[2.75rem] lg:text-[clamp(2.75rem,4.2vw,3.75rem)]"
          >
            {words.map((word, i) => (
              <span key={i}>
                {i > 0 ? " " : null}
                <span className={styles.wordMask}>
                  <span
                    className={cn(
                      styles.word,
                      styles.step,
                      styles.wordRise,
                      word === hero.emphasis && "font-serif font-medium tracking-[-0.01em] text-accent italic",
                    )}
                    style={at(T.firstWord + i * T.wordGap)}
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* The form card (#appointment: every "Book" button on the page scrolls here) */}
        {/* The wrapper carries the shadow bloom (behind the card); the card slides up inside it. */}
        <div className={cn(styles.areaForm, styles.card, "rounded-xl")} style={at(T.card)}>
          <div
            id="appointment"
            className={cn(
              styles.step,
              styles.cardIn,
              "rounded-xl border border-line bg-surface p-4 shadow-soft-lg min-[360px]:p-5 md:p-8",
            )}
          >
            <h2 className="mb-5 font-display text-lg font-bold text-ink md:mb-6 md:text-xl">
              {appointmentSection.form.title}
            </h2>
            <BookingForm page={pageName} />
          </div>
        </div>

        <EmergencyBanner className={styles.areaEmergency} />

        {/* Body, reassurance rows and the doctor */}
        <div className={cn(styles.areaDetails, "lg:pt-2")}>
          <p className={cn(styles.step, styles.fadeUp, "measure text-base text-text md:text-lg")} style={at(T.body)}>
            {hero.body}
          </p>
          <ul aria-label={hero.a11y.reassurance} className="mt-7 grid gap-3 md:mt-8 md:gap-4">
            {hero.reassurance.map((row, i) => {
              const Icon = reassuranceIcons[row.icon];
              return (
                <li
                  key={row.title}
                  className={cn(styles.step, styles.pop, "flex items-start gap-4")}
                  style={at(T.rows + i * T.rowGap)}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-surface text-accent ring-1 shadow-soft-sm ring-line">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="pt-0.5">
                    <span className="block font-semibold text-ink">{row.title}</span>
                    <span className="block text-[15px] text-muted">{row.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={cn(styles.step, styles.fadeUp, "mt-8 flex items-center gap-4")} style={at(T.doctor)}>
            <div className={cn(styles.doctor, "flex items-center gap-3.5")}>
              <span
                className={cn(
                  styles.loop,
                  styles.float,
                  "relative block size-14 overflow-hidden rounded-full bg-(image:--portrait-backdrop) ring-2 shadow-soft ring-white",
                )}
              >
                <Image
                  src={doctor.src}
                  alt=""
                  aria-hidden="true"
                  width={112}
                  height={112}
                  sizes="56px"
                  className="size-full object-cover"
                  style={{ objectPosition: "50% 12%" }}
                />
              </span>
              <span>
                <span className="block font-semibold text-ink">{hero.doctor.name}</span>
                <span className="block text-sm text-muted">{hero.doctor.role}</span>
              </span>
            </div>
            <MotionToggle pause={hero.a11y.pause} play={hero.a11y.play} />
          </div>
        </div>
      </Container>
    </section>
  );
}

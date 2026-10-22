import { hero } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

/**
 * 1 · #hero, skeleton: the final H1, body and CTAs on the navy hero gradient, so the header's
 * on-dark state, the contrast and the LCP text are real from the first build. On navy the
 * main CTA is the white onDark pill (logo blue on navy is only 2:1).
 */
export function HomeHero() {
  return (
    <section
      id="hero"
      data-tone="hero"
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-ink bg-(image:--grad-hero) text-white"
    >
      <Container className="flex min-h-svh flex-col justify-center pt-[calc(var(--header-h)+40px)] pb-20 md:pb-28 lg:min-h-[min(calc(100svh-36px),920px)]">
        <h1 id="hero-title" className="max-w-[17ch] heading-1 text-white">
          {hero.title}
        </h1>
        <p className="mt-6 measure text-lg text-white/75">{hero.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <AppointmentButton
            label={hero.ctas.primary.label}
            service={hero.ctas.primary.service}
            variant="onDark"
            arrow
            fullWidthOnMobile
          />
          <AppointmentButton
            label={hero.ctas.secondary.label}
            service={hero.ctas.secondary.service}
            variant="ghost"
            fullWidthOnMobile
            className="px-6 text-white ring-1 ring-white/30 ring-inset hover:bg-white/10 hover:text-white"
          />
        </div>
      </Container>
    </section>
  );
}

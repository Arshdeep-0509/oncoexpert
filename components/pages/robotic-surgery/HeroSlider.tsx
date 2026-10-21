import { hero } from "@/content/pages/robotic-surgery";
import { Container } from "@/components/ui/Container";
import { HeroCarousel } from "@/components/pages/robotic-surgery/hero-slider/HeroCarousel";
import { HeroText } from "@/components/pages/robotic-surgery/hero-slider/HeroText";

/** 1 · #hero: the photo carousel (first on phones) beside the headline, on black. */
export function HeroSlider() {
  return (
    <section
      id="hero"
      data-tone="black"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <Container className="grid min-h-svh grid-cols-1 content-center gap-y-8 pt-[96px] pb-[88px] md:min-h-[calc(100svh-40px)] lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-[104px] lg:pb-24">
        <HeroCarousel />
        <HeroText />
      </Container>

      {/* Scroll cue */}
      <a
        href="#overview"
        aria-label={hero.a11y.scrollCue}
        className="absolute bottom-5 left-1/2 hidden h-14 w-11 -translate-x-1/2 justify-center md:flex"
      >
        <span aria-hidden="true" className="relative h-12 w-px bg-white/15">
          <span className="absolute top-0 -left-[2.5px] size-1.5 rounded-full bg-glow motion-safe:animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}

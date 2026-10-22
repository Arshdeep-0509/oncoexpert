import { hero } from "@/content/pages/home";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { HeroMotionToggle } from "@/components/pages/home/HeroMotionToggle";
import { at, styles } from "@/components/pages/home/hero-styles";

function TrustItems() {
  return hero.trust.map((fact) => (
    <li key={fact} className="flex items-center gap-3 py-1 text-sm whitespace-nowrap text-white/75">
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
      {fact}
    </li>
  ));
}

/**
 * Trust strip along the hero's bottom edge, with the scroll cue above it. A slow seamless
 * marquee (40s per loop; 60% speed on phones) that pauses on hover / focus; the button pauses
 * every hero loop. The second copy of the list is aria-hidden. Reduced motion: one static,
 * wrapped list.
 */
export function HeroTrustStrip() {
  return (
    <div className={cn(styles.step, styles.fadeUp, "relative")} style={at(1.8)}>
      {/* Scroll cue (desktop) */}
      <a
        href="#surgeon"
        aria-label={hero.a11y.scroll}
        className="absolute bottom-[calc(100%+18px)] left-1/2 hidden size-11 -translate-x-1/2 place-items-center rounded-full lg:grid"
      >
        <span aria-hidden="true" className="relative block h-[38px] w-6 rounded-full border-[1.5px] border-white/35">
          <span className={cn(styles.cueDot, styles.loop)} />
        </span>
      </a>

      <div className={cn(styles.trust, "border-t border-white/10 bg-white/[0.03]")}>
        {/* The button leads the strip: the floating WhatsApp button owns the bottom-right corner. */}
        <Container className="flex items-center gap-3 py-2.5 md:gap-5">
          <HeroMotionToggle pause={hero.a11y.pause} play={hero.a11y.play} />
          <div className={cn(styles.marquee, "min-w-0 flex-1")}>
            <div className={cn(styles.marqueeTrack, styles.loop)}>
              <ul aria-label={hero.a11y.trust} className={styles.trustList}>
                <TrustItems />
              </ul>
              <ul aria-hidden="true" className={styles.trustList}>
                <TrustItems />
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import { heroSlides } from "@/content/pages/home.images";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { styles } from "@/components/pages/home/hero-styles";

/** Desktop: a portrait photo is about 40% of the screen wide at the hero's height, a landscape one 80%. */
const sizesFor = (slide: (typeof heroSlides)[number]) =>
  slide.width > slide.height ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1024px) 40vw, 100vw";

/**
 * The hero's background: Dr. Sunil's photos, each shown whole (never cropped, as on the live
 * homepage) for 6.5s. The next one fades in over it, settling from a slight zoom while the last
 * one drifts back. The motion is all CSS (hero.css, "Background photo slider"): the end of the
 * active photo's hidden clock animation moves the slider on, so the hero's pause button and
 * leaving the screen (.orbit-loop) stop the timer and the progress bars together, and the first
 * photo waits for the intro. Reduced motion: the first photo, still.
 * The first photo is the LCP image (preloaded, visible from the first paint); the others load
 * once the page has. Decorative (aria-hidden): the headline carries the message.
 */
export function HeroSlider() {
  const [index, setIndex] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  // Only the very first photo waits for the intro; once the loop comes round it starts at once.
  const [looped, setLooped] = React.useState(false);
  const [warm, setWarm] = React.useState(false);
  const total = heroSlides.length;

  // Photos 2..n load only after the page, including photo 1, has loaded.
  React.useEffect(() => {
    const ready = () => setWarm(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(ready, 250);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  const advance = () => {
    const next = (index + 1) % total;
    setPrev(index);
    setIndex(next);
    if (next === 0) setLooped(true);
  };

  const delayOf = (i: number) => (i === 0 && !looped ? "var(--intro)" : "0s");

  return (
    <div aria-hidden="true" className={cn(styles.slides, "pointer-events-none -z-10")}>
      <div className={styles.slideStack}>
        {heroSlides.map((slide, i) => {
          const state = i === index ? "active" : i === prev ? "leaving" : undefined;
          return (
            <div
              key={slide.src}
              className={styles.slide}
              data-state={state}
              style={{ "--slide-delay": delayOf(i) } as React.CSSProperties}
            >
              {i === 0 || warm ? (
                <div className={styles.slideIn}>
                  <Image
                    src={slide.src}
                    alt=""
                    width={slide.width}
                    height={slide.height}
                    sizes={sizesFor(slide)}
                    preload={i === 0}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    loading={i === 0 ? undefined : "eager"}
                    className={styles.slideImg}
                  />
                </div>
              ) : null}
              {state === "active" ? <span className={cn(styles.clock, styles.loop)} onAnimationEnd={advance} /> : null}
            </div>
          );
        })}
      </div>
      <div className={styles.shade} />

      {/* Progress bars, at the foot of the photos (desktop) */}
      <Container className="absolute inset-x-0 bottom-7 hidden justify-end lg:flex">
        <div className={styles.bars}>
          {heroSlides.map((slide, i) => (
            <span
              key={slide.src}
              className={styles.bar}
              data-active={i === index ? "" : undefined}
              style={{ "--slide-delay": delayOf(i) } as React.CSSProperties}
            >
              <span className={cn(styles.barFill, styles.loop)} />
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

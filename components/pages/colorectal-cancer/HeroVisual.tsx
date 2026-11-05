import Image from "next/image";
import { hero } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroCounter } from "@/components/pages/colorectal-cancer/HeroCounter";
import { HeroVideo } from "@/components/pages/colorectal-cancer/HeroVideo";
import { at, styles } from "@/components/pages/colorectal-cancer/hero-styles";

/**
 * The hero's visual: an AI-generated film of the colon, looping seamlessly in a square card over
 * the still that shares its first frame (the LCP image: painted from the start, never faded), with
 * the glass stat card and the pause button. Layers carry data-depth for the pointer parallax
 * (desktop, ≤ 12px). Phones: the stat card is a strip under the film, overlapping its bottom edge.
 */
export function HeroVisual() {
  const still = colorectalImages.heroColon;
  return (
    <div className="relative mx-auto w-full max-w-[340px] md:max-w-none lg:mr-0 lg:max-w-[560px]">
      <div data-depth="6" className="relative max-md:mx-auto max-md:w-[92%]">
        <div className="relative aspect-square overflow-hidden rounded-[28px] bg-ink ring-4 shadow-soft-lg ring-white">
          <Image
            src={still.src}
            alt={still.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 70vw, 340px"
            className="object-cover"
          />
          <HeroVideo src="/videos/colorectal-hero.mp4" />
        </div>

        {/* Pause / play for the film and the loops */}
        <div className={cn(styles.step, styles.fadeUp, "absolute top-3 right-3 z-10")} style={at(1.6)}>
          <MotionToggle pause={hero.a11y.pause} play={hero.a11y.play} className="size-12 bg-white/85 shadow-soft-sm" />
        </div>
      </div>

      {/* Glass stat card: phones, a strip under the film (overlapping its edge) */}
      <div data-depth="12" className="relative z-10 -mt-6 md:absolute md:bottom-0 md:-left-[6%] md:mt-0 md:w-[46%]">
        <div className={cn(styles.step, styles.pop)} style={at(1.4)}>
          <div
            className={cn(
              styles.float,
              "flex items-center gap-4 rounded-[20px] bg-white/95 px-5 py-4 ring-1 shadow-soft-lg ring-white md:block md:px-5 md:py-4",
            )}
          >
            <p className="shrink-0 border-r border-line pr-4 font-display text-[2.4rem] leading-none font-semibold text-ink md:border-0 md:pr-0 md:text-[2.6rem]">
              <HeroCounter value={hero.stat.value} suffix={hero.stat.suffix} />
            </p>
            <div>
              <p className="text-[15px] leading-tight font-semibold text-ink md:mt-1.5">{hero.stat.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{hero.stat.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

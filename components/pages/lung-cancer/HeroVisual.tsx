import Image from "next/image";
import { Wind } from "lucide-react";
import { hero } from "@/content/pages/lung-cancer";
import { lungImages } from "@/content/pages/lung-cancer.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroArt } from "@/components/pages/lung-cancer/HeroArt";
import { at, styles } from "@/components/pages/lung-cancer/hero-styles";

/**
 * The hero's visual: the breathing lungs, the photo card of a woman breathing calmly with its glass
 * caption chip, and the 48px pause button. A square box (the art's own proportions) reserves the
 * space before anything loads (CLS 0). Layers carry data-depth for the pointer parallax (desktop,
 * ≤ 10px). The photo is the LCP image: preloaded, high priority, never faded (a cover panel slides
 * off it instead).
 */
export function HeroVisual() {
  const photo = lungImages[hero.image];
  return (
    <div className="relative mx-auto w-full max-w-[360px] md:max-w-none lg:mr-0 lg:max-w-[580px]">
      <div className="relative aspect-square">
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="absolute inset-0">
          <HeroArt />
        </div>

        {/* Photo card, over the lower right of the left lung */}
        <div data-depth="10" className="absolute right-0 bottom-[-4%] w-[38%] md:w-[34%]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] border-4 border-white shadow-soft-lg md:rounded-[24px] md:border-[6px]">
            <Image
              src={photo.src}
              alt=""
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 210px, (min-width: 768px) 26vw, 132px"
              className="object-cover"
              style={{ objectPosition: photo.focal }}
            />
            <span aria-hidden="true" className={cn(styles.photoCover, "absolute inset-0 bg-surface-alt")} />
          </div>
          <div className={cn(styles.step, styles.pop, "absolute right-2 -bottom-4 w-max max-w-[200%]")} style={at(1.6)}>
            <p className="flex items-center gap-1.5 rounded-pill bg-surface/90 px-3 py-1.5 text-[12px] leading-tight font-semibold text-ink ring-1 shadow-soft ring-white md:text-[13px]">
              <Wind className="size-3.5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
              {hero.caption}
            </p>
          </div>
        </div>

        <div className={cn(styles.step, styles.fadeUp, "absolute top-[14%] right-0 z-10")} style={at(1.8)}>
          <MotionToggle
            pause={hero.a11y.pause}
            play={hero.a11y.play}
            className="size-12 bg-surface/80 shadow-soft-sm"
          />
        </div>
      </div>
    </div>
  );
}

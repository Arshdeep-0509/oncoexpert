import Image from "next/image";
import { hero } from "@/content/pages/thyroid-cancer";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroArt } from "@/components/pages/thyroid-cancer/HeroArt";
import { BUTTERFLY_BOX } from "@/components/pages/thyroid-cancer/butterfly-art";
import { at, styles } from "@/components/pages/thyroid-cancer/hero-styles";

/**
 * The butterfly behind the photo card of a man laughing as he talks (voice preserved), and the
 * 48px pause button. The box keeps the art's proportions (CLS 0); data-depth layers for the
 * pointer parallax. The photo is the LCP image: preloaded, high priority, never faded (a cover
 * slides off it).
 */
export function HeroVisual() {
  const photo = thyroidImages[hero.image];
  return (
    <div className="relative mx-auto w-full max-w-[380px] md:max-w-[520px] lg:mr-0 lg:max-w-[560px]">
      <div className="relative" style={{ aspectRatio: `${BUTTERFLY_BOX.width} / ${BUTTERFLY_BOX.height}` }}>
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="absolute inset-0">
          <HeroArt />
        </div>
        <div data-depth="10" className="absolute right-[-2%] bottom-[-12%] w-[36%] md:right-[-4%]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border-4 border-white shadow-soft-lg md:rounded-[22px] md:border-[6px]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 210px, (min-width: 768px) 190px, 36vw"
              className="object-cover"
              style={{ objectPosition: photo.focal }}
            />
            <span aria-hidden="true" className={cn(styles.photoCover, "absolute inset-0 bg-surface-alt")} />
          </div>
        </div>
        <div className={cn(styles.step, styles.fadeUp, "absolute top-0 right-0 z-10")} style={at(1.8)}>
          <MotionToggle
            pause={hero.a11y.pause}
            play={hero.a11y.play}
            className="size-12 bg-surface/85 shadow-soft-sm"
          />
        </div>
      </div>
    </div>
  );
}

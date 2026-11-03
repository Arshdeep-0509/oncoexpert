import { hero } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroArt } from "@/components/pages/thyroid-cancer/HeroArt";
import { BUTTERFLY_BOX } from "@/components/pages/thyroid-cancer/butterfly-art";
import { at, styles } from "@/components/pages/thyroid-cancer/hero-styles";

/**
 * The butterfly and the 48px pause button (no photo). The box keeps the art's proportions
 * (CLS 0); the art carries data-depth for the pointer parallax.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] md:max-w-[520px] lg:mr-0 lg:max-w-[560px]">
      <div className="relative" style={{ aspectRatio: `${BUTTERFLY_BOX.width} / ${BUTTERFLY_BOX.height}` }}>
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="absolute inset-0">
          <HeroArt />
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

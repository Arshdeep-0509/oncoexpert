import { Wind } from "lucide-react";
import { hero } from "@/content/pages/lung-cancer";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroArt } from "@/components/pages/lung-cancer/HeroArt";
import { at, styles } from "@/components/pages/lung-cancer/hero-styles";

/**
 * The hero's visual: the breathing lungs, their glass caption chip and the 48px pause button (no
 * photo). A square box (the art's own proportions) reserves the space before anything loads
 * (CLS 0). The art carries data-depth for the pointer parallax (desktop, ≤ 10px).
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] md:max-w-none lg:mr-0 lg:max-w-[580px]">
      <div className="relative aspect-square">
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="absolute inset-0">
          <HeroArt />
        </div>

        <div
          className={cn(styles.step, styles.pop, "absolute inset-x-0 -bottom-2 flex justify-center")}
          style={at(1.6)}
        >
          <p className="flex items-center gap-1.5 rounded-pill bg-surface/90 px-3 py-1.5 text-[12px] leading-tight font-semibold text-ink ring-1 shadow-soft ring-white md:text-[13px]">
            <Wind className="size-3.5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {hero.caption}
          </p>
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

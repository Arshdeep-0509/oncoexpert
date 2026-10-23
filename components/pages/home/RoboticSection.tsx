import type * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Crosshair,
  DropletOff,
  Eye,
  Hand,
  House,
  Smile,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { robotic, type RoboticFeatureIcon } from "@/content/pages/home";
import { homeImages } from "@/content/pages/home.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import "@/components/pages/home/icon-draw.css";
import "@/components/pages/home/robotic-band.css";

const icons: Record<RoboticFeatureIcon, LucideIcon> = {
  crosshair: Crosshair,
  eye: Eye,
  hand: Hand,
  "droplet-off": DropletOff,
  smile: Smile,
  sparkles: Sparkles,
  timer: Timer,
  house: House,
};

/** Class names from robotic-band.css (`rband-`) and icon-draw.css (the icons draw on reveal). */
const styles = {
  tile: "rband-tile icon-draw-in",
  card: "rband-card",
  icon: "icon-draw",
  sheen: "rband-sheen",
  drift: "rband-drift",
} as const;

/** The arms run off the photo's top and left edges: fade those two edges into the band. */
const photoMask = {
  maskImage: "linear-gradient(to right, transparent, black 40%), linear-gradient(to bottom, transparent, black 30%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as React.CSSProperties;

/**
 * 3 · #robotic: the dark band that hands off to the robotic page. The da Vinci arms photo
 * (screen-blended on navy, drifting 40px with scroll) beside the heading and the link to
 * /robotic-surgery/, then the 8 features as an icon grid (4×2 desktop, 2×4 phones): the tiles
 * reveal in turn, each icon draws itself, then one glow passes left to right.
 */
export function RoboticSection() {
  const photo = homeImages[robotic.image];

  return (
    <Section id="robotic" tone="plum" aria-labelledby="robotic-title" contained={false} className="overflow-hidden">
      {/* The robotic page's faint precision grid, and a teal glow from the logo ring behind the arms */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 precision-grid opacity-70" />
        <div className="absolute -top-[10%] -right-[10%] aspect-square w-[min(90vw,820px)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--logo-ring-end)_22%,transparent),transparent)]" />
      </div>

      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="relative z-10 lg:col-span-6">
          <Reveal>
            <SectionHeading id="robotic-title" title={robotic.title} intro={robotic.intro} onDark />
          </Reveal>
          <Reveal className="mt-8 md:mt-10">
            <Button
              href={robotic.cta.href}
              variant="onDark"
              icon={ArrowRight}
              cta={robotic.cta.label}
              fullWidthOnMobile
            >
              {robotic.cta.label}
            </Button>
          </Reveal>
        </div>

        {/* The photo's lower ~40% is black (blended away): phones pull the grid up over it. */}
        <div className="relative -mx-(--gutter) max-lg:-mb-[22%] lg:col-span-6 lg:mx-0 lg:-mr-[6vw]">
          {/* The blend sits on the drifting wrapper: its transform makes it the layer that is
              composited onto the band, so screen drops the photo's black against the navy. */}
          <div className={cn(styles.drift, "blend-on-dark")}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full"
              style={{ ...photoMask, objectPosition: photo.focal }}
            />
          </div>
        </div>
      </Container>

      <Container className="mt-10 md:mt-14">
        <h3 className="sr-only">{robotic.a11y.features}</h3>
        <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4" itemClassName={styles.tile}>
          {robotic.features.map((feature, i) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.label}
                className={cn(
                  styles.card,
                  "relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 md:flex-row md:items-center md:p-6",
                )}
                style={{ "--col-sm": i % 2, "--col-lg": i % 4 } as React.CSSProperties}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                  <Icon className={cn(styles.icon, "size-6 text-accent-glow")} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-snug font-semibold text-white md:text-base">{feature.label}</span>
                <span aria-hidden="true" className={styles.sheen} />
              </div>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

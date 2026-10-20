import Image from "next/image";
import { Crosshair, FlaskConical, HeartHandshake, Scissors, Wallet, type LucideIcon } from "lucide-react";
import { whyTrust, type WhyTrustIcon } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwipeRow } from "@/components/ui/swipe-row";
import { Reveal } from "@/components/ui/reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

const icons: Record<WhyTrustIcon, LucideIcon> = {
  crosshair: Crosshair,
  scissors: Scissors,
  flask: FlaskConical,
  wallet: Wallet,
  "heart-handshake": HeartHandshake,
};

/*
 * Bento: tablet 2 columns (the 5th card spans both); desktop 6 columns,
 * row 1 = three cards (2 cols each), row 2 = two wider cards (3 cols each).
 */
const spans = whyTrust.cards.map((_, i) => cn(i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === 4 && "md:col-span-2"));

/** 3 · #why-trust */
export function WhyTrust() {
  const band = whyTrust.band;
  const img = breastImages[band.image];

  return (
    <Section id="why-trust" tone="alt" aria-labelledby="why-trust-title">
      <Reveal>
        <SectionHeading id="why-trust-title" title={whyTrust.title} intro={whyTrust.intro} />
      </Reveal>

      <Reveal className="mt-10 md:mt-14" delay={0.05}>
        <SwipeRow
          label={whyTrust.a11y.cards}
          hint={whyTrust.a11y.swipeHint}
          gridClassName="md:grid-cols-2 lg:grid-cols-6"
          itemClassName={spans}
        >
          {whyTrust.cards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <article
                key={card.title}
                data-pending-approval={"pendingApproval" in card ? card.pendingApproval : undefined}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-6 shadow-soft-sm transition-[translate,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent hover:shadow-soft md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-5 right-6 font-display text-[2.5rem] leading-none text-accent/10 tabular-nums select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-12 place-items-center rounded-[14px] bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 pr-10 font-display text-[1.35rem] leading-snug text-ink">{card.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted md:text-base">{card.body}</p>
              </article>
            );
          })}
        </SwipeRow>
      </Reveal>

      {/* Band: text on a blush gradient + ribbon-hands photo (photo on top on phones) */}
      <Reveal className="mt-12 md:mt-16" delay={0.05}>
        <div className="grid overflow-hidden rounded-xl bg-surface shadow-soft md:grid-cols-2">
          <div className="relative aspect-[16/10] md:order-last md:aspect-auto md:min-h-[300px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 767px) 100vw, 620px"
              className="object-cover"
              style={{ objectPosition: img.focal }}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-6 bg-linear-to-br from-surface-alt via-surface-alt to-accent-soft p-7 md:p-12">
            <p className="max-w-[24ch] font-display text-[1.6rem] leading-snug text-ink">{band.text}</p>
            <AppointmentButton {...band.cta} arrow fullWidthOnMobile />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

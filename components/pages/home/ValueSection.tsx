import { ReceiptText, ShieldCheck, Wallet, type LucideIcon } from "lucide-react";
import { value, type ValueContent, type ValueIcon } from "@/content/pages/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { ValueRange } from "@/components/pages/home/ValueRange";
import "@/components/pages/home/value-band.css";

const icons: Record<ValueIcon, LucideIcon> = {
  wallet: Wallet,
  receipt: ReceiptText,
  "shield-check": ShieldCheck,
};

/**
 * 7 · #value "Where Excellence, Compassion, Trust & Affordability Come Together": a blush-to-white
 * band with one slow-drifting glow. "30–40%" as a huge number (counts to 30, then "–40%" fades
 * in) beside the three other items as cards; "Request a Treatment Estimate" opens the form
 * with the note "Estimate request".
 */
export function ValueSection() {
  // The declared item type (the `as const` literals each lack the other items' optional fields)
  const items: ValueContent["items"] = value.items;
  const range = items.find((item) => item.range);
  const cards = items.filter((item) => !item.range);

  return (
    <Section
      id="value"
      tone="warm"
      aria-labelledby="value-title"
      className="overflow-hidden bg-linear-to-b from-surface-warm to-surface"
    >
      <div
        aria-hidden="true"
        className="vband-glow pointer-events-none absolute -top-[15%] left-[20%] -z-10 aspect-square w-[min(120vw,960px)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--highlight)_13%,transparent),transparent)]"
      />

      <Reveal>
        <SectionHeading id="value-title" title={value.title} emphasis={value.emphasis} />
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        {range?.range ? (
          <Reveal className="lg:col-span-6">
            <p className="font-display text-[clamp(4.5rem,15vw,9.5rem)] leading-[0.9] font-bold tracking-[-0.045em] text-accent lg:text-[min(8.6vw,8.25rem)]">
              <ValueRange from={range.range.from} to={range.range.to} suffix={range.range.suffix} />
            </p>
            <p className="mt-4 flex items-center gap-3 font-display text-2xl font-bold text-ink md:text-[1.75rem]">
              <span aria-hidden="true" className="size-2 rounded-full bg-highlight" />
              {range.title}
            </p>
          </Reveal>
        ) : null}

        <Reveal as="ul" stagger className="grid gap-4 lg:col-span-6">
          {cards.map((item) => {
            const Icon = item.icon ? icons[item.icon] : null;
            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl bg-surface/80 p-5 ring-1 shadow-soft-sm ring-line md:gap-5 md:p-6"
              >
                {Icon ? (
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                ) : null}
                <span className="font-display text-lg leading-snug font-bold text-ink md:text-xl">{item.title}</span>
              </div>
            );
          })}
        </Reveal>
      </div>

      <Reveal className="mt-10 md:mt-12">
        <AppointmentButton {...value.cta} arrow fullWidthOnMobile className="max-md:min-h-[52px]" />
      </Reveal>
    </Section>
  );
}

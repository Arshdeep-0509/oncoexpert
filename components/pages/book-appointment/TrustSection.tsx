import { BadgeCheck } from "lucide-react";
import { trust } from "@/content/pages/book-appointment";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Stars } from "@/components/shared/reviews/Stars";

const tile = "rounded-lg border border-line bg-surface p-5 shadow-soft-sm md:p-6";

/**
 * #trust: compact statistics and credentials, EXISTING facts only (Home's numbers and
 * credentials, the average of the Google reviews shown on this page).
 */
export function TrustSection() {
  return (
    <Section id="trust" aria-labelledby="trust-title">
      <Reveal>
        <SectionHeading id="trust-title" eyebrow={trust.eyebrow} title={trust.title} emphasis={trust.emphasis} />
      </Reveal>

      <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-12 lg:gap-6">
        <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-7">
          {trust.stats.map((stat) => (
            <div key={stat.label} className={tile}>
              <p className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-bold text-ink tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} reserveWidth />
              </p>
              <p className="mt-2.5 text-xs font-semibold tracking-[0.14em] text-muted uppercase">{stat.label}</p>
            </div>
          ))}
          <div className={tile}>
            <p className="flex items-center gap-2 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-bold text-ink tabular-nums">
              {/* Stars announces the rating ("Rated 4.9 out of 5") */}
              <span aria-hidden="true">{trust.rating.value}</span>
              <Stars rating={trust.rating.value} className="[&_svg]:size-[18px]" />
            </p>
            <p className="mt-2.5 text-xs font-semibold tracking-[0.14em] text-muted uppercase">{trust.rating.label}</p>
          </div>
        </Reveal>

        <Reveal className={`${tile} lg:col-span-5`} delay={0.1}>
          <h3 className="heading-3 text-ink">{trust.credentials.title}</h3>
          <ul className="mt-4 grid gap-3">
            {trust.credentials.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-text">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

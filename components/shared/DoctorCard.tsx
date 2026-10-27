import * as React from "react";
import { ArrowRight, Award, BadgeCheck, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import type { SectionLook, SectionTone, Stat } from "@/content/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { textStyles } from "@/components/ui/text-styles";
import { AppointmentButton, type LinkLook } from "@/components/shared/AppointmentButton";
import { DoctorPortrait } from "@/components/shared/DoctorPortrait";

type DoctorIcon = "badge-check" | "award" | "graduation-cap" | "stethoscope";

const icons: Record<DoctorIcon, LucideIcon> = {
  "badge-check": BadgeCheck,
  award: Award,
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
};

type DoctorCardProps = {
  id: string;
  tone?: SectionTone;
  look?: SectionLook;
  /** Small label above the name, e.g. "LEAD SURGEON". */
  label: string;
  name: string;
  title?: string;
  /** Large opening line above the bio (classic look). */
  lead?: string;
  bio: string;
  /** One phrase of the bio set in italic accent (must appear in `bio` exactly). */
  emphasis?: string;
  /** Chips under the name (soft look). */
  badges?: readonly { icon: DoctorIcon; label: string }[];
  /** Label / value cards under the bio (classic look). */
  credentials?: readonly { icon: DoctorIcon; label: string; value: string }[];
  /** The appointment button (optional: a page may show only `link`). */
  cta?: { label: string; service: AppointmentService };
  /** A plain link button after (or instead of) the appointment button, e.g. "View Full Profile". */
  link?: { label: string; href: string };
  /** Figures under the title that count up, e.g. "15+ Years · Clinical Experience" (soft look). */
  stats?: readonly Stat[];
  /** The page's own button styling instead of the Button (classic look). */
  ctaLook?: LinkLook;
  image: { src: string; alt: string };
};

function renderBio(bio: string, emphasis?: string) {
  if (!emphasis) return bio;
  const at = bio.indexOf(emphasis);
  if (at === -1) return bio;
  return (
    <>
      {bio.slice(0, at)}
      <em className="font-serif text-accent italic">{emphasis}</em>
      {bio.slice(at + emphasis.length)}
    </>
  );
}

/**
 * The doctor section, shared by every page and themed by its page: portrait in a tall
 * arch with a soft glow (slight parallax on desktop), then the text column and the
 * appointment button. soft: label, name, title, badges, bio; phones show the portrait
 * (70vw, centred) first. classic: label, name, lead line, bio and credential cards,
 * revealed one after another.
 */
export function DoctorCard(props: DoctorCardProps) {
  const { id, tone = "surface", look = "soft", image } = props;
  const titleId = `${id}-title`;
  const classic = look === "classic";

  return (
    <Section id={id} tone={tone} aria-labelledby={titleId} className="overflow-hidden">
      <div className={cn("grid items-center lg:grid-cols-12 lg:gap-16", classic ? "gap-14" : "gap-12")}>
        <Reveal className="lg:col-span-5">
          {classic ? (
            <DoctorPortrait image={image} glowClassName="bg-teal/30" />
          ) : (
            <DoctorPortrait
              image={image}
              glowClassName="bg-accent-glow/45"
              className="max-lg:w-[70vw] max-lg:max-w-[360px]"
              sizes="(min-width: 1024px) 420px, 70vw"
            />
          )}
        </Reveal>

        {classic ? <ClassicText {...props} titleId={titleId} /> : <SoftText {...props} titleId={titleId} />}
      </div>
    </Section>
  );
}

type TextProps = DoctorCardProps & { titleId: string };

function SoftText({ label, name, title, bio, emphasis, badges, stats, cta, link, titleId }: TextProps) {
  return (
    <Reveal className="lg:col-span-7" delay={0.08}>
      <Eyebrow>{label}</Eyebrow>
      <h2 id={titleId} className={textStyles.title.soft}>
        {name}
      </h2>
      {title ? <p className="mt-2 text-lg font-semibold text-muted">{title}</p> : null}
      {badges?.length ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {badges.map((b) => (
            <li key={b.label}>
              <Chip icon={icons[b.icon]}>{b.label}</Chip>
            </li>
          ))}
        </ul>
      ) : null}
      {stats?.length ? (
        <ul className="mt-6 grid max-w-md grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <li key={s.label} className="rounded-xl bg-surface p-4 ring-1 shadow-soft-sm ring-line md:p-5">
              <p className="font-display text-[1.75rem] leading-none font-semibold text-accent md:text-[2rem]">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} delay={0.3 + i * 0.15} reserveWidth />
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-6 measure text-[1.0625rem] leading-[1.8] text-text md:text-lg">{renderBio(bio, emphasis)}</p>
      {link ? (
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap">
          {cta ? <AppointmentButton {...cta} arrow fullWidthOnMobile /> : null}
          <Button
            href={link.href}
            cta={link.label}
            variant={cta ? "secondary" : "primary"}
            icon={ArrowRight}
            fullWidthOnMobile
          >
            {link.label}
          </Button>
        </div>
      ) : cta ? (
        // Pages without a link keep exactly this markup.
        <div className="mt-8">
          <AppointmentButton {...cta} arrow fullWidthOnMobile />
        </div>
      ) : null}
    </Reveal>
  );
}

function ClassicText({ label, name, lead, bio, credentials, cta, ctaLook, titleId }: TextProps) {
  return (
    <Reveal stagger className="lg:col-span-7">
      <Eyebrow variant="classic">{label}</Eyebrow>
      <h2 id={titleId} className={textStyles.title.classic}>
        {name}
      </h2>
      {lead ? <p className="mt-6 text-[1.375rem] leading-[1.5] font-medium text-ink">{lead}</p> : null}
      <p className="mt-4 max-w-[60ch] type-body text-muted">{bio}</p>
      {credentials?.length ? (
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {credentials.map((c) => {
            const Icon = icons[c.icon];
            return (
              <div key={c.label} className="rounded-[20px] border border-border bg-white p-5 shadow-card">
                <dt className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="type-eyebrow text-[11.5px] text-muted">{c.label}</span>
                </dt>
                <dd className="mt-2 pl-14 font-semibold text-ink">{c.value}</dd>
              </div>
            );
          })}
        </dl>
      ) : null}
      {cta ? (
        <div className="mt-9">
          <AppointmentButton {...cta} look={ctaLook} arrow />
        </div>
      ) : null}
    </Reveal>
  );
}

import * as React from "react";
import { Award, BadgeCheck, type LucideIcon } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import type { SectionTone } from "@/content/types";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { DoctorPortrait } from "@/components/shared/DoctorPortrait";

export type DoctorBadgeIcon = "badge-check" | "award";

const badgeIcons: Record<DoctorBadgeIcon, LucideIcon> = {
  "badge-check": BadgeCheck,
  award: Award,
};

type DoctorCardProps = {
  id: string;
  tone?: SectionTone;
  /** Small label above the name, e.g. "LEAD SURGEON". */
  label: string;
  name: string;
  title?: string;
  bio: string;
  /** One phrase of the bio set in italic accent (must appear in `bio` exactly). */
  emphasis?: string;
  badges?: readonly { icon: DoctorBadgeIcon; label: string }[];
  cta: { label: string; service: AppointmentService };
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
 * arch with a soft glow (slight parallax on desktop), then label, name, title, badges,
 * bio and the appointment button. Phones: portrait (70vw, centred) first.
 */
export function DoctorCard({ id, tone = "surface", label, name, title, bio, emphasis, badges, cta, image }: DoctorCardProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} tone={tone} aria-labelledby={titleId} className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <DoctorPortrait
            image={image}
            glowClassName="bg-accent-glow/45"
            className="max-lg:w-[70vw] max-lg:max-w-[360px]"
            sizes="(min-width: 1024px) 420px, 70vw"
          />
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <Eyebrow>{label}</Eyebrow>
          <h2 id={titleId} className="heading-2 mt-4 text-ink">
            {name}
          </h2>
          {title ? <p className="mt-2 text-lg font-semibold text-muted">{title}</p> : null}
          {badges?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li key={b.label}>
                  <Chip icon={badgeIcons[b.icon]}>{b.label}</Chip>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="measure mt-6 text-[1.0625rem] leading-[1.8] text-text md:text-lg">{renderBio(bio, emphasis)}</p>
          <div className="mt-8">
            <AppointmentButton {...cta} arrow fullWidthOnMobile />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

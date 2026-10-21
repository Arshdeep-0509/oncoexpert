import Image from "next/image";
import { overview } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { textStyles } from "@/components/ui/text-styles";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { contentIcons } from "@/components/pages/robotic-surgery/content-icons";

// Floating loops: 5–7s, each with its own phase.
const FLOATS = [
  { duration: "5.2s", delay: "-1.1s" },
  { duration: "6.4s", delay: "-3.7s" },
  { duration: "5.8s", delay: "-0.4s" },
  { duration: "7s", delay: "-4.9s" },
];

function Badge({ label, icon, className }: { label: string; icon: keyof typeof contentIcons; className?: string }) {
  const Icon = contentIcons[icon];
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-white py-2.5 pr-4 pl-2.5 text-[15px] leading-snug font-semibold text-ink shadow-card",
        className,
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10">
        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </span>
      {label}
    </div>
  );
}

export function IntroSection() {
  return (
    <Section id="overview" tone="white" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal stagger>
          <Eyebrow variant="classic">{overview.eyebrow}</Eyebrow>
          <h2 className={textStyles.title.classic}>
            {overview.headingLead} <span className="text-primary">{overview.headingHighlight}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] type-body text-muted">{overview.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <AppointmentButton {...overview.ctas.primary} look={pillLook.primary} arrow />
            <AppointmentButton {...overview.ctas.secondary} look={pillLook.outline} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-[460px]">
            {/* White-background photo on a white section (multiply as a safety net). */}
            <div className="relative aspect-[4/5]">
              <Image
                src={overview.image.src}
                alt={overview.image.alt}
                fill
                sizes="(min-width: 520px) 460px, 100vw"
                className="object-cover object-[50%_48%] blend-on-light"
              />
            </div>

            {/* Tablet and desktop: floating cards around the robot */}
            <ul className="hidden md:block">
              {overview.badges.map((b, i) => (
                <li key={b.label} className="absolute" style={{ left: `${b.position.x}%`, top: `${b.position.y}%` }}>
                  <div
                    className="motion-safe:animate-float"
                    style={
                      {
                        "--float-duration": FLOATS[i % FLOATS.length].duration,
                        animationDelay: FLOATS[i % FLOATS.length].delay,
                      } as React.CSSProperties
                    }
                  >
                    <Badge label={b.label} icon={b.icon} className="-translate-x-1/2 whitespace-nowrap" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Phones: 2×2 grid; the cards keep the same gentle float */}
          <ul className="mt-8 grid grid-cols-2 gap-3 md:hidden">
            {overview.badges.map((b, i) => (
              <li key={b.label}>
                <div
                  className="h-full motion-safe:animate-float"
                  style={
                    {
                      "--float-duration": FLOATS[i % FLOATS.length].duration,
                      animationDelay: FLOATS[i % FLOATS.length].delay,
                    } as React.CSSProperties
                  }
                >
                  <Badge label={b.label} icon={b.icon} className="h-full" />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

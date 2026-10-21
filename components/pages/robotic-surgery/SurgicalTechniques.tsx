import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { techniques } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const lift = "h-full transition-[translate,box-shadow] duration-500 ease-out-expo motion-safe:hover:-translate-y-1";

export function SurgicalTechniques() {
  const [robotic, laparoscopic] = techniques.items;
  const img = techniques.roboticImage;

  return (
    <Section id="techniques" tone="white">
      <Reveal>
        <SectionHeading variant="classic" title={techniques.heading} intro={techniques.intro} />
      </Reveal>

      <Reveal
        stagger
        className="mt-14 grid gap-6 lg:grid-cols-12"
        itemClassName="first:lg:col-span-7 last:lg:col-span-5"
      >
        {/* Robotic: pure black card, rotating teal conic border, arms photo bottom-right */}
        <article
          data-tone="black"
          className={cn(
            lift,
            "relative isolate flex flex-col overflow-hidden rounded-[24px] text-white shadow-[0_24px_60px_-28px_rgb(0_0_0/0.55)] border-conic hover:shadow-[0_32px_70px_-28px_rgb(0_0_0/0.65)] motion-safe:animate-border-spin lg:min-h-[600px]",
          )}
        >
          <div className="relative z-10 p-8 lg:max-w-[54%] lg:p-10">
            <span className="inline-flex rounded-full border border-glow/30 bg-glow/10 px-3 py-1 text-xs font-semibold tracking-wide text-glow">
              {robotic.tag}
            </span>
            <h3 className="mt-5 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.015em]">
              {robotic.title}
            </h3>
            <p className="mt-3 text-white/70">{robotic.body}</p>
            <ul className="mt-7 grid gap-3.5">
              {robotic.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-snug text-white/90">
                  <CircleCheck
                    className="mt-0.5 size-[18px] shrink-0 text-glow"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Black-background photo on a pure black card; edges fade where the arms leave the frame. */}
          <div className="relative mt-auto -mb-px aspect-[1200/839] w-full self-end md:-mt-6 md:w-[70%] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[62%]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1304px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="[mask-image:radial-gradient(ellipse_115%_105%_at_100%_100%,black_50%,transparent_96%)] object-contain"
            />
          </div>
        </article>

        {/* Laparoscopic: white card */}
        <article
          className={cn(
            lift,
            "rounded-[24px] border border-border bg-white p-8 shadow-card hover:shadow-card-hover lg:p-10",
          )}
        >
          <span className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-semibold tracking-wide text-muted">
            {laparoscopic.tag}
          </span>
          <h3 className="mt-5 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.015em] text-ink">
            {laparoscopic.title}
          </h3>
          <p className="mt-3 text-muted">{laparoscopic.body}</p>
          <ul className="mt-7 grid gap-3.5">
            {laparoscopic.features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px] leading-snug text-ink">
                <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-muted" strokeWidth={1.75} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}

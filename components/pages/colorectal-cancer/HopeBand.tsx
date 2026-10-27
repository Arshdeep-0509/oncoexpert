import type * as React from "react";
import Image from "next/image";
import { HeartPulse } from "lucide-react";
import { advancedCases } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { Counter } from "@/components/ui/Counter";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import "@/components/pages/colorectal-cancer/hope.css";

/** The title in two lines (a layout split only; the words are the content's). */
const words = advancedCases.title.split(" ");
const lines = [words.slice(0, Math.floor(words.length / 2)), words.slice(Math.floor(words.length / 2))].map((l) =>
  l.join(" "),
);

/**
 * 7 · #advanced-cases "Hope for Advanced Cases": a dark, cinematic band with a deep teal light. The
 * title rises line by line; beside it a portrait card, and over its lower-left corner the 60%
 * counting up inside a slowly breathing glow. "Discuss Curative Strategy" opens the form on "Second Opinion" with the
 * note "Curative strategy". Desktop: text left, figure right; phones: text, then the figure.
 */
export function HopeBand() {
  const photo = colorectalImages[advancedCases.image];
  const { stat } = advancedCases;
  return (
    <section
      id="advanced-cases"
      aria-labelledby="advanced-title"
      data-tone="ink"
      className="cxh-band relative isolate overflow-hidden bg-ink py-(--section-y) text-white"
    >
      {/* a deep teal light behind the figure */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-[-20%] -z-10 size-[110vw] max-w-[1100px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent-bright)_22%,transparent),transparent)] lg:right-[-10%] lg:size-[70vw]"
      />

      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <p className="inline-flex min-h-8 items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs leading-tight font-semibold tracking-[0.14em] text-accent-glow uppercase ring-1 ring-white/15">
            <HeartPulse className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {advancedCases.eyebrow}
          </p>
          <InView className="cxh-title" threshold={0.6}>
            <h2
              id="advanced-title"
              className="mt-6 font-display text-[clamp(2.2rem,9vw,2.75rem)] leading-[1.05] tracking-(--display-tracking) text-white md:text-[3.5rem] lg:text-[4rem]"
            >
              {lines.map((line, i) => (
                <span key={line} className="cxh-lineMask">
                  <span className="cxh-line" style={{ "--i": i } as React.CSSProperties}>
                    {i > 0 ? " " : null}
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </InView>
          <p className="mt-6 measure text-base text-white/80 md:text-lg">{advancedCases.body}</p>
          <div className="mt-8">
            <AppointmentButton {...advancedCases.cta} variant="onDark" arrow fullWidthOnMobile />
          </div>
        </div>

        {/* The portrait card, and the figure in its glow over its lower-left corner (decorative:
            the sentence above carries the 60%) */}
        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-[440px] pb-16 pl-10 md:pl-16 lg:col-span-5 lg:mr-0 lg:pb-12"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 shadow-soft-lg ring-white/10">
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover"
              style={{ objectPosition: photo.focal }}
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,color-mix(in_srgb,var(--ink)_80%,transparent))]" />
          </div>
          <div className="absolute bottom-0 left-0 grid size-44 place-items-center md:size-52">
            <span className="cxh-glow absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent-bright)_60%,transparent),transparent)]" />
            <span className="absolute inset-0 rounded-full bg-ink/85 ring-1 shadow-soft-lg ring-white/15" />
            <div className="relative text-center">
              <p className="font-display text-[3.25rem] leading-none font-semibold text-white md:text-[3.75rem]">
                <Counter value={stat.value} suffix={stat.suffix} duration={2} reserveWidth />
              </p>
              <p className="mx-auto mt-2 max-w-[8.5rem] text-[13px] leading-snug text-white/80">{stat.label}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

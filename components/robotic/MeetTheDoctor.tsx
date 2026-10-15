"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { doctor } from "@/content/robotic-surgery";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { pillPrimary } from "@/components/ui/buttons";
import { AppointmentButton } from "@/components/robotic/AppointmentButton";
import { ContentIconView } from "@/components/robotic/icons";

/**
 * The portrait's studio backdrop, sampled from the photo's top row (left → right) and
 * darkening downward like the original, so the zoomed-out photo blends in seamlessly.
 */
const PORTRAIT_BACKDROP = [
  "linear-gradient(to bottom, transparent 25%, rgb(10 18 30 / 0.22))",
  "linear-gradient(to right, #4c5a6d 0%, #5a6a7f 10%, #68788f 20%, #73859d 30%, #7a8ba3 40%, #7c8ca4 50%, #7889a1 60%, #70829b 70%, #65768e 80%, #59697f 90%, #4d5b70 100%)",
].join(", ");

export function MeetTheDoctor() {
  const reduce = useReducedMotion();
  const frameRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  // Slow parallax: the photo drifts ~40px inside its arch as the section scrolls past.
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const [lead, rest] = doctor.paragraphs;
  const img = doctor.image;

  return (
    <Section id="doctor" tone="surface" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div ref={frameRef} className="relative mx-auto w-full max-w-[420px]">
            {/* Soft teal glow behind the frame */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-16 -bottom-6 -z-10 rounded-[200px_200px_24px_24px] bg-teal/30 blur-[60px]"
            />
            {/* The frame is filled with the portrait's own studio backdrop (sampled from the photo),
                so the photo can sit zoomed-out inside the arch: head clear of the curve,
                shoulders in frame, and its edges fading invisibly into the backdrop. */}
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[200px_200px_24px_24px] border border-white shadow-[0_30px_60px_-30px_rgb(10_22_40/0.45)]"
              style={{ background: PORTRAIT_BACKDROP }}
            >
              <motion.div className="absolute inset-x-[4%] top-[14%] -bottom-6" style={{ y: reduce ? 0 : y }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 480px) 400px, 92vw"
                  className="object-contain object-bottom"
                  style={{
                    // sides fade  ∩  (long top fade  ∪  short fade around the head, which reaches the photo's top edge)
                    maskImage: [
                      "linear-gradient(to right, transparent, black 9%, black 91%, transparent)",
                      "linear-gradient(to bottom, transparent 1.5%, black 24%)",
                      "radial-gradient(ellipse 24% 18% at 50% 0%, black 55%, transparent 100%)",
                    ].join(", "),
                    maskComposite: "intersect, add, add",
                    WebkitMaskComposite: "source-in, source-over, source-over",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </Reveal>

        <Reveal stagger className="lg:col-span-7">
          <Eyebrow>{doctor.eyebrow}</Eyebrow>
          <h2 className="type-h2 mt-4 text-ink">{doctor.heading}</h2>
          <p className="mt-6 text-[1.375rem] leading-[1.5] font-medium text-ink">{lead}</p>
          <p className="type-body mt-4 max-w-[60ch] text-muted">{rest}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {doctor.credentials.map((c) => (
              <div key={c.label} className="rounded-[20px] border border-border bg-white p-5 shadow-card">
                <dt className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10">
                    <ContentIconView name={c.icon} className="size-5" />
                  </span>
                  <span className="type-eyebrow text-[11.5px] text-muted">{c.label}</span>
                </dt>
                <dd className="mt-2 pl-14 font-semibold text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9">
            <AppointmentButton {...doctor.cta} className={pillPrimary} arrow />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

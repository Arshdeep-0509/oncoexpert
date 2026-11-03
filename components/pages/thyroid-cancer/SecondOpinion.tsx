import type * as React from "react";
import Image from "next/image";
import { secondOpinion } from "@/content/pages/thyroid-cancer";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import "@/components/pages/thyroid-cancer/second-opinion.css";

/** Class names in second-opinion.css (prefix ty-). */
const styles = {
  list: "ty-bring",
  item: "ty-bringItem",
  tick: "ty-bringTick",
} as const;

const photo = thyroidImages[secondOpinion.image];

/**
 * 10 · #second-opinion "Unsure about your diagnosis?": an indigo band with the live question and
 * line, the "Get Second Opinion" button, and beside them a NEW "What to bring" checklist (PENDING
 * DOCTOR) whose items tick one after another once in view.
 */
export function SecondOpinion() {
  return (
    <section
      id="second-opinion"
      aria-labelledby="second-opinion-title"
      className="on-dark relative isolate overflow-hidden bg-ink bg-(image:--grad-plum) py-(--section-y) text-white"
    >
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-15"
        style={{ objectPosition: photo.focal }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(31_28_77/0.96)_35%,rgb(52_47_124/0.8))]"
      />
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 id="second-opinion-title" className="heading-2 text-white">
            {secondOpinion.title}
          </h2>
          <p className="mt-4 measure text-lg text-white/85 md:text-xl">{secondOpinion.body}</p>
          <div className="mt-8">
            <AppointmentButton {...secondOpinion.cta} variant="onDark" arrow fullWidthOnMobile />
          </div>
        </div>
        <InView
          threshold={0.5}
          className="rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur-sm md:p-8 lg:col-span-5"
        >
          <h3 className="font-display text-2xl text-white">{secondOpinion.bring.title}</h3>
          <ul className={`${styles.list} mt-5 grid gap-4`}>
            {secondOpinion.bring.items.map((item, i) => (
              <li
                key={item}
                className={`${styles.item} flex items-center gap-4 text-base text-white/90 md:text-lg`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-glow/15 ring-1 ring-accent-glow/40"
                >
                  <svg viewBox="0 0 24 24" className="size-5">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      pathLength={1}
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${styles.tick} stroke-accent-glow`}
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </InView>
      </Container>
    </section>
  );
}

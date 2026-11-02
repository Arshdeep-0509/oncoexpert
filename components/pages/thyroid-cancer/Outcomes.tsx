import Image from "next/image";
import { outcomes } from "@/content/pages/thyroid-cancer";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurvivalChart } from "@/components/shared/SurvivalChart";
import "@/components/pages/thyroid-cancer/outcomes.css";

/** Class names in outcomes.css (prefix ty-). */
const styles = {
  overall: "ty-overall",
  figure: "ty-overallFigure",
} as const;

const photo = thyroidImages[outcomes.image];

/**
 * 7 · #outcomes "Unrivaled Clinical Outcomes": the shared SurvivalChart (Stage I & II 100, III 94,
 * IV 82; stacked rows for the live labels) beside the overall 98.5% as its own large figure with
 * its live caption. The overall figure is stated, never computed from the stages (PENDING DOCTOR).
 * It is shown as written (no count-up: the counter rounds) and fades up once in view.
 */
export function Outcomes() {
  return (
    <section id="outcomes" aria-labelledby="outcomes-title" className="bg-surface-alt py-(--section-y)">
      <Container>
        <SectionHeading id="outcomes-title" title={outcomes.title} intro={outcomes.intro} />
        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <SurvivalChart
            className="rounded-2xl bg-surface p-3 ring-1 shadow-soft-sm ring-line md:p-5 lg:col-span-7"
            rows={outcomes.stages}
            unit={outcomes.unit}
            caption={outcomes.a11y.survival}
            labels={{ row: outcomes.a11y.row, value: outcomes.a11y.rate }}
            stacked
          />
          <InView
            threshold={0.4}
            className={`${styles.overall} relative isolate overflow-hidden rounded-2xl bg-ink p-7 text-white shadow-soft-lg md:p-9 lg:col-span-5`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="-z-10 object-cover opacity-35"
              style={{ objectPosition: photo.focal }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_28_77/0.35),rgb(31_28_77/0.92))]"
            />
            <p
              className={`${styles.figure} pt-16 font-display text-[4rem] leading-none font-semibold md:pt-24 md:text-[5.5rem]`}
            >
              {outcomes.overall.value}
              {outcomes.overall.suffix}
            </p>
            <p className="mt-3 text-xl font-semibold">{outcomes.overall.label}</p>
            <p className="mt-2 measure text-base leading-relaxed text-white/80">{outcomes.overall.note}</p>
          </InView>
        </div>
      </Container>
    </section>
  );
}

import { whyRobotic } from "@/content/pages/robotic-surgery";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { textStyles } from "@/components/ui/text-styles";

export function RoboticsInOncology() {
  const [p1, p2, p3] = whyRobotic.paragraphs;

  return (
    <Section id="why-robotic" tone="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow variant="classic">{whyRobotic.eyebrow}</Eyebrow>
          <h2 className={textStyles.title.classic}>{whyRobotic.heading}</h2>
        </Reveal>

        <Reveal stagger className="lg:col-span-7">
          <p className="text-[1.375rem] leading-[1.55] font-medium tracking-[-0.005em] text-ink">{p1}</p>
          <p className="mt-6 type-body text-text">{p2}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {whyRobotic.specialties.map((s) => (
              <li
                key={s}
                className="rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgb(10_22_40/0.04)]"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 type-body text-muted">{p3}</p>
        </Reveal>
      </div>
    </Section>
  );
}

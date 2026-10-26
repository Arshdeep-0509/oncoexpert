import { qualityOfLife } from "@/content/pages/colorectal-cancer";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StomaChart } from "@/components/pages/colorectal-cancer/StomaChart";

/**
 * 5 · #quality-of-life "Focus on Quality of Life": the ISR text and the 60 / 36 / 4 stoma outcomes
 * on the blue band. Desktop: text left, donut and legend right. Phones: the text, then the donut,
 * then the legend as three rows. Screen readers get the figures as a table.
 */
export function QualityOfLife() {
  return (
    <Section
      id="quality-of-life"
      tone="plum"
      aria-labelledby="quality-title"
      className="relative isolate overflow-hidden"
    >
      {/* soft teal light, top right */}
      <span
        aria-hidden="true"
        className="absolute -top-1/4 -right-1/4 -z-10 size-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent-bright)_28%,transparent),transparent)]"
      />
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 id="quality-title" className="heading-2 text-white">
            {qualityOfLife.title}
          </h2>
          <p className="mt-4 font-display text-xl text-accent-glow md:text-2xl">{qualityOfLife.subtitle}</p>
          <p className="mt-5 measure text-base text-white/80 md:text-lg">{qualityOfLife.body}</p>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <table className="sr-only">
            <caption>{qualityOfLife.a11y.chart}</caption>
            <thead>
              <tr>
                <th scope="col">{qualityOfLife.a11y.outcome}</th>
                <th scope="col">{qualityOfLife.a11y.share}</th>
              </tr>
            </thead>
            <tbody>
              {qualityOfLife.stoma.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>
                    {s.value}
                    {s.suffix}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <StomaChart stats={qualityOfLife.stoma} />
        </Reveal>
      </div>
    </Section>
  );
}

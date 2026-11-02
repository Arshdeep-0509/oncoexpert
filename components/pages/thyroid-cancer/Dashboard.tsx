import { dashboard } from "@/content/pages/thyroid-cancer";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { Gauge } from "@/components/pages/thyroid-cancer/Gauge";
import { VoiceWave } from "@/components/pages/thyroid-cancer/VoiceWave";
import "@/components/pages/thyroid-cancer/dashboard.css";

/** Class names in dashboard.css (prefix tyd-). */
const styles = {
  panel: "tyd-panel",
  card: "tyd-card",
} as const;

const STAGGER = 0.2;

/**
 * 6 · #dashboard "Surgical Performance Dashboard": a dark indigo band like a calm instrument
 * panel. Three semicircle gauges (100% Complete Removal, 0% Permanent Voice Change, 2%
 * Hypocalcemia) sweep and count up once in view, each live note under its gauge. The 0% gauge
 * shows a check and a flat-then-steady voice line instead of an arc. The note on hypocalcemia is
 * shown as live, with no comparison figure (PENDING DOCTOR). Phones: the gauges stacked. The
 * cards are decorative for screen readers; a visually hidden table carries the figures.
 */
export function Dashboard() {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-title"
      className="on-dark relative isolate overflow-hidden bg-ink bg-(image:--grad-plum) py-(--section-y) text-white"
    >
      {/* A faint panel grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[40px_40px]"
      />
      <Container>
        <h2 id="dashboard-title" className="text-center heading-2 text-white">
          {dashboard.title}
        </h2>

        {/* In a div: a table ignores sr-only's 1px width and would widen the page. */}
        <div className="sr-only">
          <table>
            <caption>{dashboard.a11y.table}</caption>
            <thead>
              <tr>
                <th scope="col">{dashboard.a11y.figure}</th>
                <th scope="col">{dashboard.a11y.value}</th>
                <th scope="col">{dashboard.a11y.note}</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.stats.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>
                    {s.value}
                    {s.suffix}
                  </td>
                  <td>{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InView
          threshold={0.3}
          className={`${styles.panel} mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6`}
        >
          {dashboard.stats.map((s, i) => (
            <div
              key={s.label}
              aria-hidden="true"
              className={`${styles.card} flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/12 backdrop-blur-sm md:p-7`}
            >
              <Gauge value={s.value} suffix={s.suffix} delay={0.2 + i * STAGGER} />
              {s.value === 0 ? <VoiceWave /> : null}
              <p className="mt-5 text-center text-lg font-semibold text-white">{s.label}</p>
              <p className="mx-auto mt-2 max-w-[34ch] text-center text-base leading-relaxed text-white/75">{s.note}</p>
            </div>
          ))}
        </InView>
      </Container>
    </section>
  );
}

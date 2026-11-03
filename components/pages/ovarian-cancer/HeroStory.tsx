import type * as React from "react";
import {
  CANAL_PATH,
  CHECK_CIRCLE,
  CHECK_PATH,
  OVARIES,
  RING_PATH,
  TUMOURS,
  UTERUS_PATH,
  WAVES,
} from "@/components/pages/ovarian-cancer/ribbon-art";
import { styles } from "@/components/pages/ovarian-cancer/hero-styles";

/**
 * The treatment story inside the ribbon, as SVG (hero.css runs it once, after the ribbon draws):
 * the uterus draws; tumour deposits appear on the left ovary; a precision ring finds them and they
 * are removed one by one (cytoreductive surgery); warm waves wash through the abdomen (HIPEC);
 * a check draws at the centre and both ovaries glow (recovery). The default CSS is the end: the
 * deposits gone, the waves, the check and the glow shown, so reduced motion shows the outcome.
 */
export function HeroStory() {
  return (
    <g>
      <defs>
        <linearGradient id="ov-wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--accent-bright)" }} />
        </linearGradient>
      </defs>

      {/* The uterus and the canal, hanging from the tubes */}
      <path
        d={UTERUS_PATH}
        pathLength={1}
        fill="none"
        style={{ stroke: "var(--highlight)" }}
        strokeWidth="3"
        strokeLinecap="round"
        className={styles.uterus}
      />
      <path
        d={CANAL_PATH}
        pathLength={1}
        fill="none"
        style={{ stroke: "var(--highlight)" }}
        strokeWidth="3"
        strokeLinecap="round"
        className={styles.uterus}
      />

      {/* Recovery glow behind both ovaries */}
      {OVARIES.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="34" className={styles.glow} style={{ fill: "var(--accent-glow)" }} />
      ))}

      {/* Cytoreduction: the ring, then each deposit removed in turn */}
      <path
        d={RING_PATH}
        pathLength={1}
        fill="none"
        style={{ stroke: "var(--accent)" }}
        strokeWidth="2"
        className={styles.ring}
      />
      {TUMOURS.map(([cx, cy, r], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          className={styles.tumour}
          style={{ fill: "var(--gold)", "--i": i } as React.CSSProperties}
        />
      ))}

      {/* HIPEC: warm waves through the abdomen */}
      <g className={styles.waves}>
        {WAVES.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            fill="none"
            stroke="url(#ov-wave-grad)"
            strokeWidth={4 - i}
            strokeLinecap="round"
            strokeOpacity={0.9 - i * 0.2}
            className={styles.wave}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </g>

      {/* Recovery: the check */}
      <g className={styles.check}>
        <circle
          cx={CHECK_CIRCLE.cx}
          cy={CHECK_CIRCLE.cy}
          r={CHECK_CIRCLE.r}
          style={{ fill: "var(--surface)", stroke: "var(--accent)" }}
          strokeWidth="3"
        />
        <path
          d={CHECK_PATH}
          pathLength={1}
          fill="none"
          style={{ stroke: "var(--accent)" }}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.checkMark}
        />
      </g>
    </g>
  );
}

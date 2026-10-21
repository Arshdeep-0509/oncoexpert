import { insideTheRobot, type ShowcaseStep } from "@/content/pages/robotic-surgery";

// The camera maths behind the Inside the Robot tour: which photo layer shows when, and how
// each step frames its machine. Pure functions, shared by the scroll tour and the card list.

export const steps = insideTheRobot.steps as readonly ShowcaseStep[];
export const N = steps.length;
export const FADE = 0.05; // half-width of each crossfade, in scroll progress

/** Scroll progress at which step i is centred, and the midpoint between i and i+1. */
export const center = (i: number) => i / (N - 1);
export const boundary = (i: number) => (i + 0.5) / (N - 1);

/** Consecutive steps that share a photo become one layer (so 01 → 02 is a zoom, not a cut). */
export type Layer = { image: ShowcaseStep["image"]; from: number; to: number };
export const layers: Layer[] = steps.reduce<Layer[]>((acc, step, i) => {
  const last = acc[acc.length - 1];
  if (last && last.image.src === step.image.src) last.to = i;
  else acc.push({ image: step.image, from: i, to: i });
  return acc;
}, []);

export const edgeFade = "[mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,black_60%,transparent_100%)]";

/* ------------------------------------------------------------------------------------
 * Framing: every step shows its machine at the same on-screen height, centred.
 * Geometry is worked out from the stage size (measured) and each machine's box in its
 * photo (content), so it holds on every screen size.
 * ---------------------------------------------------------------------------------- */

export type Size = { w: number; h: number };
type Box = { x: number; y: number; w: number; h: number };

const MAX_W = 0.84; // a machine may use up to 84% of the stage width…
const MAX_H = 0.62; // …and 62% of its height

/** The machine a step features (explicit, or the photo's own subject, or the whole photo). */
const machineOf = (s: ShowcaseStep): Box =>
  s.machine ?? ("subject" in s.image && s.image.subject ? s.image.subject : { x: 0, y: 0, w: 100, h: 100 });

const aspectOf = (img: ShowcaseStep["image"]) => img.width / img.height;

/** The photo contained in the stage, before any zoom. */
export function baseBox(img: ShowcaseStep["image"], stage: Size): Size {
  const a = aspectOf(img);
  const h = Math.min(stage.h, stage.w / a);
  return { w: h * a, h };
}

/** One common machine height (px) for all non-overview steps: the largest that fits them all. */
function targetHeight(stage: Size): number {
  return Math.min(
    MAX_H * stage.h,
    ...steps
      .filter((s) => !s.overview)
      .map((s) => {
        const m = machineOf(s);
        const ratio = (m.w / m.h) * aspectOf(s.image); // machine width : height, in pixels
        return (MAX_W * stage.w) / (ratio * (s.size ?? 1));
      }),
  );
}

/** Spotlight: dark shades left and right of the machine (edges in % of the photo box). */
export type Spot = { half: number; fade: number };
type Frame = { scale: number; x: string; y: string; spot: Spot };

/** Zoom + shift (relative to the base box) that puts this step's machine centre-stage. */
export function frameFor(step: ShowcaseStep, stage: Size): Frame {
  const m = machineOf(step);
  const box = baseBox(step.image, stage);
  const k = step.overview
    ? Math.min((MAX_W * stage.w) / ((m.w / 100) * box.w), (MAX_H * stage.h) / ((m.h / 100) * box.h))
    : (targetHeight(stage) * (step.size ?? 1)) / ((m.h / 100) * box.h);
  const cx = m.x + m.w / 2;
  const cy = m.y + m.h / 2;
  return {
    scale: k,
    // translate % is of the (unscaled) box; scaling happens about the box centre
    x: `${-k * (cx - 50)}%`,
    y: `${-k * (cy - 50)}%`,
    // After the camera move the machine is centred, so its edges sit at 50% ± k·w/2 of the
    // box. Shades start just outside them (+0.6% of the photo) and are fully dark within
    // ~1.5% more, which is inside the ~2% gap to the neighbouring machine.
    spot: { half: k * (m.w / 2 + 0.6), fade: k * 0.9 },
  };
}

/** Dark left and right of the machine, clear over it (the machines stand side by side). */
export const spotlightGradient = ({ half, fade }: Spot) =>
  `linear-gradient(to right, black ${50 - half - fade}%, transparent ${50 - half}%, transparent ${50 + half}%, black ${50 + half + fade}%)`;

/**
 * The #pathway airway (viewBox 1000 × 160): one airway running left to right through the six
 * steps, rising and dipping gently between them, with a small bronchial fork at each step
 * (alternately above and below). The fork of a step draws once the journey reaches it.
 */

export const AIRWAY_BOX = { width: 1000, height: 160 } as const;

const COUNT = 6;
const X0 = 70;
const X1 = 930;
const MID = 80;
const SWING = 14;

/** Node i's point: evenly spaced, alternately a little above and below the middle. */
export const nodeAt = (i: number) => {
  const x = X0 + ((X1 - X0) * i) / (COUNT - 1);
  const y = MID + (i % 2 ? SWING : -SWING);
  return { x, y, left: `${(x / AIRWAY_BOX.width) * 100}%`, top: `${(y / AIRWAY_BOX.height) * 100}%` };
};

/** The airway: from the left edge through every node, each segment an S with flat tangents. */
export const AIRWAY_PATH = (() => {
  const pts = Array.from({ length: COUNT }, (_, i) => nodeAt(i));
  let d = `M20 ${pts[0].y} L${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < COUNT; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const half = (b.x - a.x) / 2;
    d += ` C${a.x + half} ${a.y} ${b.x - half} ${b.y} ${b.x} ${b.y}`;
  }
  return `${d} L980 ${pts[COUNT - 1].y}`;
})();

/** Step i's fork: two short branches leaving the node, away from the middle line. */
export const forkAt = (i: number) => {
  const { x, y } = nodeAt(i);
  const dir = i % 2 ? 1 : -1;
  const reach = 34 * dir;
  return `M${x} ${y} Q${x - 4} ${y + reach * 0.6} ${x - 20} ${y + reach} M${x} ${y} Q${x + 4} ${y + reach * 0.6} ${x + 20} ${y + reach}`;
};

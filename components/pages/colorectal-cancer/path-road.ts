/**
 * The #path road (desktop): six milestones in a 600 × 220 box and one smooth curve through them
 * (Catmull-Rom, as cubic Béziers). The milestone buttons sit on the same points, in % of the box.
 */
export const ROAD_BOX = { width: 600, height: 220 } as const;

export const MILESTONES = [
  { x: 36, y: 168 },
  { x: 140, y: 70 },
  { x: 248, y: 150 },
  { x: 356, y: 62 },
  { x: 462, y: 146 },
  { x: 564, y: 56 },
] as const;

const round = (n: number) => Math.round(n * 10) / 10;

/** One cubic segment per pair of milestones; the ends repeat their own point. */
export const ROAD_PATH = MILESTONES.slice(1).reduce((d, p2, i) => {
  const p0 = MILESTONES[i - 1] ?? MILESTONES[i];
  const p1 = MILESTONES[i];
  const p3 = MILESTONES[i + 2] ?? p2;
  const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
  const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
  return `${d} C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${p2.x} ${p2.y}`;
}, `M${MILESTONES[0].x} ${MILESTONES[0].y}`);

/** A milestone's position as CSS percentages of the road box. */
export const milestoneAt = (i: number) => ({
  left: `${(MILESTONES[i].x / ROAD_BOX.width) * 100}%`,
  top: `${(MILESTONES[i].y / ROAD_BOX.height) * 100}%`,
});

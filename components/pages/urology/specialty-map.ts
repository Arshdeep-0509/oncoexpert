import type { SpecialtyKey } from "@/content/pages/urology";

/*
 * The genitourinary map in a 360 × 450 box: abstract line art, front view (the patient's right
 * kidney on the left). Testicular and penile are discreet region markers only, never anatomy.
 * Each specialty lists the shapes it lights up and its hotspot: the pin's centre (cx, cy), the
 * button's width and which side of the pin its label sits.
 */

export const MAP_BOX = { width: 360, height: 450 } as const;

/** Mirror an x coordinate around the centre line. */
const mx = (x: number) => MAP_BOX.width - x;

const kidney = (m: (x: number) => number) =>
  `M${m(110)} 92 C ${m(84)} 92, ${m(70)} 114, ${m(72)} 138 C ${m(74)} 164, ${m(90)} 180, ${m(112)} 178 ` +
  `C ${m(128)} 176, ${m(133)} 162, ${m(125)} 150 C ${m(119)} 141, ${m(121)} 129, ${m(129)} 121 C ${m(139)} 107, ${m(132)} 92, ${m(110)} 92 Z`;

const adrenal = (m: (x: number) => number) =>
  `M${m(94)} 98 C ${m(96)} 80, ${m(114)} 72, ${m(128)} 86 C ${m(120)} 92, ${m(106)} 97, ${m(94)} 98 Z`;

const id = (x: number) => x;

export const SHAPES = {
  kidneys: [kidney(id), kidney(mx)],
  adrenals: [adrenal(id), adrenal(mx)],
  ureters: ["M125 152 C 142 196, 140 254, 164 300", `M${mx(125)} 152 C ${mx(142)} 196, ${mx(140)} 254, ${mx(164)} 300`],
  bladder: "M150 302 C 150 288, 210 288, 210 302 C 216 324, 206 348, 180 352 C 154 348, 144 324, 150 302 Z",
  prostate: { cx: 180, cy: 366, rx: 17, ry: 11 },
  urethra: "M180 377 L180 412",
  /** Region markers (a dot in a dashed ring). */
  markers: { testicular: { cx: 206, cy: 426 }, penile: { cx: 154, cy: 426 } },
} as const;

/** Which shapes each specialty lights up. */
export const LIGHTS: Record<SpecialtyKey, readonly (keyof typeof SHAPES | "testicular" | "penile")[]> = {
  kidney: ["kidneys"],
  prostate: ["prostate"],
  bladder: ["bladder"],
  testicular: ["testicular"],
  penile: ["penile"],
  adrenal: ["adrenals", "urethra"],
};

export type Hotspot = { cx: number; cy: number; w: number; side: "left" | "right" | "center" };

/** The pins, in map units. Buttons are at least 48px tall, centred on `cy`; a "left" button ends
 *  at the pin, a "right" one starts there, a "center" one is centred on it. */
export const HOTSPOTS: Record<SpecialtyKey, Hotspot> = {
  adrenal: { cx: 180, cy: 70, w: 150, side: "center" },
  kidney: { cx: 180, cy: 138, w: 150, side: "center" },
  bladder: { cx: 148, cy: 314, w: 136, side: "left" },
  prostate: { cx: 198, cy: 366, w: 152, side: "right" },
  penile: { cx: 154, cy: 426, w: 144, side: "left" },
  testicular: { cx: 206, cy: 426, w: 144, side: "right" },
};

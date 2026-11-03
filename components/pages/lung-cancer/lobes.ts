import type { LobeKey } from "@/content/pages/lung-cancer";

/**
 * The lobe explorer's drawing (viewBox 400 × 380): both lungs split into their five lobes. The
 * patient's right lung (viewer's left) has three lobes, divided by the horizontal and oblique
 * fissures; the left lung two. Shapes are stylised, not anatomical tracings.
 * `lift` is how far a lobe moves out when it is removed (px in the viewBox).
 */
export const LOBE_BOX = { width: 400, height: 380 } as const;

export const LOBE_SHAPES: Record<LobeKey, { d: string; lift: readonly [number, number] }> = {
  rightUpper: {
    d: "M176 112 C148 98 108 120 90 172 C88 180 87 188 88 196 L184 176 C184 150 181 130 176 112 Z",
    lift: [-18, -16],
  },
  rightMiddle: {
    d: "M88 196 L184 176 L184 214 L80 268 C78 240 82 214 88 196 Z",
    lift: [-26, 0],
  },
  rightLower: {
    d: "M80 268 L184 214 C184 246 186 290 182 312 C176 340 156 352 130 354 C104 356 84 350 78 326 C72 304 74 286 80 268 Z",
    lift: [-18, 16],
  },
  leftUpper: {
    d: "M224 112 C252 98 292 120 310 172 C316 190 320 206 322 220 L218 262 C216 210 214 160 224 112 Z",
    lift: [18, -16],
  },
  leftLower: {
    d: "M322 220 C328 260 330 300 322 326 C314 350 284 356 254 346 C238 340 236 326 246 314 C230 306 218 288 218 262 Z",
    lift: [18, 16],
  },
};

/** The trachea and both main bronchi, drawn behind the lobes for context. */
export const AIRWAY = "M200 34 V132 M200 132 C188 150 172 160 150 172 M200 132 C212 148 230 158 252 168";

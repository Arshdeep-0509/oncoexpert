"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { bleedFade } from "@/lib/image-fade";
import {
  FADE,
  N,
  baseBox,
  boundary,
  center,
  edgeFade,
  frameFor,
  layers,
  spotlightGradient,
  steps,
  type Layer,
  type Size,
  type Spot,
} from "@/components/pages/robotic-surgery/inside-the-robot/geometry";

function StageLayer({
  layer,
  progress,
  stage,
  sizes,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  /** Measured stage size (px). */
  stage: Size;
  sizes: string;
}) {
  // Opacity: fade in around the boundary before `from`, out around the boundary after `to`.
  const stops: number[] = [];
  const values: number[] = [];
  if (layer.from > 0) {
    stops.push(boundary(layer.from - 1) - FADE, boundary(layer.from - 1) + FADE);
    values.push(0, 1);
  } else {
    stops.push(0);
    values.push(1);
  }
  if (layer.to < N - 1) {
    stops.push(boundary(layer.to) - FADE, boundary(layer.to) + FADE);
    values.push(1, 0);
  } else {
    stops.push(1);
    values.push(1);
  }
  const opacity = useTransform(progress, stops, values);

  // Camera: each step holds its framing for a moment around its centre (HOLD on either
  // side), so the camera has settled while its text shows; it moves between steps.
  const HOLD = 0.04;
  const zoomStops: number[] = [];
  const scales: number[] = [];
  const xs: string[] = [];
  const ys: string[] = [];
  for (let i = layer.from; i <= layer.to; i++) {
    const f = frameFor(steps[i], stage);
    const at = [i > layer.from ? center(i) - HOLD : null, i < layer.to ? center(i) + HOLD : null].filter(
      (v): v is number => v !== null,
    );
    for (const stop of at.length ? at : [center(i)]) {
      zoomStops.push(stop);
      scales.push(f.scale);
      xs.push(f.x);
      ys.push(f.y);
    }
  }
  if (zoomStops.length === 1) {
    // Single-step layers settle gently (6% larger → final size) as they arrive.
    zoomStops.splice(0, 1, Math.max(0, boundary(layer.from - 1) - FADE), center(layer.from));
    scales.splice(0, 1, scales[0] * (layer.from > 0 ? 1.06 : 1), scales[0]);
    xs.push(xs[0]);
    ys.push(ys[0]);
  }
  const scale = useTransform(progress, zoomStops, scales);
  const x = useTransform(progress, zoomStops, xs);
  const y = useTransform(progress, zoomStops, ys);
  const box = baseBox(layer.image, stage);

  return (
    <motion.div className={cn("absolute inset-0 grid place-items-center blend-on-dark", edgeFade)} style={{ opacity }}>
      {/* The box has the photo's aspect ratio, so machine boxes (in % of the photo) are exact. */}
      <motion.div className="relative" style={{ width: box.w, height: box.h, ...bleedFade(layer.image), scale, x, y }}>
        <Image src={layer.image.src} alt={layer.image.alt} fill sizes={sizes} className="object-contain" />
      </motion.div>

      {/* Spotlights: on steps that feature one machine, everything else goes dark. */}
      {steps
        .slice(layer.from, layer.to + 1)
        .map((s, k) =>
          s.spotlight ? (
            <Spotlight
              key={s.number}
              step={layer.from + k}
              spot={frameFor(s, stage).spot}
              progress={progress}
              box={box}
            />
          ) : null,
        )}
    </motion.div>
  );
}

/**
 * Darkens everything outside an ellipse at the centre of the photo box (where the camera
 * has brought the machine). Fully on while its step is centred, fading out as the camera
 * moves on. The huge black spread covers the area outside the box.
 */
function Spotlight({
  step,
  spot,
  progress,
  box,
}: {
  step: number;
  spot: Spot;
  progress: MotionValue<number>;
  box: Size;
}) {
  const gap = 1 / (N - 1);
  const c = center(step);
  const opacity = useTransform(progress, [c - gap * 0.5, c - 0.015, c + 0.015, c + gap * 0.5], [0, 1, 1, 0], {
    clamp: true,
  });
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2"
      style={{
        width: box.w,
        height: box.h,
        opacity,
        background: spotlightGradient(spot),
        boxShadow: "0 0 0 100vmax black",
        willChange: "opacity",
      }}
    />
  );
}

/** All layers for a measured stage; remounted when the stage size changes. */
export function StageLayers({ progress, stage, sizes }: { progress: MotionValue<number>; stage: Size; sizes: string }) {
  if (!stage.w || !stage.h) return null;
  return (
    <>
      {layers.map((layer) => (
        <StageLayer
          key={`${layer.image.src}-${layer.from}-${stage.w}x${stage.h}`}
          layer={layer}
          progress={progress}
          stage={stage}
          sizes={sizes}
        />
      ))}
    </>
  );
}

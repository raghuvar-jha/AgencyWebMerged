"use client";

import { motion } from "@/lib/motion/tokens";

// "Draw in" for decorative SVG strokes, added to a timeline.
// - Proportionally scaled SVGs (e.g. the hero Squiggle): real DrawSVG (stroke 0% → 100%).
// - SVGs with vector-effect: non-scaling-stroke stretched non-proportionally (the Underline):
//   DrawSVG can't measure them, so they get a left-to-right clip wipe, which looks identical
//   for a near-horizontal stroke. (Stroke/clip on small decorative SVGs is the one exception to
//   "transform/opacity only"; both are cheap paint-only changes.)

export function addDraw(
  tl: gsap.core.Timeline,
  root: Element,
  { duration = motion.duration.base, position }: { duration?: number; position?: gsap.Position } = {},
) {
  const svgs = root.matches("svg") ? [root] : Array.from(root.querySelectorAll("svg"));
  svgs.forEach((svg, i) => {
    const paths = svg.querySelectorAll("path, line, polyline");
    if (!paths.length) return;
    const pos = i === 0 ? position : "<";
    const nonScaling = Array.from(paths).some(
      (p) => p.getAttribute("vector-effect") === "non-scaling-stroke",
    );
    if (nonScaling) {
      tl.fromTo(
        svg,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration, ease: motion.ease.inOut, clearProps: "clipPath" },
        pos,
      );
    } else {
      tl.from(paths, { drawSVG: "0%", duration, ease: motion.ease.inOut }, pos);
    }
  });
  return tl;
}

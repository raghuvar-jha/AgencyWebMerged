"use client";

import { useRef, type ElementType } from "react";
import type { MotionElementProps } from "@/components/motion/types";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// Staggers its children in when the group enters the viewport (card grids, lists, columns).
// Children stay server-rendered; by default every direct child animates.
export type StaggerProps = MotionElementProps & {
  /** Which descendants animate. Default: direct children. */
  selector?: string;
  y?: number;
  x?: number;
  /** Start scale, e.g. 0.97. */
  scale?: number;
  stagger?: number;
  duration?: number;
  /** Animation order as indexes of the matched elements (e.g. Stats staircase, featured pricing last). */
  sequence?: number[];
};

export function Stagger({
  as = "div",
  selector = ":scope > *",
  y = 24,
  x = 0,
  scale,
  stagger = motion.stagger,
  duration = motion.duration.base,
  sequence,
  className,
  children,
  ...rest
}: StaggerProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useMotion(ref, ({ el, gsap, dist, dur }) => {
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;
    const ordered = sequence
      ? [...sequence.map((i) => items[i]).filter(Boolean), ...items.filter((_, i) => !sequence.includes(i))]
      : items;
    return [
      gsap.from(ordered, {
        opacity: 0,
        y: dist(y),
        x: dist(x),
        ...(scale !== undefined && { scale }),
        duration: dur(duration),
        stagger,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: motion.start, once: true },
      }),
    ];
  });

  return (
    <Tag ref={ref} data-motion="scroll" className={className} {...rest}>
      {children}
    </Tag>
  );
}

"use client";

import { useRef, type ElementType } from "react";
import type { MotionElementProps, MotionTrigger } from "@/components/motion/types";
import { addDraw } from "@/lib/motion/draw";
import { claimIntro } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// Draws the SVG inside it (Underline, Squiggle) from start to end (lib/motion/draw.ts).
export type DrawLineProps = MotionElementProps & {
  delay?: number;
  duration?: number;
  trigger?: MotionTrigger;
};

export function DrawLine({
  as = "span",
  delay = 0.2,
  duration = motion.duration.base,
  trigger = "scroll",
  className,
  children,
  ...rest
}: DrawLineProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useMotion(ref, ({ el, gsap, dur }) => {
    if (trigger === "load" && !claimIntro()) return;
    const tl = gsap.timeline({
      delay,
      ...(trigger === "scroll" && { scrollTrigger: { trigger: el, start: motion.start, once: true } }),
    });
    addDraw(tl, el, { duration: dur(duration) });
    return [tl];
  }, { defer: trigger === "scroll" });

  return (
    <Tag ref={ref} data-motion={trigger} className={className} {...rest}>
      {children}
    </Tag>
  );
}

"use client";

import { useRef, type ElementType } from "react";
import type { MotionElementProps, MotionTrigger } from "@/components/motion/types";
import { claimIntro } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// Fade + move into place. trigger="scroll" (default): when it enters the viewport.
// trigger="load": on page load, only inside the intro window (navbar), otherwise shown as-is.
export type RevealProps = MotionElementProps & {
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  trigger?: MotionTrigger;
  /** false = reverse when scrolled back out (rarely wanted). */
  once?: boolean;
};

export function Reveal({
  as = "div",
  y = motion.distance.md,
  x = 0,
  scale,
  delay = 0,
  duration = motion.duration.base,
  trigger = "scroll",
  once = true,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useMotion(ref, ({ el, gsap, dist, dur }) => {
    if (trigger === "load" && !claimIntro()) return;
    return [
      gsap.from(el, {
        opacity: 0,
        y: dist(y),
        x: dist(x),
        ...(scale !== undefined && { scale }),
        delay,
        duration: dur(duration),
        clearProps: "transform,opacity",
        ...(trigger === "scroll" && {
          scrollTrigger: once
            ? { trigger: el, start: motion.start, once: true }
            : { trigger: el, start: motion.start, toggleActions: "play none none reverse" },
        }),
      }),
    ];
  }, { defer: trigger === "scroll" });

  return (
    <Tag ref={ref} data-motion={trigger} className={className} {...rest}>
      {children}
    </Tag>
  );
}

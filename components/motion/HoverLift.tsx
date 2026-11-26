"use client";

import { useEffect, useRef, type ElementType } from "react";
import type { MotionElementProps } from "@/components/motion/types";
import { loadMotion } from "@/lib/motion/load";
import { afterLoadIdle } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";

// On hover, lifts the [data-hover-lift] element inside it (e.g. a card's mockup) with gsap.quickTo.
// Mouse/trackpad only (hover + fine pointer), never under reduced motion. No pre-hide.
// GSAP is lazy-loaded in idle time (lib/motion/load.ts); everything is cleaned up via gsap.context.
export type HoverLiftProps = MotionElementProps & { y?: number };

export function HoverLift({ as = "div", y = -8, className, children, ...rest }: HoverLiftProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    const target = el?.querySelector<HTMLElement>("[data-hover-lift]");
    if (!el || !target) return;
    let cancelled = false;
    let gsapContext: gsap.Context | undefined;
    const cancelIdle = afterLoadIdle(() => {
      loadMotion().then(({ gsap }) => {
        if (cancelled) return;
        gsapContext = gsap.context(() => {
          const mm = gsap.matchMedia();
          mm.add(`${motion.queries.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
            const yTo = gsap.quickTo(target, "y", { duration: motion.duration.fast, ease: motion.ease.out });
            const enter = () => yTo(y);
            const leave = () => yTo(0);
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointerleave", leave);
            return () => {
              el.removeEventListener("pointerenter", enter);
              el.removeEventListener("pointerleave", leave);
            };
          });
        }, el);
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      gsapContext?.revert();
    };
  }, [y]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

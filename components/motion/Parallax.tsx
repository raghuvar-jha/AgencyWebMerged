"use client";

import { useRef, type ElementType } from "react";
import type { MotionElementProps } from "@/components/motion/types";
import { useMotion } from "@/lib/motion/use-motion";

// Light scrubbed parallax for DECORATIONS ONLY (blobs, rings, doodles); never text.
// md+ only and off under reduced motion. Put the decoration's positioning classes on <Parallax>
// itself (a transformed wrapper becomes the containing block for absolute children).
export type ParallaxProps = MotionElementProps & {
  /** 0.15 ≈ moves ±60px across the viewport. */
  speed?: number;
};

export function Parallax({ as = "div", speed = 0.15, className, children, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useMotion(ref, ({ el, gsap, mobile }) => {
    if (mobile) return;
    const travel = speed * 400;
    return [
      gsap.fromTo(
        el,
        { y: -travel },
        {
          y: travel,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      ),
    ];
  });

  return (
    <Tag ref={ref} aria-hidden="true" className={className} {...rest}>
      {children}
    </Tag>
  );
}

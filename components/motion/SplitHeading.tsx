"use client";

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import type { MotionTrigger } from "@/components/motion/types";
import { addDraw } from "@/lib/motion/draw";
import { claimIntro } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// Masked line (or word) reveal for headings. The server HTML is the plain heading (SEO, no-JS).
// SplitText runs after document.fonts.ready, with aria: "auto" (full text as aria-label on the
// heading, split pieces aria-hidden), re-splits on resize until it has played (autoSplit), and
// reverts to the original markup when done. Masks are overflow-clip wrappers: no height change.
// draw: after the lines, draw any SVG strokes inside the heading (e.g. the Stats underline).
// Never nest client components inside: the revert restores the heading's original HTML.
export type SplitHeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, "children"> & {
  as?: "h1" | "h2" | "h3";
  type?: "lines" | "words";
  stagger?: number;
  trigger?: MotionTrigger;
  /** Draw SVG strokes inside the heading after the text reveal. */
  draw?: boolean;
  children: ReactNode;
};

export function SplitHeading({
  as = "h2",
  type = "lines",
  stagger = 0.1,
  trigger = "scroll",
  draw = false,
  className,
  children,
  ...rest
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as as ElementType;

  useMotion(ref, ({ el, gsap, SplitText, dur, add, track, alive }) => {
    if (trigger === "load" && !claimIntro()) return;
    gsap.set(el, { opacity: 0 }); // stays hidden (as the CSS pre-hide did) until split
    document.fonts.ready.then(() => {
      if (!alive()) return;
      add(() => {
        SplitText.create(el, {
          type: type === "lines" ? "lines" : "words,lines",
          mask: type,
          aria: "auto",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 });
            const tl = gsap.timeline({
              ...(trigger === "scroll" && { scrollTrigger: { trigger: el, start: motion.start, once: true } }),
              onComplete: () => self.revert(), // back to the original markup (strokes fully drawn = original)
            });
            tl.from(type === "lines" ? self.lines : self.words, {
              yPercent: 110,
              duration: dur(motion.duration.base),
              stagger,
            });
            if (draw) addDraw(tl, el, { duration: dur(motion.duration.base), position: "-=0.3" });
            track(tl);
            return tl;
          },
        });
      });
    });
  }, { defer: trigger === "scroll" });

  return (
    <Tag ref={ref} data-motion={trigger} className={className} {...rest}>
      {children}
    </Tag>
  );
}

"use client";

import { useRef, type ElementType } from "react";
import type { MotionElementProps } from "@/components/motion/types";
import { addDraw } from "@/lib/motion/draw";
import { claimIntro, markReady } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// On-load timeline (hero). Children opt in with data-intro="<step>"; steps play in this order,
// overlapping, and the whole sequence ends by ~1.2s. Only runs if JS arrived inside the intro
// window (motion.introWindowMs); otherwise everything is simply shown (LCP never waits on JS).
//   eyebrow · heading (SplitText lines, masked, no opacity; NOT for the LCP heading) · text · cta · proof
//   media (y 24→0, opacity 0.9→1, never from 0) · cards (each child, from the right, 0.1 apart)
//   deco (add data-intro-draw to draw strokes; otherwise scale + rotate in)

const at = { eyebrow: 0, heading: 0.1, media: 0.3, text: 0.35, cta: 0.45, cards: 0.5, proof: 0.55, deco: 0.7 } as const;

export function IntroSequence({ as = "div", className, children, ...rest }: MotionElementProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useMotion(
    ref,
    ({ el, gsap, SplitText, dist, dur }) => {
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-intro]"));
      if (!claimIntro()) {
        steps.forEach(markReady);
        return;
      }
      const q = (step: keyof typeof at) => steps.filter((s) => s.dataset.intro === step);
      const clear = { clearProps: "transform,opacity" };
      const tl = gsap.timeline({ defaults: { duration: dur(motion.duration.fast), ease: motion.ease.out } });

      const fadeUp = (step: keyof typeof at, y: number) => {
        const els = q(step);
        if (els.length) tl.from(els, { opacity: 0, y: dist(y), ...clear }, at[step]);
      };

      fadeUp("eyebrow", 12);
      for (const heading of q("heading")) {
        const split = SplitText.create(heading, { type: "lines", mask: "lines", aria: "auto" });
        tl.from(
          split.lines,
          { yPercent: 110, duration: dur(0.7), stagger: 0.1, onComplete: () => split.revert() },
          at.heading,
        );
      }
      fadeUp("text", motion.distance.sm);
      fadeUp("cta", motion.distance.sm);
      fadeUp("proof", motion.distance.sm);
      const media = q("media");
      if (media.length) tl.from(media, { opacity: 0.9, y: dist(24), duration: dur(0.6), ...clear }, at.media);
      for (const group of q("cards")) {
        tl.from(group.children, { opacity: 0, x: dist(24), stagger: 0.1, ...clear }, at.cards);
      }
      for (const deco of q("deco")) {
        if (deco.hasAttribute("data-intro-draw")) {
          addDraw(tl, deco, { duration: dur(0.5), position: at.deco });
        } else {
          tl.from(deco, { opacity: 0, scale: 0.4, rotate: -45, transformOrigin: "50% 50%", ...clear }, at.deco);
        }
      }
      steps.forEach(markReady);
      return [tl];
    },
    { ready: false, defer: false },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

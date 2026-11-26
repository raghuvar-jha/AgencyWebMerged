"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadMotion } from "@/lib/motion/load";
import { afterLoadIdle } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";

// Content swap (tabs): the outgoing items fade out fast, then the caller switches content,
// then the incoming items stagger in. Reduced motion: switch instantly, no animation.
//   const { leave, enter } = useSwapStagger();
//   leave(oldPanel, () => setActive(i));   // then, after render: enter(newPanel)
// GSAP is lazy-loaded; if it isn't loaded yet, the swap simply happens without animation.

const ITEMS = "li";
const reduced = () => window.matchMedia(motion.queries.reduce).matches;

export function useSwapStagger() {
  const lib = useRef<Awaited<ReturnType<typeof loadMotion>> | null>(null);
  const touched = useRef(new Set<Element>());

  useEffect(() => {
    let cancelled = false;
    const cancelIdle = afterLoadIdle(() => {
      loadMotion().then((m) => {
        if (!cancelled) lib.current = m;
      });
    });
    const items = touched.current;
    return () => {
      cancelled = true;
      cancelIdle();
      if (lib.current) items.forEach((el) => lib.current?.gsap.killTweensOf(el.querySelectorAll(ITEMS)));
    };
  }, []);

  const leave = useCallback((panel: HTMLElement | null, done: () => void) => {
    const gsap = lib.current?.gsap;
    if (!panel || !gsap || reduced()) return done();
    touched.current.add(panel);
    gsap.to(panel.querySelectorAll(ITEMS), {
      opacity: 0,
      duration: 0.15,
      ease: "power1.out",
      overwrite: true,
      onComplete: done,
    });
  }, []);

  const enter = useCallback((panel: HTMLElement | null) => {
    const gsap = lib.current?.gsap;
    if (!panel || !gsap || reduced()) return;
    touched.current.add(panel);
    gsap.fromTo(
      panel.querySelectorAll(ITEMS),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: motion.duration.fast,
        stagger: 0.04,
        overwrite: true,
        clearProps: "transform,opacity",
      },
    );
  }, []);

  return { leave, enter };
}

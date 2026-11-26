"use client";

import { useEffect, useRef, type RefObject } from "react";
import { loadMotion, type MotionLib } from "@/lib/motion/load";
import { afterLoadIdle, isFinishedByFocus, markReady, registerAnimations, whenIdle } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";

// The one hook every primitive is built on:
// - GSAP is lazy-loaded (lib/motion/load.ts); set-up waits for window load + idle time (defer,
//   default) so neither the GSAP download nor 20+ ScrollTriggers/SplitText layouts delay LCP.
//   On-load animations (navbar, hero intro) pass defer: false.
// - gsap.context(scope = the element) → automatic cleanup of tweens, ScrollTriggers, SplitText
//   and matchMedia on unmount (what @gsap/react's useGSAP does, without importing GSAP eagerly)
// - gsap.matchMedia → reduced motion shows content instantly; mobile gets shorter/faster motion
// - marks the element ready (CSS pre-hide off) only after the start state is set → no flash
// - registers animations so keyboard focus can finish them
// - plays once: after it has played, a breakpoint change won't hide/replay it

export type MotionContext = {
  el: HTMLElement;
  gsap: MotionLib["gsap"];
  SplitText: MotionLib["SplitText"];
  mobile: boolean;
  /** Scale a distance for the current breakpoint. */
  dist: (px: number) => number;
  /** Scale a duration for the current breakpoint. */
  dur: (seconds: number) => number;
  /** Run async work (e.g. after document.fonts.ready) inside the GSAP context so it's cleaned up. */
  add: (fn: () => void) => void;
  /** Register animations created later (async) for focus-finishing / played tracking. */
  track: (...animations: gsap.core.Animation[]) => void;
  /** False once this context has been reverted (unmount, breakpoint change): bail out of async work. */
  alive: () => boolean;
};

type Build = (ctx: MotionContext) => gsap.core.Animation[] | void;

export function useMotion(
  ref: RefObject<HTMLElement | null>,
  build: Build,
  {
    dependencies = [],
    ready = true,
    defer = true,
  }: { dependencies?: unknown[]; ready?: boolean; defer?: boolean } = {},
) {
  const played = useRef(false);
  const buildRef = useRef(build);
  useEffect(() => {
    buildRef.current = build;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // On-load animations whose intro window has already closed will never play: show them now and
    // don't start the GSAP download for them (it would compete with the LCP resources).
    if (!defer && !document.documentElement.classList.contains("motion-intro")) {
      markReady(el);
      el.querySelectorAll("[data-intro]").forEach(markReady);
      return;
    }
    let cancelled = false;
    let gsapContext: gsap.Context | undefined;
    let cancelSetup: (() => void) | undefined;

    const setup = ({ gsap, SplitText }: MotionLib) => {
      if (cancelled) return;
      gsapContext = gsap.context(() => {
        const mm = gsap.matchMedia();
        // matchMedia runs the callback when ANY condition matches, so mobile/desktop must both
        // be listed (one of them always matches); reduce is read as a flag.
        mm.add(
          {
            reduce: motion.queries.reduce,
            mobile: motion.queries.mobile,
            desktop: motion.queries.desktop,
          },
          (context) => {
            const { reduce, mobile } = context.conditions as {
              reduce: boolean;
              mobile: boolean;
            };
            // Reduced motion, already played, keyboard focus got there first, or the provider's
            // fail-safe sweep already showed it (GSAP arrived late): just show it, never re-hide.
            const shownEarly = !played.current && el.hasAttribute("data-motion-ready");
            if (reduce || played.current || isFinishedByFocus(el) || shownEarly) {
              markReady(el);
              return;
            }
            let alive = true;
            const track = (...animations: gsap.core.Animation[]) => {
              registerAnimations(el, animations);
              animations.forEach((a) => a.then(() => (played.current = true)));
            };
            const animations =
              buildRef.current({
                el,
                gsap,
                SplitText,
                mobile,
                dist: (px) => (mobile ? px * motion.mobile.distance : px),
                dur: (s) => (mobile ? s * motion.mobile.duration : s),
                add: (fn) => {
                  context.add(fn);
                },
                track,
                alive: () => alive,
              }) ?? [];
            track(...animations);
            if (ready) markReady(el);
            return () => {
              alive = false;
            };
          },
        );
      }, el);
    };

    // Deferred: after load + idle, fetch GSAP, then set up in ITS OWN idle callback. Every primitive
    // resolves the same promise at once; without this, 20+ set-ups run as one long task (TBT 54 →
    // 204ms with real 4× CPU throttling). Intro (defer: false): fetch and set up immediately.
    const cancelIdle = defer
      ? afterLoadIdle(() => {
          loadMotion().then((lib) => {
            if (!cancelled) cancelSetup = whenIdle(() => setup(lib));
          });
        })
      : (loadMotion().then(setup), undefined);
    return () => {
      cancelled = true;
      cancelIdle?.();
      cancelSetup?.();
      gsapContext?.revert();
    };
    // `dependencies` is the caller's explicit re-run list; ref/build are read through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

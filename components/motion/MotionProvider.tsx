"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadMotion } from "@/lib/motion/load";
import { afterLoadIdle, finishAnimationsFor, markReady } from "@/lib/motion/runtime";
import { motion } from "@/lib/motion/tokens";

// Mounted once in app/layout.tsx (inside <Suspense>, for usePathname). Renders nothing.
// - tells the boot script the motion system is alive (html.motion-ready → no fail-safe un-hide)
// - ScrollTrigger.refresh() (debounced) after fonts load and whenever the page height changes
//   (debounced ResizeObserver: carousels, lazy content), and after every route change
// - keyboard safety: focus inside a hidden/animating element finishes its animation instantly
// - sweep: if GSAP is slow (load event late on a 4G phone), anything pre-hidden that is ON SCREEN
//   after the fail-safe time, or scrolled onto screen later, is shown without animation. Content
//   further down stays hidden so GSAP can still animate it once it arrives.
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("motion-ready");
    // Test hook (opt-in via ?motion-debug, kept for the tab session): count/list live ScrollTriggers.
    if (window.location.search.includes("motion-debug")) sessionStorage.setItem("motion-debug", "1");
    if (sessionStorage.getItem("motion-debug")) {
      loadMotion().then(({ ScrollTrigger }) => {
        (window as unknown as { __motion: object }).__motion = {
          triggers: () => ScrollTrigger.getAll().length,
          list: () =>
            ScrollTrigger.getAll().map((t) => {
              const el = t.trigger as Element | undefined;
              return `${el?.tagName}${el?.id ? "#" + el.id : ""}.${(el?.className.toString() ?? "").slice(0, 40)} scrub=${!!t.vars.scrub}`;
            }),
        };
      });
    }

    // One debounced refresh for fonts + page-height changes (ScrollTrigger already refreshes on
    // load and window resize itself), so start-up does a single recalculation, not several.
    // The recalculation itself runs in idle time, off the LCP-critical path.
    let refreshTimer = 0;
    let cancelIdle: (() => void) | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        cancelIdle?.();
        cancelIdle = afterLoadIdle(() => loadMotion().then(({ ScrollTrigger }) => ScrollTrigger.refresh()));
      }, 200);
    };
    document.fonts.ready.then(scheduleRefresh);
    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(document.body);

    const onFocus = (event: FocusEvent) => finishAnimationsFor(event.target as Element);
    document.addEventListener("focusin", onFocus);

    const UNREADY = "[data-motion]:not([data-motion-ready]), [data-intro]:not([data-motion-ready])";
    let sweepFrame = 0;
    const sweepVisible = () => {
      cancelAnimationFrame(sweepFrame);
      sweepFrame = requestAnimationFrame(() => {
        const pending = document.querySelectorAll(UNREADY);
        if (pending.length === 0) return window.removeEventListener("scroll", sweepVisible);
        pending.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) markReady(el);
        });
      });
    };
    const sweep = window.setTimeout(() => {
      sweepVisible();
      window.addEventListener("scroll", sweepVisible, { passive: true });
    }, motion.failsafeMs);

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(refreshTimer);
      cancelIdle?.();
      document.removeEventListener("focusin", onFocus);
      window.clearTimeout(sweep);
      window.removeEventListener("scroll", sweepVisible);
      cancelAnimationFrame(sweepFrame);
    };
  }, []);

  useEffect(() => {
    // Only once GSAP is in use (never triggers the download itself).
    const frame = requestAnimationFrame(() => {
      if (document.querySelector("[data-motion-ready]")) loadMotion().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

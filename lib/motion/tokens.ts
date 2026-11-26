// Motion tokens: the single source of truth for every GSAP animation (DESIGN.md → Motion (GSAP)).
// Plain data, safe to import anywhere.

export const motion = {
  duration: { fast: 0.4, base: 0.8, slow: 1.2 },
  ease: { out: "power3.out", inOut: "power2.inOut" },
  /** Travel distances in px (desktop). Mobile multiplies by `mobile.distance`. */
  distance: { sm: 16, md: 32, lg: 56 },
  stagger: 0.08,
  /** ScrollTrigger start for every reveal. clamp() keeps it inside the scrollable range, so
   *  elements near the end of the page (footer) still fire when you reach the bottom. */
  start: "clamp(top 85%)",
  /** < 768px: shorter travel, quicker motion. */
  mobile: { distance: 0.5, duration: 0.75 },
  /** Reduced motion: at most this opacity fade (we currently show content instantly). */
  reducedFade: 0.2,
  /** Hero/navbar intro only plays if JS is ready within this window; otherwise content just shows (LCP). */
  introWindowMs: 400,
  /** If the motion system hasn't started by then, the inline script un-hides everything. */
  failsafeMs: 3000,
  queries: {
    reduce: "(prefers-reduced-motion: reduce)",
    mobile: "(max-width: 767px)",
    desktop: "(min-width: 768px)",
    finePointer: "(hover: hover) and (pointer: fine)",
  },
} as const;

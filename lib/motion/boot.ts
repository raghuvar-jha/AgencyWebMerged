import { motion } from "@/lib/motion/tokens";

// Inline <head> script (app/layout.tsx), runs before first paint. Server-safe (no "use client").
// - js-motion:     JS is on, so CSS may pre-hide [data-motion] elements (never without JS)
// - motion-intro:  "load" animations may pre-hide, but only for motion.introWindowMs; if no primitive
//                  claims the intro by then, it closes and the hero/navbar simply show (protects LCP)
// - fail-safe:     if the motion system hasn't started by motion.failsafeMs, un-hide everything
export const motionBootScript = `(function(){var d=document.documentElement;d.classList.add("js-motion","motion-intro");setTimeout(function(){if(!d.classList.contains("motion-intro-started"))d.classList.remove("motion-intro")},${motion.introWindowMs});setTimeout(function(){if(!d.classList.contains("motion-ready"))d.classList.remove("js-motion")},${motion.failsafeMs})})();`;

"use client";

// Lazy GSAP: the first call starts the download, later calls share the same promise.
// Primitives call it in browser idle time, after the first render, so GSAP is never on the
// LCP-critical path.

export type MotionLib = typeof import("@/lib/motion/gsap");

let pending: Promise<MotionLib> | null = null;

export function loadMotion() {
  pending ??= import("@/lib/motion/gsap");
  return pending;
}

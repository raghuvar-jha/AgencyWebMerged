"use client";

// Shared runtime for the motion primitives:
// - pre-hide hand-off: CSS hides [data-motion] until the primitive marks it ready (globals.css)
// - intro window: "load" animations only play if JS arrived within motion.introWindowMs
// - focus safety: animations are registered per element so focus can finish them instantly

/** The CSS pre-hide stops applying; GSAP's inline styles take over. */
export function markReady(el: Element) {
  el.setAttribute("data-motion-ready", "");
}

/** True while the intro window is still open. Claims it so the boot script won't close it. */
export function claimIntro() {
  const html = document.documentElement;
  if (!html.classList.contains("motion-intro")) return false;
  html.classList.add("motion-intro-started");
  return true;
}

/** Run `fn` when the browser is idle (max 2s wait). Returns a cancel function. */
export function whenIdle(fn: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 200);
  return () => clearTimeout(id);
}

/** Run `fn` after the window load event (fonts, images: the LCP resources) and then idle time,
 *  so lazy GSAP never competes with them for bandwidth or main-thread time. Returns a cancel. */
export function afterLoadIdle(fn: () => void) {
  let cancelIdle: (() => void) | undefined;
  const onLoad = () => {
    cancelIdle = whenIdle(fn);
  };
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad, { once: true });
  return () => {
    window.removeEventListener("load", onLoad);
    cancelIdle?.();
  };
}

const finishedByFocus = new WeakSet<Element>();

export function isFinishedByFocus(el: Element) {
  return finishedByFocus.has(el);
}

const registry = new WeakMap<Element, gsap.core.Animation[]>();

export function registerAnimations(el: Element, animations: gsap.core.Animation[]) {
  registry.set(el, [...(registry.get(el) ?? []), ...animations]);
}

/** Jump every animation registered on `el` or its ancestors to the end (used on keyboard focus).
 *  Elements still waiting for their (deferred) set-up are simply shown and never animated. */
export function finishAnimationsFor(target: Element | null) {
  for (let node: Element | null = target; node; node = node.parentElement) {
    if ((node.hasAttribute("data-motion") || node.hasAttribute("data-intro")) && !node.hasAttribute("data-motion-ready")) {
      finishedByFocus.add(node);
      markReady(node);
    }
    const animations = registry.get(node);
    if (!animations) continue;
    for (const animation of animations) {
      // Finish first, then drop the trigger but keep the (finished) animation:
      // ScrollTrigger.kill() would otherwise kill the animation at its start state.
      animation.progress(1);
      animation.scrollTrigger?.kill(false, true);
    }
    registry.delete(node);
  }
}

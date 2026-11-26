"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion/tokens";
import { useMotion } from "@/lib/motion/use-motion";

// Counts the numeric part of a value up from 0, once, keeping prefix/suffix ("350+", "98%", "₹2.5L").
// Placeholders ("[X]+") or values without a number render as-is with no animation.
// The server HTML has the final value; screen readers always get the final value (sr-only),
// the animating digits are aria-hidden.

const NUMBER = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

function parse(value: string) {
  if (value.includes("[")) return null;
  const m = NUMBER.exec(value.trim());
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  return { prefix: m[1], target: Number(raw), decimals: raw.split(".")[1]?.length ?? 0, grouped: m[2].includes(","), suffix: m[3] };
}

export function CountUp({ value, duration = motion.duration.slow }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);

  useMotion(
    ref,
    ({ el, gsap, dur }) => {
      if (!parsed) return;
      const { prefix, target, decimals, grouped, suffix } = parsed;
      const format = (n: number) =>
        prefix +
        (grouped
          ? n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
          : n.toFixed(decimals)) +
        suffix;
      const counter = { n: 0 };
      el.textContent = format(0);
      return [
        gsap.to(counter, {
          n: target,
          duration: dur(duration),
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(counter.n);
          },
          onComplete: () => {
            el.textContent = value;
          },
          scrollTrigger: { trigger: el, start: motion.start, once: true },
        }),
      ];
    },
    { dependencies: [value] },
  );

  if (!parsed) return <>{value}</>;
  return (
    <>
      <span ref={ref} aria-hidden="true" data-motion="scroll" className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

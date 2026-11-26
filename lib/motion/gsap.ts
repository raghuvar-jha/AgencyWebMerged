"use client";

// GSAP set-up, done once. This module is LAZY-LOADED (lib/motion/load.ts): never import it
// statically, or GSAP (~50KB gz) lands in the first-load bundle and competes with the web font
// for bandwidth (Lighthouse mobile LCP +300ms when it did). Only components/motion/ use GSAP.
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motion } from "@/lib/motion/tokens";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
gsap.defaults({ ease: motion.ease.out, duration: motion.duration.base });

export { gsap, ScrollTrigger, SplitText };

"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Carousel logic only (DESIGN.md §6.20). Slides arrive server-rendered as children.
// lg+: 3 cards + 56px peek each side, centre card emphasised. md–lg: 2 cards + right peek.
// < md: 1 card (87.5%) + right peek, arrows hidden. Loops everywhere; autoplay off by default.
// Without JS the viewport is a native scroll-snap row; Embla takes over once it initialises.

type Labels = { region: string; prev: string; next: string; dot: string; slide: string; status: string };

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ReviewsCarousel({
  slides,
  labels,
  autoplayMs = 0,
}: {
  slides: ReactNode[];
  labels: Labels;
  /** 0 = off (default). If set: advances every N ms, paused on hover/focus, never under reduced motion. */
  autoplayMs?: number;
}) {
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: false,
    breakpoints: { "(min-width: 1024px)": { align: "center" } },
  });
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const sync = (embla: EmblaCarouselType) => {
      setSelected(embla.selectedScrollSnap());
      setReady(true);
    };
    // Embla may already be initialised by the time this runs; sync on the next frame.
    const frame = requestAnimationFrame(() => sync(api));
    api.on("select", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(frame);
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  // Hand-over from the no-JS scroll-snap row to Embla: once the viewport is overflow-hidden,
  // clear any native scroll offset (the browser re-snaps it while Embla translates) and re-measure.
  // Embla positions slides with transforms, so the viewport's own scroll must stay at 0. Keep it
  // pinned there: overflow-hidden boxes can still be scrolled by re-snapping or focus.
  useEffect(() => {
    if (!api || !ready) return;
    const root = api.rootNode();
    const pin = () => {
      if (root.scrollLeft !== 0) root.scrollLeft = 0;
    };
    pin();
    api.reInit();
    root.addEventListener("scroll", pin, { passive: true });
    return () => root.removeEventListener("scroll", pin);
  }, [api, ready]);

  // Optional autoplay.
  useEffect(() => {
    if (!api || !autoplayMs || paused || reducedMotion()) return;
    const id = window.setInterval(() => api.scrollNext(), autoplayMs);
    return () => window.clearInterval(id);
  }, [api, autoplayMs, paused]);

  // Reduced motion: buttons jump instead of animating (drag still follows the finger).
  const go = useCallback((index: number) => api?.scrollTo(index, reducedMotion()), [api]);
  const prev = useCallback(() => api?.scrollPrev(reducedMotion()), [api]);
  const next = useCallback(() => api?.scrollNext(reducedMotion()), [api]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  }

  const total = slides.length;
  const fill = (template: string, n: number) =>
    template.replace("{n}", String(n)).replace("{total}", String(total));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        {/* Viewport = the container's content box. Nothing renders past it; pt-6/pb-12 leave room for the (raised) shadows. */}
        <div
          ref={viewportRef}
          className={cn(
            "mask-r-from-92% md:mask-r-from-95% lg:mask-x-from-95%",
            ready ? "overflow-hidden" : "no-scrollbar snap-x snap-mandatory overflow-x-auto",
          )}
        >
          <div className="flex touch-pan-y pt-6 pb-12">
            {slides.map((slide, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={fill(labels.slide, i + 1)}
                data-active={i === selected ? "" : undefined}
                className={cn(
                  // Spacing is a right margin (not CSS gap) so Embla keeps the gap where the loop wraps.
                  "group/slide relative min-w-0 shrink-0 basis-7/8 snap-start md:basis-4/9 lg:basis-1/4",
                  "mr-4 md:mr-6 lg:mr-8 xl:mr-12",
                  "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
                  i === selected && "lg:z-10 lg:scale-106",
                )}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {/* lg+: arrows float over the 56px peeks, 8px inside the container edges. */}
        <ArrowButton side="left" label={labels.prev} onClick={prev} className="absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 lg:grid" />
        <ArrowButton side="right" label={labels.next} onClick={next} className="absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 lg:grid" />
      </div>

      {/* Announces the current slide (the slides themselves don't change text, so aria-live on them says nothing). */}
      <p className="sr-only" aria-live={autoplayMs && !paused ? "off" : "polite"} aria-atomic="true">
        {ready ? fill(labels.status, selected + 1) : ""}
      </p>

      <div className="-mt-4 flex items-center justify-center">
        {/* md–lg: arrows sit beside the dots (no left peek to float over); hidden on mobile (swipe). */}
        <ArrowButton side="left" label={labels.prev} onClick={prev} className="mr-3 hidden md:grid lg:hidden" />
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={fill(labels.dot, i + 1)}
            aria-current={i === selected ? "true" : undefined}
            onClick={() => go(i)}
            className="group/dot grid h-11 w-6 place-items-center"
          >
            <span
              className={cn(
                "h-2 rounded-pill transition-all duration-300",
                i === selected ? "w-6 bg-primary" : "w-2 bg-border-strong group-hover/dot:bg-muted",
              )}
            />
          </button>
        ))}
        <ArrowButton side="right" label={labels.next} onClick={next} className="ml-3 hidden md:grid lg:hidden" />
      </div>
    </div>
  );
}

function ArrowButton({
  side,
  label,
  onClick,
  className,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "size-11 shrink-0 place-items-center rounded-pill bg-background text-foreground shadow-card transition-colors duration-150 hover:bg-surface-strong hover:text-primary",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
    </button>
  );
}

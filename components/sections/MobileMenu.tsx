"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsApp";
import { cn } from "@/lib/cn";
import type { CtaLink, NavLink } from "@/lib/content/home";

// Mobile menu (DESIGN.md §6.3). Frosted-glass panel + soft scrim, rendered in a portal on <body>:
// the header's backdrop-blur makes it a "backdrop root" (a blurred panel inside it couldn't blur
// the page) and the containing block for fixed children. CSS transitions only (transform/opacity,
// instant on tap even before lazy GSAP loads; reduced motion → instant via globals.css).
// Closed panel stays mounted for the exit animation but is `inert` (no focus, hidden from AT).

type Props = {
  links: NavLink[];
  cta: CtaLink;
  whatsapp: CtaLink;
};

// Link stagger when opening (literal classes so Tailwind generates them).
const linkDelays = ["delay-75", "delay-100", "delay-150", "delay-200", "delay-250", "delay-300", "delay-350", "delay-400"];

const subscribe = () => () => {};

export function MobileMenu({ links, cta, whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Portal target exists only in the browser (server and hydration render nothing).
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;

    // The panel lives at the end of <body> (portal), so keep keyboard focus in the menu while it's
    // open: focus the first item, and Tab / Shift+Tab cycle through the toggle button + menu items.
    const focusables = () => [
      buttonRef.current,
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
    ].filter((el): el is HTMLElement => !!el);
    const firstItem = panelRef.current?.querySelector<HTMLElement>("a[href]");
    const focusFrame = requestAnimationFrame(() => firstItem?.focus({ preventScroll: true }));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey
        ? items[(index - 1 + items.length) % items.length]
        : items[(index + 1) % items.length];
      event.preventDefault();
      next?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !panelRef.current?.contains(target)) setOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);
  const itemMotion = (i: number) =>
    cn(
      "transition duration-300 ease-out-soft",
      open ? cn("translate-y-0 opacity-100", linkDelays[Math.min(i, linkDelays.length - 1)]) : "-translate-y-1 opacity-0",
    );

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 grid size-11 place-items-center rounded-sm text-foreground transition-colors duration-150 hover:bg-surface-strong"
      >
        {/* Hamburger ↔ X morph: three bars, the middle fades, the outer two rotate. */}
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-0.5 rounded-pill bg-current transition duration-300 ease-out-soft",
              open && "translate-y-1.75 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 top-1.75 h-0.5 rounded-pill bg-current transition duration-200",
              open && "scale-x-0 opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 rounded-pill bg-current transition duration-300 ease-out-soft",
              open && "-translate-y-1.75 -rotate-45",
            )}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <>
            {/* Scrim: dims and softly blurs the page below the header; tap closes. */}
            <div
              aria-hidden="true"
              onClick={close}
              className={cn(
                "fixed inset-x-0 top-16 bottom-0 z-30 bg-ink/25 backdrop-blur-xs transition-opacity duration-300 ease-out-soft lg:hidden",
                open ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
            <div
              ref={panelRef}
              id={panelId}
              inert={!open}
              className={cn(
                "fixed inset-x-3 top-20 z-40 max-h-[calc(100dvh-6rem)] origin-top overflow-y-auto rounded-xl border border-background/70 bg-background/80 shadow-raised backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out-soft md:inset-x-8 lg:hidden",
                open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-97 opacity-0",
              )}
            >
              <nav aria-label="Mobile" className="px-5 pt-2 pb-5">
                <ul className="divide-y divide-foreground/10">
                  {links.map((link, i) => (
                    <li key={link.href} className={itemMotion(i)}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="group flex items-center justify-between py-4 text-h4 text-foreground transition-colors duration-150 hover:text-primary"
                      >
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 text-subtle transition duration-150 group-hover:translate-x-1 group-hover:text-primary"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={cn("mt-4 flex flex-col gap-3", itemMotion(links.length))}>
                  <Link href={cta.href} onClick={close} className={buttonClasses({ size: "lg", fullWidth: true })}>
                    {cta.label}
                  </Link>
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noopener"
                    onClick={close}
                    className={buttonClasses({ variant: "whatsapp", size: "lg", fullWidth: true })}
                  >
                    <WhatsAppIcon className="size-5" />
                    {whatsapp.label}
                  </a>
                </div>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

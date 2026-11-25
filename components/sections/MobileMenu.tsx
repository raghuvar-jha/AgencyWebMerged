"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsApp";
import type { CtaLink, NavLink } from "@/lib/content/home";

type Props = {
  links: NavLink[];
  cta: CtaLink;
  whatsapp: CtaLink;
};

export function MobileMenu({ links, cta, whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

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
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background shadow-raised"
      >
        <div className="mx-auto w-full max-w-site px-5 pt-2 pb-6 md:px-8">
          <ul className="divide-y divide-border">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-4 text-h4 text-foreground transition-colors duration-150 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
}

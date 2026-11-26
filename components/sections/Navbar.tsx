import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/sections/MobileMenu";
import { hero, navCta, navLinks } from "@/lib/content/home";
import { whatsappLink } from "@/lib/site";

export function Navbar() {
  return (
    // Fades down 12px on load (intro window only); Reveal renders the <header> itself so sticky still works.
    <Reveal as="header" trigger="load" y={-12} duration={0.5} className="sticky top-0 z-40 bg-surface/70 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-nav items-center justify-between px-5 md:px-8 lg:h-24"
      >
        <Logo />

        <div className="hidden items-center lg:flex">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-small font-medium text-muted transition-colors duration-150 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href={navCta.href} className="ml-12">
            {navCta.label}
          </ButtonLink>
        </div>

        <MobileMenu
          links={navLinks}
          cta={navCta}
          whatsapp={{ label: hero.whatsappCta.label, href: whatsappLink(hero.whatsappCta.message) }}
        />
      </nav>
    </Reveal>
  );
}

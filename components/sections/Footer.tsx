import { Clock, Heart, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { AuditBanner } from "@/components/sections/footer/AuditBanner";
import { FooterColumn, footerHeadingClasses, footerLinkClasses } from "@/components/sections/footer/FooterColumn";
import { SocialLinks } from "@/components/sections/footer/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/lib/content/footer";
import { jsonLdScript, localBusinessJsonLd } from "@/lib/json-ld";
import { isFilled, site } from "@/lib/site";

// DESIGN.md §6.15. Rendered once in app/layout.tsx. Full-bleed lavender band; the content
// sits in the same <Container> as every section, so its edges still line up.
// Grid: < md  brand / 2 link cols / Resources / Contact full width
//       md    brand full width, then 2×2 (Quick · Services / Resources · Contact)
//       lg    brand full width, then the 4 columns in one row
//       xl+   5 columns 1.5fr 1fr 1fr 1fr 1.2fr (measured from footer.png; cramped at 1024)

type ContactRow = { icon: LucideIcon; text: string; href?: string; external?: boolean };

function contactRows(): ContactRow[] {
  const wa = site.whatsapp;
  return [
    { icon: MessageCircle, text: isFilled(wa) ? `+${wa}` : wa, href: isFilled(wa) ? `https://wa.me/${wa}` : undefined, external: true },
    { icon: Phone, text: site.phone, href: isFilled(site.phone) ? `tel:${site.phone.replace(/\s/g, "")}` : undefined },
    { icon: Mail, text: site.email, href: isFilled(site.email) ? `mailto:${site.email}` : undefined },
    { icon: MapPin, text: `${site.address.locality}, ${site.address.region}, India` },
    { icon: Clock, text: site.hours },
  ];
}

// The year lives in the cached static shell and refreshes daily (Cache Components forbid a bare new Date()).
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-surface pt-12 pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd()) }} />
      <Container>
        <AuditBanner />

        <div data-footer-grid className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-10 lg:grid-cols-4 lg:gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4 xl:col-span-1">
            <Logo size="sm" />
            <p className="mt-1 text-caption font-medium tracking-normal text-muted normal-case">{site.tagline}</p>
            <p className="mt-4 max-w-70 text-small text-muted">{footer.description}</p>
            <SocialLinks className="mt-4" />
          </div>

          {footer.columns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}

          {/* Get in touch (replaces the reference's "We accept") */}
          <div className="col-span-2 md:col-span-1">
            <h2 className={footerHeadingClasses}>{footer.contact.title}</h2>
            <ul className="md:space-y-2">
              {contactRows().map(({ icon: Icon, text, href, external }) => {
                const content = (
                  <>
                    <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={2} />
                    <span className="min-w-0 break-words">{text}</span>
                  </>
                );
                return (
                  <li key={text}>
                    {href ? (
                      <a
                        href={href}
                        className={`${footerLinkClasses} gap-2.5`}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="flex min-h-11 items-center gap-2.5 text-small text-muted md:min-h-0">{content}</p>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-caption font-medium tracking-normal text-muted normal-case">
              {footer.contact.msmeLabel} <span className="whitespace-nowrap">{site.msme}</span>
            </p>
            {footer.payments && (
              <div className="mt-5">
                <p className="text-caption font-medium tracking-normal text-muted normal-case">{footer.paymentsLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {footer.payments.map((p) => (
                    <li
                      key={p}
                      className="rounded-pill border border-border px-3 py-1 text-caption font-medium tracking-normal text-muted normal-case"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div data-footer-bottom className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-caption font-medium tracking-normal text-muted normal-case md:flex-row md:justify-between md:text-left">
          <p>
            © <CurrentYear /> {site.name}. {footer.bottom.rights}
          </p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
            <p className="inline-flex items-center gap-1">
              {footer.bottom.madeWith}
              <Heart aria-hidden="true" className="size-3.5 fill-current text-primary" strokeWidth={2} />
              <span className="sr-only">love</span> {footer.bottom.madeIn} {site.city}, India
            </p>
            <ul className="flex gap-5">
              {footer.bottom.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-primary hover:underline md:min-h-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

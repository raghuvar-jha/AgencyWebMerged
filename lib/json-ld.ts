import { isFilled, site } from "@/lib/site";

// Site-wide LocalBusiness JSON-LD (CLAUDE.md SEO rules). Service-area business: no street
// address. Only real values are included; placeholders ("[...]") are left out, so the
// markup stays valid and gains fields automatically as lib/site.ts is filled in.

export function localBusinessJsonLd() {
  const sameAs = Object.values(site.socials).filter((url) => isFilled(url) && url.startsWith("https://"));
  const url = isFilled(site.url) ? site.url : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    ...(url && { url, "@id": `${url}/#business` }),
    // TODO: add `logo` (absolute URL) once the real logo exists in /public.
    ...(isFilled(site.email) && { email: site.email }),
    ...(isFilled(site.phone) && { telephone: site.phone }),
    areaServed: { "@type": "City", name: site.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/** Serialise for <script type="application/ld+json">, escaping "<" so content can't close the tag. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

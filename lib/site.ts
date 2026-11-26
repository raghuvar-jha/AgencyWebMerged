// Single source for business details (NAP, contact, socials).
// Never hard-code these in pages. Must match the Google Business Profile exactly.

export const site = {
  name: "Web Merged",
  tagline: "Web apps, mobile apps and SEO for growing businesses in Noida",
  url: "https://[PLACEHOLDER: domain]",
  city: "Noida",
  address: {
    street: "[PLACEHOLDER: street address]",
    locality: "Noida",
    region: "Uttar Pradesh",
    postalCode: "[PLACEHOLDER: PIN code]",
    country: "IN",
  },
  phone: "[PLACEHOLDER: +91XXXXXXXXXX]",
  // Digits only, with country code, for wa.me links (e.g. "919876543210").
  whatsapp: "[PLACEHOLDER: 91XXXXXXXXXX]",
  email: "[PLACEHOLDER: email]",
  hours: "[PLACEHOLDER: Mon–Sat, 10am–7pm]",
  // Udyam (MSME) registration number, shown in the footer.
  msme: "UDYAM-UP-28-0253897",
  // Full https:// URLs. Empty = hidden everywhere (footer icons, JSON-LD sameAs).
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    x: "",
  },
} as const;

export type SocialNetwork = keyof typeof site.socials;

/** True once a value has been filled in (not empty, not a "[PLACEHOLDER…]" / "[…]" marker). */
export function isFilled(value: string | null | undefined): value is string {
  return !!value && !value.includes("[");
}

export function whatsappLink(message = `Hi ${site.name}, I'd like a free website audit.`) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

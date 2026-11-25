// Single source for business details (NAP, contact, socials).
// Never hard-code these in pages. Must match the Google Business Profile exactly.

export const site = {
  name: "Web Merged",
  tagline: "Web apps, mobile apps and SEO for growing businesses in Noida",
  services: ["Web apps & websites", "Mobile apps", "SEO", "Google & Meta Ads"],
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
  socials: {
    instagram: "[PLACEHOLDER]",
    linkedin: "[PLACEHOLDER]",
    facebook: "[PLACEHOLDER]",
  },
} as const;

export function whatsappLink(message = `Hi ${site.name}, I'd like a free website audit.`) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

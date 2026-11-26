// The services we sell: one list for the footer, nav and (later) /services/[slug] pages.
// Service pages don't exist yet; links point at their future URLs.

export type Service = { slug: string; label: string };

export const services: Service[] = [
  { slug: "website-development", label: "Website Development" },
  { slug: "mobile-apps", label: "Mobile App Development" },
  { slug: "seo", label: "SEO" },
  { slug: "ads", label: "Google & Meta Ads" },
  { slug: "maintenance", label: "Website Maintenance" },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

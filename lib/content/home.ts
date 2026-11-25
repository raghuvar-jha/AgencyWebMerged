// All home-page copy lives here. Components only render it.
// [PLACEHOLDER] values must be replaced with real data before launch (see DESIGN.md §10).

export type NavLink = { label: string; href: string };

export type CtaLink = { label: string; href: string };

export type StatIcon = "rocket" | "users" | "calendar";

export type Stat = { icon: StatIcon; value: string; label: string };

export type ClientLogo = {
  name: string;
  /** Path under /public. null = show a placeholder slot. */
  src: string | null;
  width?: number;
  height?: number;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const navCta: CtaLink = { label: "Get Free Audit", href: "/#contact" };

export const hero = {
  eyebrow: "Web apps · Mobile apps · SEO in Noida",
  headline: {
    lead: "Build. Rank.",
    highlight: "Grow Your Noida Business Online.",
  },
  description:
    "Fast websites, web apps and mobile apps, built to get you found on Google and bring in real enquiries.",
  primaryCta: { label: "Get My Free Website Audit", href: "/#contact" } satisfies CtaLink,
  whatsappCta: {
    label: "Chat on WhatsApp",
    message: "Hi Web Merged, I'd like a free website audit for my business.",
  },
  socialProof: {
    text: "[PLACEHOLDER: Join XX+ Noida businesses growing with Web Merged]",
    ratingLabel: "[PLACEHOLDER: real Google rating]",
    avatarCount: 4,
  },
  photo: {
    /** Founder photo, ideally a transparent PNG cutout (4:5). null = placeholder panel. */
    src: null as string | null,
    alt: "[PLACEHOLDER: Founder of Web Merged]",
    placeholder: "[PLACEHOLDER: founder photo, transparent PNG, 4:5]",
  },
};

export const heroStats: Stat[] = [
  { icon: "rocket", value: "[00]+", label: "Projects delivered" },
  { icon: "users", value: "[00]+", label: "Businesses served" },
  { icon: "calendar", value: "[0]+", label: "Years of experience" },
];

export const trustBar: { title: string; logos: ClientLogo[] } = {
  title: "Trusted by businesses across Noida & NCR",
  logos: Array.from({ length: 6 }, (_, i) => ({
    name: `[CLIENT LOGO ${i + 1}]`,
    src: null,
  })),
};

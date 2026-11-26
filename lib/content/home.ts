// All home-page copy lives here. Components only render it.
// [PLACEHOLDER] values must be replaced with real data before launch (see DESIGN.md §10).
//
// PLACEHOLDERS TO REPLACE (search for "[" in this file):
// - hero.socialProof.text / ratingLabel  real client count + Google rating
// - hero.photo                           founder photo (src + alt)
// - heroStats[].value                    projects, businesses served, years
// - trustBar.logos                       real client logos (src + name)
// - stats.title.line1                    "[X]+ Happy" → real number of businesses
// - stats.items[].value                  retention %, projects, clients, on-time %
// - pricing.plans[].price                starting price per plan ("₹24,999" style)
// - pricing.plans[].features             "[X] pages", "[X] revisions", "[X] SEO articles", "[X] month"

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

export type Metric = { value: string; label: string };

export const stats = {
  title: { line1: "[X]+ Happy", line2: "Businesses", line3: "Trust Us" },
  description:
    "From local shops to growing brands, we help businesses get found online, win more customers and grow faster.",
  cta: { label: "See How It Works", href: "#process" } satisfies CtaLink,
  items: [
    { value: "[X]%", label: "Client Retention" },
    { value: "[X]+", label: "Projects Delivered" },
    { value: "[X]+", label: "Happy Clients" },
    { value: "[X]%", label: "On-Time Delivery" },
  ] satisfies Metric[],
};

export type PricingPlan = {
  id: string;
  name: string;
  /** "[₹XX,XXX]" placeholder or a formatted ₹ string, e.g. "₹24,999". */
  price: string;
  /** "/project", "/month" */
  period?: string;
  startingAt?: boolean;
  description?: string;
  features: string[];
  cta: CtaLink;
  featured?: boolean;
  /** e.g. "Most Popular" */
  badge?: string;
};

export const pricing: { title: string; subtitle: string; startingAtLabel: string; plans: PricingPlan[] } = {
  title: "Simple, Transparent Pricing",
  subtitle: "Fixed quotes, no hidden costs. Prices below are starting points.",
  startingAtLabel: "Starting at",
  plans: [
    {
      id: "starter",
      name: "Starter Website",
      price: "[₹XX,XXX]",
      period: "/project",
      startingAt: true,
      features: [
        "Up to [X] pages",
        "Mobile-first, fast loading",
        "WhatsApp + contact form",
        "Basic on-page SEO",
        "[X] revisions",
      ],
      cta: { label: "Get Started", href: "/contact?plan=starter" },
    },
    {
      id: "growth",
      name: "Growth Website",
      price: "[₹XX,XXX]",
      period: "/project",
      startingAt: true,
      featured: true,
      badge: "Most Popular",
      features: [
        "Up to [X] pages + blog",
        "Google Business Profile setup",
        "Analytics & call tracking",
        "Speed & SEO optimisation",
        "[X] month free maintenance",
        "Priority support",
      ],
      cta: { label: "Get Started", href: "/contact?plan=growth" },
    },
    {
      id: "retainer",
      name: "SEO + Ads Retainer",
      price: "[₹XX,XXX]",
      period: "/month",
      startingAt: true,
      features: [
        "Keyword & competitor research",
        "[X] SEO articles / month",
        "Backlink building",
        "Google Ads management",
        "Monthly results report",
        "Dedicated WhatsApp support",
        "Cancel anytime",
      ],
      cta: { label: "Get a Quote", href: "/contact?plan=retainer" },
    },
  ],
};

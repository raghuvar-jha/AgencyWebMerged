// Footer copy. Business details (name, phone, WhatsApp, email, hours, city, socials, MSME)
// come from lib/site.ts; nav links from lib/content/home.ts; services from lib/content/services.ts.
// Only footer-specific copy lives here.
//
// TODO pages (links kept, pages don't exist yet): /blog, /services/*, /privacy, /terms, /refund-policy.

import { navLinks, type NavLink } from "@/lib/content/home";
import { serviceHref, services } from "@/lib/content/services";

export type FooterLinkColumn = { title: string; links: NavLink[] };

export const footer = {
  audit: {
    title: "Get a Free Website Audit",
    subtitle: "Send us your site and get a video review of what's costing you customers. Free, within 24 hours.",
    label: "Email address",
    placeholder: "Enter your email",
    button: "Get my audit",
    pending: "Sending…",
    success: "Thanks! We'll email your audit within 24 hours.",
  },
  description:
    "We build fast websites, mobile apps and marketing that help businesses get found online and win more customers.",
  columns: [
    {
      title: "Quick Links",
      // Same links as the navbar, minus Services (it has its own column), plus Blog.
      links: [...navLinks.filter((l) => l.label !== "Services"), { label: "Blog", href: "/blog" }],
    },
    {
      title: "Services",
      links: services.map((s) => ({ label: s.label, href: serviceHref(s.slug) })),
    },
    {
      title: "Resources",
      links: [
        { label: "Free Website Audit", href: "/#contact" },
        { label: "FAQ", href: "/#faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ] satisfies FooterLinkColumn[],
  contact: {
    title: "Get in Touch",
    msmeLabel: "MSME Reg. No:",
  },
  /** Optional "We accept" chips (text only, no brand logos). null = hidden. */
  payments: null as null | string[],
  paymentsLabel: "We accept",
  bottom: {
    rights: "All rights reserved.",
    madeWith: "Made with",
    madeIn: "in", // followed by site.city + ", India"
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ] satisfies NavLink[],
  },
};

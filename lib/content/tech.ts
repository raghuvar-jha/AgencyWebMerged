// "Technologies We Use" section data.
// Only list technologies you can genuinely deliver. Remove anything you don't use.
//
// `slug` picks the logo in lib/tech-icons.ts (Simple Icons). A slug without a logo
// there (e.g. "aws", "ahrefs") shows an initials badge instead.

export type TechTabIcon = "globe" | "smartphone" | "server" | "shopping-cart" | "trending-up";

export type TechItem = { name: string; slug: string; tag?: string };

export type TechCategory = {
  id: string;
  label: string;
  icon: TechTabIcon;
  /** One line under the grid, describing the category. */
  description: string;
  items: TechItem[];
};

export const techSection = {
  eyebrow: "Tech Stack",
  title: "Technologies We Use",
  intro:
    "Modern, reliable tools to build fast websites, smooth mobile apps and marketing that actually brings results.",
  tablistLabel: "Technology categories",
};

export const techCategories: TechCategory[] = [
  {
    id: "web",
    label: "Web Development",
    icon: "globe",
    description: "Fast, SEO-friendly websites and web apps that load quickly on any phone.",
    items: [
      { name: "Next.js", slug: "nextdotjs", tag: "Framework" },
      { name: "React", slug: "react", tag: "Library" },
      { name: "TypeScript", slug: "typescript", tag: "Language" },
      { name: "Tailwind CSS", slug: "tailwindcss", tag: "Styling" },
      { name: "JavaScript", slug: "javascript", tag: "Language" },
      { name: "HTML5", slug: "html5", tag: "Markup" },
      { name: "Node.js", slug: "nodedotjs", tag: "Runtime" },
      { name: "Vercel", slug: "vercel", tag: "Hosting" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: "smartphone",
    description: "Cross-platform apps for Android & iOS from a single codebase.",
    items: [
      { name: "React Native", slug: "react", tag: "Framework" },
      { name: "Expo", slug: "expo", tag: "Platform" },
      { name: "Flutter", slug: "flutter", tag: "Framework" },
      { name: "Kotlin", slug: "kotlin", tag: "Android" },
      { name: "Swift", slug: "swift", tag: "iOS" },
      { name: "Firebase", slug: "firebase", tag: "Backend" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Database",
    icon: "server",
    description: "Secure APIs and databases that keep your data safe and your app fast.",
    items: [
      { name: "Node.js", slug: "nodedotjs", tag: "Runtime" },
      { name: "PostgreSQL", slug: "postgresql", tag: "Database" },
      { name: "Prisma", slug: "prisma", tag: "ORM" },
      { name: "Supabase", slug: "supabase", tag: "Backend" },
      { name: "MongoDB", slug: "mongodb", tag: "Database" },
      { name: "Redis", slug: "redis", tag: "Cache" },
      { name: "Docker", slug: "docker", tag: "DevOps" },
      { name: "AWS", slug: "aws", tag: "Cloud" },
    ],
  },
  {
    id: "cms",
    label: "CMS & E-commerce",
    icon: "shopping-cart",
    description: "Online stores and easy-to-edit websites, with Indian and global payments.",
    items: [
      { name: "WordPress", slug: "wordpress", tag: "CMS" },
      { name: "Shopify", slug: "shopify", tag: "E-commerce" },
      { name: "WooCommerce", slug: "woocommerce", tag: "E-commerce" },
      { name: "Sanity", slug: "sanity", tag: "Headless CMS" },
      { name: "Strapi", slug: "strapi", tag: "Headless CMS" },
      { name: "Razorpay", slug: "razorpay", tag: "Payments" },
      { name: "Stripe", slug: "stripe", tag: "Payments" },
    ],
  },
  {
    id: "marketing",
    label: "SEO & Marketing",
    icon: "trending-up",
    description: "Tools to get you found on Google, run ads and measure every enquiry.",
    items: [
      { name: "Google Ads", slug: "googleads", tag: "Ads" },
      { name: "Google Analytics", slug: "googleanalytics", tag: "Analytics" },
      { name: "Google Search Console", slug: "googlesearchconsole", tag: "SEO" },
      { name: "Google Tag Manager", slug: "googletagmanager", tag: "Tracking" },
      { name: "Meta Ads", slug: "meta", tag: "Ads" },
      { name: "Semrush", slug: "semrush", tag: "SEO" },
      { name: "Ahrefs", slug: "ahrefs", tag: "SEO" },
    ],
  },
];

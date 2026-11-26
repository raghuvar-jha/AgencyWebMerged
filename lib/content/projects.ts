// Project / case study data. Shared by the homepage "Selected Work" section and
// (later) the /work and /work/[slug] pages.
// Placeholders only: never invent clients or results (DESIGN.md §10).
//
// PLACEHOLDERS TO REPLACE (search for "[" in this file):
// - projects[].title / category / description   real project details
// - projects[].image                             mockup image (src under /public, alt, size)

export type ProjectTint = "green" | "pink" | "yellow" | "purple";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tint: ProjectTint;
  image?: { src: string; alt: string; width: number; height: number };
  /** `/work/${slug}` */
  href: string;
  /** Show on the homepage. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "[Project Name]",
    category: "[Industry, e.g. Food & Delivery]",
    description: "[One-line summary of what you built and the result.]",
    tint: "green",
    href: "/work/project-1",
    featured: true,
  },
  {
    slug: "project-2",
    title: "[Project Name]",
    category: "[Industry, e.g. E-commerce]",
    description: "[One-line summary of what you built and the result.]",
    tint: "pink",
    href: "/work/project-2",
    featured: true,
  },
  {
    slug: "project-3",
    title: "[Project Name]",
    category: "[Industry, e.g. Finance]",
    description: "[One-line summary of what you built and the result.]",
    tint: "yellow",
    href: "/work/project-3",
    featured: true,
  },
  {
    slug: "project-4",
    title: "[Project Name]",
    category: "[Industry, e.g. Health & Fitness]",
    description: "[One-line summary of what you built and the result.]",
    tint: "purple",
    href: "/work/project-4",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

export const projectsSection = {
  eyebrow: "My Work",
  title: "Selected Work",
  intro: {
    line1: "Here are some projects I'm proud of.",
    line2: "Each one is built with",
    line2End: "and lots of coffee.",
  },
  cardLinkLabel: "View Case Study",
  mockupPlaceholder: "[Project mockup]",
  cta: { label: "See All Projects", href: "/work" },
};

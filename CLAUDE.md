# CLAUDE.md

@AGENTS.md

## Project overview
Marketing site for **Web Merged**, a solo web agency in **Noida**, India, selling website development, mobile app development, SEO and Google/Meta Ads to small businesses (focus: **web apps, SEO and mobile apps**). The site exists to **generate leads**. Primary conversion: the **"Free website audit" lead form** (server action → PostgreSQL). Secondary: **WhatsApp click** (floating button + inline CTAs). Every decision must serve fast load on mid-range Android/4G, mobile-first UX and conversions.

## Stack (exact versions from package.json)
- Next.js **16.4.6** (App Router, Turbopack, `cacheComponents` + `partialPrefetching` on in `next.config.ts`)
- React / React DOM **19.3.0**
- TypeScript **^5** (`strict: true`), path alias `@/*` → repo root
- Tailwind CSS **4.3.3** via `@tailwindcss/turbopack` loader (CSS-first config: tokens in `app/globals.css` `@theme`, **no** tailwind.config / postcss config)
- ESLint **^9** + eslint-config-next 16.4.6 (flat config, `eslint.config.mjs`)
- PostgreSQL via **Prisma 7.10.1** (`prisma`, `@prisma/client`, `@prisma/adapter-pg`) + **pg 8.23.1** driver. Pinned to 7.x on purpose: npm's `prisma@latest` tag is an 8.0 RC
- **zod 4.6.7** (validation), **lucide-react 1.80.0** (icons), dotenv (Prisma CLI env loading)
- **gsap 3.15.1** (motion: ScrollTrigger, SplitText, DrawSVG; lazy-loaded via `lib/motion/load.ts`), **embla-carousel-react 8.6.0** (Reviews carousel), **simple-icons 16.38.1** (tech/social logos)
- Fonts: Plus Jakarta Sans via `next/font/google` (`--font-jakarta` → `font-sans`)

This is Next 16: APIs differ from older training data. Check `node_modules/next/dist/docs/` before using an API you're unsure of.

## Commands
| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Test | TODO: no test runner set up |
| Prisma client | `npm run db:generate` (also runs on `postinstall`) |
| DB migrate (dev) | `npm run db:migrate -- --name <change>` |
| DB migrate (prod) | `npm run db:deploy` |
| DB GUI | `npm run db:studio` |
| DB seed | TODO: no seed script yet |

## Folder structure
```
app/                  Routes (App Router). layout.tsx, globals.css (design tokens), sitemap.ts, robots.ts
  (marketing)/        Public pages: /, /services/[slug], /work/[slug], /blog/[slug], /contact
  actions/            Server actions (e.g. submitLead.ts)
components/ui/        Primitives from DESIGN.md §6 (Button, Badge, Field, Accordion, icons/)
components/decorations/ Decorative inline SVGs (aria-hidden), e.g. Underline, RingPattern
components/sections/  Page sections (Hero, ServicesGrid, CaseStudies, Testimonials, Pricing, FAQ, LeadForm, Footer)
lib/                  content/ (typed page copy, e.g. content/home.ts: no copy hard-coded in components), cn.ts (class joiner), site.ts (name, NAP, WhatsApp: the only place for business details), db.ts (Prisma client singleton), validation/ (zod schemas), JSON-LD helpers
prisma/               schema.prisma + migrations/ (config in prisma.config.ts)
generated/prisma/     Generated Prisma client (git-ignored; import from "@/generated/prisma/client" only inside lib/db.ts)
content/              Case studies, services, blog posts, FAQs as typed data or MDX
public/               Static assets (images, favicons, OG)
docs/design/          DESIGN.md + visual references
```
Create folders only when first needed.

## Design system: mandatory
**Before any UI work, read `docs/design/DESIGN.md`. Use only its tokens and components; never hard-code hex colours or random spacing. If a new component is needed, add it to DESIGN.md too.**
- Tailwind's default colour palette and font sizes are removed. Use `bg-primary`, `text-muted`, `text-h2`, `rounded-lg`, `shadow-card`, `max-w-site`, `py-section` etc.
- Spacing steps: `1 2 3 4 5 6 8 10 12 16 20 24` only. No arbitrary values (`p-[13px]`, `text-[#...]`).
- One primary CTA per section. Never invent clients, testimonials, logos or stats: use `[PLACEHOLDER: ...]`.

## Code conventions
- TypeScript strict; no `any`, no `@ts-ignore` without a comment explaining why.
- **Server Components by default.** Add `'use client'` only for real interactivity (mobile menu, form pending state), and keep those components small and leaf-level.
- **Named exports** for components and utilities (`export function Hero()`). Default exports only where Next requires them (page, layout, route files).
- File naming: components `PascalCase.tsx`, everything else `kebab-case.ts`; route folders lowercase kebab-case.
- Validate all form/API input with **zod** (schemas in `lib/validation/`), on the server always and on the client optionally, using the same schema.
- **Lead form = server action** (`app/actions/`) + `useActionState`; return typed `{ ok, errors }`. Include a honeypot and basic rate limiting. Never trust client data.
- Site-wide constants (name, phone, WhatsApp number, address, socials) live in one config file. Never duplicate them in pages.
- Accessibility per DESIGN.md §11: labels, focus rings, 44px targets, one h1.
- Motion: Every new component or section must include scroll/entrance animation using the shared GSAP primitives in components/motion/ (Reveal, Stagger, SplitHeading, CountUp, Parallax) and the tokens in lib/motion/tokens.ts, following DESIGN.md → Motion. Never write raw gsap calls inside section components; if a new pattern is needed, add a new primitive to components/motion/ and document it in DESIGN.md. Always respect prefers-reduced-motion, never hide content from no-JS users, never animate the LCP element from opacity 0, and animate only transform/opacity.

## Database
- PostgreSQL + **Prisma 7** using the `prisma-client` generator and the `@prisma/adapter-pg` driver adapter. Import the client only as `import { db } from "@/lib/db"`, and only in server code (server actions, route handlers, Server Components).
- `DATABASE_URL` is read from `.env.local` by both `prisma.config.ts` (CLI) and Next.js (runtime).
- Schema changes via **migrations only** (`npm run db:migrate`). Never edit the DB by hand, never `prisma db push` against production. **Ask before changing the schema.**
- Secrets only in `.env.local` (git-ignored, never commit). Keep `.env.example` updated with every variable name (no real values).
- No models yet. Proposed first table (needs approval): `Lead` (id, name, phone, website, service, message, sourcePage, utm fields, createdAt).

## SEO rules
- Use the Metadata API (`metadata` / `generateMetadata`) on **every** page: unique title + description, canonical, Open Graph.
- Exactly **one `<h1>` per page**; semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`).
- `app/sitemap.ts` and `app/robots.ts` must exist and list all public routes.
- JSON-LD via `<script type="application/ld+json">`: **LocalBusiness** (site-wide / contact), **Service** (service pages), **FAQPage** (any FAQ), plus BreadcrumbList/BlogPosting where relevant.
- Descriptive alt text; decorative images `alt=""`.
- Clean, lowercase, hyphenated URLs (`/services/website-development`), no query-string pages. Local intent: include Noida naturally in titles/h1s on service pages.

## Performance rules
- Always `next/image` (with `sizes`; `priority` only on the LCP image) and `next/font`.
- GSAP is the only animation library; ask before adding others. No heavy UI/component kits or carousel libraries without asking.
- Keep client JS small: target < 120KB first-load JS per route; LCP < 2.5s; Lighthouse ≥ 90.
- Third-party scripts (analytics, pixels) via `next/script` with `afterInteractive`/`lazyOnload`.

## Workflow
- Make small, focused changes. Read existing code before adding new code.
- Before saying a task is done: run `npm run lint`, `npm run typecheck` and `npm run build`, and report failures honestly.
- **Never commit or push unless asked.**

## Ask first
- Adding any dependency.
- Changing the DB schema or running migrations against a shared DB.
- Changing design tokens (`app/globals.css` `@theme`) or DESIGN.md rules.

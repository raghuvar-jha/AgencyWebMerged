# DESIGN.md: Web Merged design system

The single source of truth for all UI on this site. Code tokens live in `app/globals.css` (`@theme`) and use **exactly** the names below. If you need something that isn't here, add it here first (and ask before changing tokens).

The goal of every page is **lead generation**. Primary conversion: **"Get my free website audit"** form. Secondary: **WhatsApp click**. Audience: small-business owners in India, mostly on mid-range Android phones over 4G.

---

## 1. Design principles

1. **One primary CTA per section.** Every section ends in (or contains) one obvious next step. Secondary actions are ghost/link-styled.
2. **Clarity over decoration.** Lavender surfaces, white cards and violet accents. No gradients-for-the-sake-of-it, no textures, no stock "tech" imagery.
3. **Mobile first, thumb first.** Design at 360px wide first. Every tappable target is ≥ 44×44px. The WhatsApp button is always within thumb reach.
4. **Proof beats promises.** Show real work, real numbers and real reviews, and only real ones. Use `[PLACEHOLDER]` until they exist.
5. **Fast is a feature.** One font family, no heavy JS, images via `next/image`. LCP < 2.5s on 4G.
6. **Consistent rhythm.** Only the tokens and spacing steps below. Same card, same radius and same shadow everywhere.

---

## 2. Colour system

The violet comes from Hero.png / stats-pricing.png (#6D4AE0). It was **darkened to #5B3FD9** so white button text and violet links on white both pass AA comfortably (6.65:1). Tailwind's default palette is **removed** (`--color-*: initial`), so only these utilities exist.

### Light (default)

| Token | Hex | Utility examples | Role |
|---|---|---|---|
| `background` | `#FFFFFF` | `bg-background` | Page background |
| `surface` | `#F6F4FF` | `bg-surface` | Lavender section bg (hero, stats, pre-footer) |
| `surface-strong` | `#EDE9FE` | `bg-surface-strong` | Badges, icon chips, soft fills, selected states |
| `foreground` | `#14122B` | `text-foreground` | Text-primary, headings |
| `muted` | `#5B5873` | `text-muted` | Text-muted: body copy, descriptions, captions |
| `subtle` | `#8B87A8` | `text-subtle` | **Non-text only**: placeholder icons, dividers' dots. Input placeholder text (exempt from AA, still 3.4:1) |
| `border` | `#E4E0F5` | `border-border` (default border colour) | Decorative hairlines, card borders |
| `border-strong` | `#8B87A8` | `border-border-strong` | Form input borders (needs ≥ 3:1 for UI components) |
| `primary` | `#5B3FD9` | `bg-primary`, `text-primary` | Primary CTA, links, active nav, key numbers |
| `primary-hover` | `#4A2FC4` | `hover:bg-primary-hover` | Hover/pressed for primary |
| `primary-foreground` | `#FFFFFF` | `text-primary-foreground` | Text/icons on primary (also used as "white") |
| `accent` | `#F5A524` | `fill-accent`, `bg-accent` | Star ratings, small highlight shapes/underlines. **Never text on light bg** |
| `success` | `#15803D` | `text-success` | Form success, check icons |
| `warning` | `#B45309` | `text-warning` | Warnings |
| `error` | `#DC2626` | `text-error`, `border-error` | Validation errors |
| `whatsapp` | `#25D366` | `bg-whatsapp` | WhatsApp button background (brand recognition) |
| `whatsapp-hover` | `#1EBE5A` | `hover:bg-whatsapp-hover` | WhatsApp hover |
| `whatsapp-foreground` | `#0B2E1A` | `text-whatsapp-foreground` | Text/icon on WhatsApp green (**white fails: 1.98:1**) |

### Project tints

Pastel backgrounds for the image area of project cards (§6.7), sampled from project.png. **Behind mockups only: never behind text, never as section or button colours.** Assign one per project in `lib/content/projects.ts` (`tint`).

| Token | Hex | Utility | Reference card |
|---|---|---|---|
| `tint-green` | `#C2D7B1` | `bg-tint-green` | card 1 |
| `tint-pink` | `#F7B4CA` | `bg-tint-pink` | card 2 |
| `tint-yellow` | `#FAC960` | `bg-tint-yellow` | card 3 |
| `tint-purple` | `#B8A4EC` | `bg-tint-purple` | card 4 |

### Dark ("ink") sections

Used for the featured pricing card, the testimonial/proof band (optional) and the footer. These come from stats-pricing.png's navy "Pro" card.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#12112A` | Dark section/card background |
| `ink-surface` | `#1E1C3A` | Cards on ink |
| `ink-foreground` | `#F6F4FF` | Headings/body on ink |
| `ink-muted` | `#B8B4D6` | Muted text on ink |
| `ink-primary` | `#A996FF` | Links, numbers, icons on ink. Focus ring on ink |

On ink, primary buttons stay `bg-primary text-primary-foreground` (6.65:1). The violet-on-navy edge is visible enough for a filled button.

### Contrast ratios (WCAG 2.x, all text pairs ≥ 4.5:1)

| Text / Background | Ratio | Pass |
|---|---|---|
| foreground / background | 18.24 | AAA |
| foreground / surface | 16.77 | AAA |
| foreground / surface-strong | 15.37 | AAA |
| muted / background | 6.80 | AA |
| muted / surface | 6.25 | AA |
| primary / background (links) | 6.65 | AA |
| primary / surface | 6.11 | AA |
| primary / surface-strong (badge) | 5.60 | AA |
| primary-foreground / primary | 6.65 | AA |
| primary-foreground / primary-hover | 8.42 | AAA |
| success / background | 5.02 | AA |
| warning / background | 5.02 | AA |
| error / background | 4.83 | AA |
| whatsapp-foreground / whatsapp | 7.46 | AAA |
| foreground / accent (e.g. "Most popular" chip) | 8.94 | AAA |
| ink-foreground / ink | 16.94 | AAA |
| ink-muted / ink | 9.25 | AAA |
| ink-muted / ink-surface | 8.22 | AAA |
| ink-primary / ink | 7.45 | AAA |
| border-strong / background (UI, needs 3:1) | 3.43 | AA (UI) |

**Fixed from references:** #6D4AE0 → #5B3FD9 (only 5.67 before and borderline on lavender). White-on-WhatsApp-green → dark green text. Amber is never used as text on white (2.04:1).

---

## 3. Typography

**Family:** Plus Jakarta Sans (variable, Google Fonts via `next/font/google`, `variable: "--font-jakarta"`, `display: "swap"`), mapped to `--font-sans` → `font-sans`. It's a geometric sans matching the Hero/pricing references. **One family only**; serif headings seen in project.png/footer.png were rejected for coherence and load weight.

Sizes are **fluid** (`clamp()`), so a single class works on all screens: no `text-h2 md:text-h1` pairs needed. Each token sets size, line-height, letter-spacing and weight (where listed); override weight with `font-*` only when a component recipe says so. Tailwind's default `text-sm/base/lg…` sizes are **removed**.

| Token (`text-*`) | Mobile (360px) | Desktop (≥1280px) | Line-height | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| `text-display` | 40px | 64px | 1.1 | 800 | -0.03em | Home hero h1 only (measured from Hero.png: 71px line pitch at 1440) |
| `text-display-sm` | 38px | 64px | 1.25 | 700 | -0.01em | Large section h2 in feature panels (stats panel; matched to stats-pricing.png, so tracking stays near-normal) |
| `text-h1` | 34px | 48px | 1.1 | 800 | -0.025em | h1 on inner pages; also big numbers (metric values, prices) with `font-bold` |
| `text-title` | 28px | 28px | 1.15 | 800 | -0.02em | Compact display: hero stat numbers, wordmark (not a heading level) |
| `text-h2` | 28px | 36px | 1.15 | 700 | -0.02em | Section titles |
| `text-h3` | 20px | 24px | 1.3 | 700 | -0.01em | Card titles, sub-sections |
| `text-h4` | 18px | 18px | 1.4 | 600 | -0.005em | Small headings, pricing tier names |
| `text-body-lg` | 17px | 20px | 1.6 | 400 | 0 | Hero/section lead paragraphs |
| `text-body` | 16px | 16px | 1.65 | 400 | 0 | Default body (set on `<body>`) |
| `text-small` | 14px | 14px | 1.55 | 400 | 0 | Card descriptions, meta, form help |
| `text-caption` | 12px | 12px | 1.4 | 600 | 0.06em | Eyebrows (uppercase), labels, legal |

Rules: max line length ~65ch for body (`max-w-article` on long text). Never go below 14px for readable copy (caption is for labels/eyebrows only). Two-tone headlines (Hero.png) are allowed: wrap the second phrase in `<span class="text-primary">`.

---

## 4. Spacing & layout

- **Base unit 4px** (Tailwind default spacing). **Allowed steps:** `1 2 3 4 5 6 8 10 12 14 16 20 24` (4px → 96px; half-steps `0.5 1.5 2.5` only inside small components like badges). Don't use other values.
- **Section padding:** `py-section md:py-section-lg` (64px mobile / 96px desktop). Hero may use `pt-10 pb-section md:pt-16`.
- **Container:** `mx-auto w-full max-w-site px-5 md:px-8` (`max-w-site` = 1280px incl. gutters → 1216px content on desktop; 20px / 32px gutters). Navbar only: `max-w-nav` (1392px → 1328px content). Long-form text: `max-w-article`.
- **Breakpoints** (Tailwind defaults + `xs`): `xs` 360 (token `--breakpoint-xs`, for small-phone grids only, e.g. tech cards 2 → 3 columns), `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design order: base (360) → `md` → `lg`.
- **Grids:**
  - Card grids: `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` (services, testimonials, pricing). Project cards: four per row at lg (project.png, see §6.7).
  - Hero / split sections: `grid items-center gap-10 lg:grid-cols-2`. Text first on mobile, media second.
  - Gaps: `gap-5` inside grids, `gap-3` within card internals, `space-y-4` for text stacks, `mt-10 md:mt-12` between a section header and its content.
- Stack vertically below `md`. No page-level horizontal scroll ever; carousels are not used (they hide content and add JS). One exception: a tab bar that doesn't fit may scroll sideways **inside its own track** (`no-scrollbar` utility, §6.18).

---

## 5. Shape & depth

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 8px | Buttons (measured ≈8px in Hero.png), inputs, small chips, icon tiles |
| `rounded-md` | 12px | Dropdowns, menus |
| `rounded-lg` | 16px | Cards (service, testimonial, stats) |
| `rounded-xl` | 24px | Section panels (pre-footer CTA band, hero trust bar, stats panel on mobile), images in cards |
| `rounded-2xl` | 32px | Large feature panels from md up (stats panel) |
| `rounded-pill` | 9999px | Badges, eyebrow pills, avatars, floating WhatsApp |

**Borders:** 1px `border-border` on cards on white. Cards on `surface` need no border (shadow only). Inputs: 1px `border-border-strong`, error `border-error`. Featured pricing card: no border, `bg-ink`.

**Shadows** (violet-tinted, soft; matches the floating stat cards in Hero.png):

| Token | Use |
|---|---|
| `shadow-card` | Default resting cards, navbar on scroll |
| `shadow-raised` | Card hover, floating WhatsApp, mobile menu panel, featured pricing card |
| `shadow-focus` | Optional extra halo on focused inputs (`focus:shadow-focus`) |

---

## 6. Components

Folder: primitives in `components/ui/`, page sections in `components/sections/`. Recipes below are the canonical class strings. Extract them into the component, don't re-type them in pages.

**Shared states (all interactive elements):**
- Focus: global `:focus-visible` outline 2px `primary`, 2px offset (`ink-primary` inside `.bg-ink`). Never remove outlines.
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`.
- Loading: keep width, swap label to a spinner + "Sending…", `aria-busy="true"`, disabled.
- Transitions: `transition-colors duration-150` (see §8).

### 6.1 Button
Anatomy: `<button>`/`<Link>` → optional leading icon (20px) → label → optional trailing icon (`ArrowRight` 18px). Min height 48px (`h-12`), small size 44px (`h-11`).

Implemented in `components/ui/Button.tsx` (`Button`, `ButtonLink`, `buttonClasses()`).

Base: `inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`

| Variant | Classes | Use |
|---|---|---|
| primary | `bg-primary text-primary-foreground hover:bg-primary-hover shadow-card` | The one main CTA per section |
| secondary | `bg-background text-primary border border-primary hover:bg-surface-strong` | Second option next to primary |
| ghost | `text-primary hover:bg-surface-strong px-4` | Tertiary (e.g. "Watch demo", "See all work") |
| whatsapp | `bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover` + WhatsApp icon | "Chat on WhatsApp" |
| on-ink primary | same as primary | Inside `bg-ink` |
| on-ink secondary | `border border-ink-muted text-ink-foreground hover:bg-ink-surface` | Inside `bg-ink` |

Sizes: `sm` (pricing CTAs) = `h-11 px-4 text-small` · `md` (default, navbar CTA) = `h-12 px-6 text-small` · `lg` (hero / mobile menu / stats pill) = `h-14 px-7 text-body`. Full width: `fullWidth` prop (`w-full`).

Options:
- `shape="pill"` → `rounded-pill` (default shape is `rounded-sm`).
- `trailingIcon="arrow-circle"` → appends a `size-8` circle (`border-2 border-current/80`) holding `ArrowRight size-4`, and replaces the size padding with `pl-7 pr-2 gap-3` (stats-pricing.png "See How It Works").
- `trailingIcon="arrow"` → appends a plain `ArrowRight size-4` (stroke 2.25) after the label; size padding unchanged (project.png "See All Projects": `size="sm" shape="pill"`).
- Inside `bg-ink` the global focus ring switches to `ink-primary` automatically; no separate ink variant needed.
Loading: `<Loader2 className="size-5 animate-spin" aria-hidden />` + label "Sending…".

### 6.2 Link (inline)
`text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary`. On ink: `text-ink-primary`.
Arrow link ("View case study →"): `inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:gap-2.5 transition-all` with `ArrowRight size-4`. External links get `rel="noopener"` and a visible label, never "click here".

### 6.3 Navbar
Implemented: `components/sections/Navbar.tsx` (Server) + `components/sections/MobileMenu.tsx` (the only client code). Rendered globally in `app/layout.tsx` after a "Skip to content" link. Copy in `lib/content/home.ts` (`navLinks`, `navCta`).
Anatomy (Hero.png): logo left · links + primary CTA right. No border.
- Wrapper: `sticky top-0 z-40 bg-surface/70 backdrop-blur-md`. It looks transparent over the hero gradient and turns into a frosted lavender bar on scroll (no JS).
- Inner: `mx-auto flex h-16 lg:h-24 max-w-nav items-center justify-between px-5 md:px-8`.
- Logo (`components/ui/Logo.tsx`): mark `size-10 lg:size-12` + wordmark `text-h4 lg:text-title font-extrabold`, `gap-3`, links to `/`. **[PLACEHOLDER] mark until the real logo exists.**
- Links (`lg:flex`, `gap-10`): `text-small font-medium text-muted hover:text-primary`.
- CTA: `ButtonLink` md, `ml-12`, "Get Free Audit".
- **Mobile (< lg):** hamburger `size-11` (`aria-expanded`, `aria-controls`, label toggles Open/Close menu). Panel: `absolute inset-x-0 top-full bg-background shadow-raised border-t`, links `block py-4 text-h4` with dividers, then full-width primary CTA (lg) + WhatsApp button (lg). Closes on Escape (focus returns to the button), outside pointer-down, link click and resize to ≥ lg; locks body scroll while open.
- Gotcha: `backdrop-blur` makes the header the containing block for `position: fixed` children, so don't put full-screen overlays inside the header.

### 6.4 Hero
Implemented: `components/sections/Hero.tsx` + `components/sections/hero/{StatCard,TrustBar,Decorations}.tsx`. Copy in `lib/content/home.ts` (`hero`, `heroStats`, `trustBar`).
Anatomy (Hero.png): eyebrow pill → two-tone h1 → lead → CTA row (primary + WhatsApp text link) → social proof → media (photo on blobs + 3 stat cards) → trust bar.
- Section: `relative -mt-16 lg:-mt-24 pt-16 lg:pt-24 overflow-hidden bg-linear-to-br from-surface to-surface-strong/70` (pulled up under the sticky navbar so the gradient runs behind it).
- Grid: `max-w-site px-5 md:px-8 pt-10 lg:pt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-8`. Copy is centred below lg and left-aligned at lg.
- Eyebrow: Badge **eyebrow** variant (§6.13).
- h1: `mt-8 text-display text-foreground`, second phrase `block text-primary`.
- Lead: `mt-6 max-w-md text-body-lg text-muted`.
- CTAs: `mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8`: `ButtonLink` lg + arrow, then the WhatsApp text link `h-11 text-body font-semibold text-primary` with icon.
- Social proof: avatars `size-12 rounded-pill ring-2 ring-background -space-x-3` + 5 stars `size-4 fill-accent text-accent` + `text-small text-muted`. **[PLACEHOLDER] until real reviews exist.**
- Media: photo slot `aspect-4/5 max-w-xs lg:max-w-sm`, with `next/image fill priority object-contain` when `hero.photo.src` is set, otherwise a dashed placeholder panel. Decorations (`HeroBlobs` `fill-primary/10`, `Squiggle`, `Sparkle`) are inline SVG, `aria-hidden`, `lg` only.
- Stat card (`StatCard`): `rounded-lg bg-background/85 shadow-card`. Below lg: a 3-column grid under the photo, stacked compact (`p-3 sm:p-4`, icon `size-10`, number `text-h4`, label `text-caption`). At lg: `absolute right-0 top-1/2 -translate-y-1/2 w-60 flex-col gap-8`, overlapping the photo; card `flex-row gap-4 px-5 py-8`, icon circle `size-14 bg-surface-strong text-primary`, number `text-title`, label `text-small text-muted whitespace-nowrap`.
- Trust bar (`TrustBar`): `mt-14` (`pt-14` on the wrapper) then `rounded-xl bg-background/90 px-5 md:px-10 py-8 shadow-card`; title `text-body font-medium text-center`; logos `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`, `h-8 w-auto grayscale` images, or dashed `[CLIENT LOGO n]` slots.

### 6.5 Section header
Anatomy: eyebrow (optional) → h2 → intro (optional) → optional right-aligned link on desktop.
`max-w-2xl` (centred: `mx-auto text-center`).
- Eyebrow: `text-caption uppercase text-primary`.
- Title: `text-h2 text-foreground mt-2`.
- Intro: `text-body-lg text-muted mt-4`.
Left-aligned by default; centre only for pricing/FAQ/testimonials.

### 6.6 Service card
Anatomy: icon tile → h3 → 1–2 line description → 3 bullet outcomes (optional) → arrow link.
`group flex flex-col gap-3 rounded-lg border border-border bg-background p-6 shadow-card transition-shadow hover:shadow-raised`
- Icon tile: `grid size-12 place-items-center rounded-sm bg-surface-strong text-primary` (lucide 24px).
- Title `text-h3`, description `text-small text-muted`, link per §6.2 pushed to bottom with `mt-auto`.
- Whole card clickable via the title link with `after:absolute after:inset-0` (card `relative`), one tab stop only.

### 6.7 Project card + Projects section ("Selected Work")
Implemented: `components/ui/ProjectCard.tsx` + `components/sections/ProjectsSection.tsx`. Data: `lib/content/projects.ts` (`Project` type, `featuredProjects`, `projectsSection`), separate from home.ts so the `/work` pages can reuse it. Placeholders only until real projects exist.
Anatomy (project.png): tinted image area with device mockup → category → title → 2-line description → "View Case Study →".
- Card: `<article aria-labelledby>` with `group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-card transition duration-200 ease-out-soft hover:shadow-raised motion-safe:hover:-translate-y-1`.
- Whole card clickable: the link is a stretched link (`after:absolute after:inset-0`), the only tab stop. It has `focus-visible:outline-none`, and the card draws the ring instead: `has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary`. Never nest other interactive elements in the card.
- Media: `relative aspect-7/4 overflow-hidden bg-tint-*` (measured: image area ≈ 51% of the card). Real image: wrapper `absolute inset-x-0 bottom-0 h-9/10` + `next/image fill object-contain object-bottom`, `sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"`, lazy (no `priority`). The two-phone composition is part of the image, not CSS. Placeholder: two `aspect-1/2 rounded-md border-2 border-foreground/10 bg-background` phones (`h-5/6`, then `h-3/4 -ml-5 mt-6`) + sr-only "[Project mockup]".
- Body `flex flex-1 flex-col p-5`: category `text-small font-medium text-muted` · title `<h3>` `mt-0.5 text-h4 font-bold text-foreground` · description `mt-1.5 line-clamp-2 text-small text-muted` · link wrapper `mt-auto pt-3` (links line up across cards).
- Link: `inline-flex items-center gap-1.5 text-small font-bold text-foreground group-hover:text-primary` + `ArrowRight size-3.5` with `motion-safe:group-hover:translate-x-1`; `aria-label="View Case Study: {title}"`.
- Section: `id="work"` (nav "Work" → `/#work`), white background (it follows the lavender hero), `py-section md:py-section-lg`, `scroll-mt-16 lg:scroll-mt-24` (sticky navbar). No wave edges or doodles (§12).
- Header: stacked `gap-6` below lg; at lg the same `grid-cols-4 gap-8` as the cards with `items-end`: eyebrow (`text-caption uppercase text-primary`) + `text-h2` + `Underline` (`mt-2 block w-28`) span columns 1–2, the intro (`max-w-md text-body text-muted`, 2 lines, inline `Heart size-4 fill-current text-primary role="img" aria-label="love"`) starts on column 3.
- Grid `<ul>`, `mt-10`:
  - < sm: one column, `max-w-md` centred, `gap-6`. **No horizontal scroll row** (§4).
  - sm–lg: `grid-cols-4`, cards `col-span-2` (two per row); an odd last card gets `col-start-2` (centred).
  - lg+: `grid-cols-8 gap-8`, cards `col-span-2` (four per row, ~280×336 at 1440). With 1–3 cards the first gets `col-start-4/3/2` so the row stays centred.
- CTA `mt-12`, centred: `ButtonLink size="sm" shape="pill" trailingIcon="arrow"` "See All Projects" → `/work`. The section's only CTA.

### 6.8 Testimonial
Anatomy (reviews.png): avatar + name/role → 5 stars → quote.
`flex flex-col gap-4 rounded-lg bg-background p-6 shadow-card` (on ink: `bg-ink-surface`, text `ink-foreground`, muted `ink-muted`).
- Header `flex items-center gap-3`: avatar `size-12 rounded-pill object-cover`, name `text-small font-semibold`, role/business + city `text-caption text-muted normal-case tracking-normal`.
- Stars: `Star` ×5 `size-4 fill-accent text-accent`, with `aria-label="Rated 5 out of 5"` on the wrapper.
- Quote: `<blockquote class="text-body text-foreground">`.
- Section variant: full-bleed `bg-primary` band (reviews.png). Then headings use `text-primary-foreground` and cards stay white. Or `bg-ink`. Real reviews only; link to the Google Business profile if available.

### 6.9 Pricing card + Pricing section
Implemented: `components/ui/PricingCard.tsx` (`variant: "default" | "featured"`, defaults from `plan.featured`) + `components/sections/PricingSection.tsx`. Data: `pricing` in `lib/content/home.ts` (`PricingPlan` type).
Anatomy (stats-pricing.png): name (+ badge) → "Starting at" → price + period → CTA → check-list.
- Card: `<article aria-labelledby>` with `flex flex-col rounded-lg px-8 py-10 md:px-10 lg:px-8 xl:px-10`.
  - default: `border border-border bg-background shadow-card`
  - featured: `bg-ink shadow-raised` (no border)
- Top row: `flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-2`; name `<h3>` `text-h4 font-medium text-muted` (featured `text-ink-foreground/85`); badge `Badge variant="outline-ink"` (featured only).
- Price block `mt-6`: "Starting at" `text-small text-muted` (featured `text-ink-muted`); then `<p class="flex flex-wrap items-baseline gap-x-1.5">` price `text-h1 font-bold text-foreground` (featured `text-ink-foreground`) + period `text-body text-muted` (featured `text-ink-muted`). Use ₹ and Indian grouping (₹24,999).
- CTA `mt-6`: `ButtonLink size="sm" fullWidth`, `aria-describedby` = plan name id (several "Get Started" links need context).
- Features `mt-8 space-y-4`: `flex gap-3 text-small text-muted` (featured `text-ink-foreground/85`) with `Check mt-0.5 size-4 strokeWidth 2.5 text-foreground` (featured `text-ink-foreground`), `aria-hidden`.
- Section: `pt-8 pb-section md:pb-section-lg`; header `mx-auto max-w-2xl text-center`, h2 `text-h2`, subtitle `mt-4 text-body-lg text-muted`; cards `mt-10`.
- Layout:
  - < md: one column, `max-w-md` centred, `gap-5`, **featured first** (`order-first`), no extra height.
  - md: **2 + 1**, featured spans both columns on top (`md:col-span-2 md:max-w-md md:mx-auto`), the other two side by side. No horizontal scroll.
  - lg+: `flex items-stretch justify-center gap-6 xl:gap-8`, content order, equal heights; default `flex-1 max-w-84`, featured `flex-1 max-w-88 -my-2` (16px taller).
- Contrast: `ink-foreground/85` on ink 12.4:1, `ink-muted` on ink 9.25:1. Badge border `primary/70` on ink is decorative (≈2:1); the badge text carries the meaning.
- TODO when real: a "Prices exclude GST" note under the grid, if applicable.

### 6.10 FAQ accordion
Native `<details name="faq">` (no JS; exclusive open via `name`). Must also emit FAQPage JSON-LD.
- List: `divide-y divide-border rounded-lg border border-border bg-background`.
- `<summary>`: `flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-h4 [&::-webkit-details-marker]:hidden` + `ChevronDown size-5 text-muted transition-transform group-open:rotate-180` (`<details class="group">`). Min height 56px.
- Answer: `px-5 pb-5 text-body text-muted`.

### 6.11 Form fields + validation
Anatomy: label → (help) → control → error message.
- Label: `block text-small font-semibold text-foreground mb-1.5`. Required marker: `<span class="text-error" aria-hidden>*</span>` + `required`.
- Input/select/textarea: `block w-full h-12 rounded-sm border border-border-strong bg-background px-4 text-body text-foreground placeholder:text-subtle focus:border-primary focus:shadow-focus focus:outline-none` (textarea: `h-auto min-h-32 py-3`). Font-size 16px minimum (prevents iOS zoom).
- Help: `mt-1.5 text-small text-muted`, linked via `aria-describedby`.
- Error: input gets `aria-invalid="true" border-error`. Message `mt-1.5 flex gap-1.5 text-small text-error` with `AlertCircle size-4`, `id` referenced by `aria-describedby`. Messages say how to fix ("Enter a 10-digit mobile number").
- Form-level error: `role="alert"` box `rounded-sm border border-error bg-background p-4 text-small text-error`. Success: replace form with success panel (`CheckCircle2 text-success`, h3 "Thanks! We'll WhatsApp/call you within 24 hours").
- Correct input types: `type="tel" inputmode="numeric" autocomplete="tel"`, `type="email" autocomplete="email"`, `type="url"`.

### 6.12 Lead form ("Free website audit")
The primary conversion. Server action + zod on the server; same schema for client hints.
Fields (keep ≤ 4 required): **Name**, **WhatsApp / phone** (+91), **Website URL** (optional, "Don't have one? Leave blank"), **What do you need?** (select: Website, App, SEO, Google/Meta Ads, Not sure). Optional message. Hidden honeypot field.
- Wrapper: `rounded-xl bg-background p-6 md:p-8 shadow-raised` (on `bg-surface` section or in hero right column on inner pages).
- Title `text-h3` "Get your free website audit", sub `text-small text-muted` "Report in 48 hours. No obligation. [PLACEHOLDER]".
- Fields stack `space-y-5`; submit full-width primary "Get my free audit".
- Under submit: `text-caption text-muted normal-case tracking-normal` privacy line + "Prefer WhatsApp?" link.
- Uses `useActionState` for pending/errors; button shows loading state.

### 6.13 Badge
Implemented: `components/ui/Badge.tsx` (`variant`). Base `inline-flex shrink-0 items-center gap-1.5 rounded-pill text-caption whitespace-nowrap`; padding `px-3 py-1 uppercase` unless noted.
- soft: `bg-surface-strong text-primary`
- eyebrow (hero, Hero.png): `rounded-pill border border-border bg-background/60 px-4 py-2.5 text-caption uppercase text-primary` (≈38px tall)
- outline: `border border-border bg-background text-muted`
- highlight ("Most popular"): `bg-accent text-foreground`
- on ink (`ink`): `bg-ink-surface text-ink-primary`
- outline on ink (`outline-ink`, "Most Popular" on the featured pricing card): `h-8 px-4 border border-primary/70 font-medium normal-case tracking-normal text-ink-foreground/85`

### 6.14 Metric card + Stats panel
Implemented: `components/ui/MetricCard.tsx` (`{ value, label }`, number only; the hero's `StatCard` has an icon) + `components/sections/StatsSection.tsx`. Data: `stats` in `lib/content/home.ts`. Decorations: `components/decorations/{Underline,RingPattern}.tsx`.
- **Only real, verifiable numbers.** Until then values are `[X]` placeholders. No count-up animation (§8).
- MetricCard: `flex h-full flex-col items-center justify-center gap-2.5 rounded-lg bg-background px-5 py-8 text-center shadow-card`; value `<p class="text-h1 font-bold text-primary">`; label `<p class="max-w-32 text-body leading-snug font-medium text-muted">` (max 2 lines). Fixed `xl:h-45 xl:w-44` (176×180) in the stagger.
- Section: `pt-section pb-8` → container → panel `relative overflow-hidden rounded-xl bg-surface px-6 py-10 md:rounded-2xl md:px-12 md:py-16 lg:px-20 lg:py-20`.
- `RingPattern`: 4 concentric circles, `stroke-primary-foreground/60`, 1.5px, `size-175` centred at `left-3/5 top-1/2`, md+ only.
- h2: `text-display-sm`, one `block` span per line ("[X]+ Happy / Businesses / Trust Us"), last line `whitespace-nowrap` so the underline never wraps; `Underline` (`stroke-primary`, 3px, `w-28 md:w-40`, `ml-4 md:ml-6`, `inline-block align-middle`) after the last word.
- Paragraph `mt-8 max-w-md text-body-lg text-muted`; CTA `mt-10` `ButtonLink size="lg" shape="pill" trailingIcon="arrow-circle"`, `w-full sm:w-auto`.
- Cards `<ul>` (DOM order 1–4):
  - < lg: `grid grid-cols-2 gap-4` (2×2).
  - lg: `grid-cols-4` (one row; the stagger leaves the headline too narrow at 1024).
  - xl+: text and cards side by side (`xl:flex-row xl:justify-between`), cards `grid-cols-3 grid-rows-[auto_1fr] gap-x-5 gap-y-8 items-start` ("rising steps"):
    | Card | Placement |
    |---|---|
    | 1 | `col-start-1 row-span-2 mt-62` (248px down) |
    | 2 | `col-start-2 row-span-2 mt-26` (104px down) |
    | 3 | `col-start-3 row-start-1` (highest) |
    | 4 | `col-start-3 row-start-2` (32px below card 3) |
    `grid-rows-[auto_1fr]` keeps row 1 hugging card 3, so the spanning cards don't push card 4 down.

### 6.15 Footer
Anatomy (footer.png): **pre-footer CTA band** → columns → bottom bar.
- Pre-footer band (repurposed from newsletter to audit CTA): `rounded-xl bg-surface-strong p-6 md:p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between`. Icon circle `size-14 rounded-pill bg-primary text-primary-foreground`, `text-h3` "Not sure what's holding your website back?", primary button + whatsapp button.
- Footer: `bg-ink text-ink-muted`, `grid gap-10 sm:grid-cols-2 lg:grid-cols-4 py-section`.
  - Col 1: logo, 2-line blurb, NAP (Name, Address, Phone: must match the Google Business profile), social icons (`size-11` hit area).
  - Col 2 Services, Col 3 Company (About, Work, Blog, Contact), Col 4 Contact (WhatsApp, email, hours, Noida).
  - Headings `text-h4 text-ink-foreground`, links `text-small hover:text-ink-foreground`, `py-1.5` for touch.
- Bottom bar: `border-t border-ink-surface py-6 text-caption normal-case tracking-normal` © year, Privacy, Terms.
- Payment logos from footer.png: **not used** (not relevant for a service agency).

### 6.16 Floating WhatsApp button
Always visible, bottom-right; the secondary conversion.
`fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-2 rounded-pill bg-whatsapp px-4 text-whatsapp-foreground shadow-raised hover:bg-whatsapp-hover md:bottom-6 md:right-6`
- Icon 28px (WhatsApp glyph as inline SVG; lucide has no brand icons). Label "Chat" visible on `md+`, `sr-only` on mobile (button becomes `size-14 justify-center px-0`).
- `href="https://wa.me/91XXXXXXXXXX?text=<url-encoded prefilled message incl. page name>"`, `target="_blank" rel="noopener"`, `aria-label="Chat with us on WhatsApp"`.
- Must not cover the lead form submit on mobile: add `pb-20` to the page bottom / footer on mobile.

### 6.17 Tech card
Implemented: `components/ui/TechCard.tsx` (server). Data: `lib/content/tech.ts` (`TechCategory`, `TechItem { name, slug, tag? }`). Logos: `lib/tech-icons.ts` (`getTechLogo(slug)`), §7.
Anatomy: logo → name → optional tag. Not a link: the `<li>` is the grid cell, the card is a `<div>` inside it.
- Cell: `w-1/2 px-2.5 xs:w-1/3 md:w-1/4 lg:w-1/6` (half of the 20px gutter on each side).
- Card: `flex h-full flex-col items-center rounded-lg border border-border bg-background px-3 py-5 text-center transition duration-200 ease-out-soft hover:border-primary/40 hover:shadow-card motion-safe:hover:-translate-y-0.5`.
- Logo: `<svg viewBox="0 0 24 24" aria-hidden class="size-10 fill-current">` with `style={{ color: brandHex }}` (or `text-foreground` for near-invisible colours). Fallback: `grid size-10 place-items-center rounded-sm bg-surface-strong text-small font-bold text-primary` with initials (`aria-hidden`).
- Name `mt-3 text-small font-semibold text-foreground`; tag `mt-0.5 text-caption font-medium normal-case tracking-normal text-muted`.
- List: `<ul class="-mx-2.5 flex flex-wrap justify-center gap-y-5">` (gutter pattern). Columns: 2 below 360px · 3 from `xs` · 4 from `md` · 6 from `lg`; a short last row is **centred** by `justify-center`. (A plain CSS grid can't centre a partial row.)

### 6.18 Tabs (segmented control) + Tech stack section
Implemented: `components/ui/TechTabs.tsx` (the only client code: active index + keys) + `components/sections/TechStackSection.tsx` (server). The server renders the tab icons and **every panel**, then passes them in, so all content is in the HTML (SEO, no-JS shows the first panel) and logo data never ships as JS.
- Track (also the scroller): `no-scrollbar mx-auto w-fit max-w-full overflow-x-auto rounded-pill bg-surface-strong p-1.5`. The rounded ends stay intact when tabs overflow on mobile.
- Tablist `role="tablist" aria-label` → `flex w-max gap-1`.
- Tab `<button role="tab" aria-selected aria-controls>`: `inline-flex h-11 shrink-0 items-center gap-2 rounded-pill px-5 text-small font-semibold whitespace-nowrap transition-colors duration-150` + lucide icon `size-4` (`aria-hidden`).
  - active: `bg-background text-foreground shadow-card` · inactive: `text-muted hover:text-foreground` (`muted` on `surface-strong` ≈ 5.7:1).
- Panel `role="tabpanel" aria-labelledby tabIndex={0}`, inactive ones `hidden`; fade in with `motion-safe:transition-opacity motion-safe:duration-150 motion-safe:starting:opacity-0` (CSS `@starting-style`, no keyframes).
- Keyboard (automatic activation, roving tabindex): ←/→ move and wrap, Home/End jump; focus moves to and selects the tab, which `scrollIntoView({ inline: "nearest" })` inside the track; Tab goes on into the panel.
- Section: `id="tech"`, full-bleed `bg-surface py-section md:py-section-lg` between Projects (white) and Stats. Centred header per §6.5 (`max-w-2xl`, eyebrow, `text-h2`, `Underline mx-auto mt-2 block w-28`, intro `mt-4 text-body text-muted`). Tabs `mt-10`, panel `mt-10`, category line `mt-8 text-center text-small text-muted`.

---

## 7. Iconography & imagery

- **Technology logos:** `simple-icons` (CC0, pinned), imported by name only in `lib/tech-icons.ts` (server-only, so 0 KB client JS). Rendered as inline SVG in the brand's own hex: the **only** non-token colours allowed. Near-invisible brand colours (< 1.5:1 on white, e.g. JavaScript yellow) render in `text-foreground`. Logos are `aria-hidden`; the visible name is the label. Missing logos (AWS, Ahrefs): initials badge.
- **Icons:** `lucide-react` (installed; import individual icons, tree-shaken). It has **no brand logos**. Stroke `1.75` (2 for ≤16px). Sizes: 16 (`size-4`) inline/stars, 20 (`size-5`) buttons/lists, 24 (`size-6`) card icon tiles. Colour inherits (`currentColor`). Decorative icons: `aria-hidden`. Icon-only buttons need `aria-label`. Brand icons (WhatsApp, Instagram, Facebook, LinkedIn) as small inline SVG components in `components/ui/icons/`.
- **Imagery:** real photos of the founder, real client screenshots (device mockups as in project.png), Indian small-business context. No generic stock "handshake/laptop" photos or AI faces pretending to be clients.
- **Aspect ratios:** hero portrait 4/5, project card image area 7/4 (case study page cover 4/3), blog cover 16/9 (also the OG image ratio ~1.91/1 generated separately), avatars 1/1.
- **`next/image` always.** Hero image `priority` + `sizes`. Everything else lazy (default). Provide `width/height` or `fill` + sized parent to avoid CLS. AVIF/WebP via Next defaults. Source images ≤ 2400px wide.
- Alt text: describe content and purpose ("Mobile screens of the Sharma Dental booking site"); decorative images `alt=""`.

---

## 8. Motion

Minimal and CSS-only. No animation libraries without asking.

| What | Duration | Easing |
|---|---|---|
| Colour/background/border hover | 150ms (`duration-150`) | default `ease-out` |
| Card shadow lift | 200ms (`duration-200 transition-shadow`) | `ease-out-soft` |
| Accordion chevron, mobile menu | 200ms | `ease-out-soft` |
| Arrow-link nudge | 150ms (gap change) | default |

- No scroll-triggered reveals, parallax, auto-playing carousels or count-up numbers (they hurt LCP/INP and accessibility).
- `prefers-reduced-motion: reduce` disables all transitions/animations and smooth scroll globally (in `globals.css`). Spinners still indicate loading via the "Sending…" text.

---

## 9. Page templates

### Home (`/`)
1. **Navbar**: orientation + always-visible "Free audit" CTA.
2. **Hero**: who we help + outcome promise + audit CTA + WhatsApp. Proof row only if real.
3. **Trust strip**: real client logos or "Trusted by businesses in Noida" + Google rating. Omit if none.
4. **Services** (4 cards: Websites, Mobile apps, SEO, Google & Meta Ads): what we sell, each linking to a service page.
5. **Selected work** (case study cards): proof.
5b. **Tech stack** (tabbed technology cards, `bg-surface` band): credibility for web/app/backend/marketing skills.
6. **Process** (3–4 steps: Audit → Plan → Build → Grow): reduces uncertainty.
7. **Stats row**: real numbers only, else skip.
8. **Testimonials**: social proof.
9. **Pricing teaser** ("Starting at"): pre-qualifies leads, links to /pricing or service pages.
10. **Lead form section** (bg-surface, form + "what you get in the audit" list): primary conversion.
11. **FAQ**: handle objections + FAQPage JSON-LD.
12. **Pre-footer CTA band + Footer**: last-chance conversion, NAP for local SEO.

### Service page (`/services/[slug]`)
Hero (h1 = service + city, lead, audit CTA) → Problems we solve (pain points) → What's included (feature list/cards) → Process → Related case studies → Pricing (packages) → Testimonials (service-specific) → FAQ (service-specific) → Lead form → Footer. JSON-LD: Service + FAQPage + BreadcrumbList.

### Case study page (`/work/[slug]`)
Hero (client, industry, one-line result, cover image) → Summary box (challenge / solution / results, tech, timeline) → The challenge → What we did (screenshots) → Results (real metrics) → Client quote → Next case study + CTA "Want results like this? Get a free audit" → Footer.

### Blog post (`/blog/[slug]`)
Breadcrumbs → h1 + meta (author, date, reading time) → cover image 16/9 → table of contents (long posts) → article body (`max-w-article`, typography styles) with one inline CTA box mid-article → author box → related posts → lead form/CTA band → Footer. JSON-LD: Article/BlogPosting + BreadcrumbList.

### Contact (`/contact`)
h1 "Let's grow your business" + short lead → two columns: Lead form (left/top on mobile) | direct options (WhatsApp button, phone `tel:`, email, hours, address + lazy map link, not an embedded iframe) → mini FAQ (response time, pricing, process) → Footer. JSON-LD: LocalBusiness.

---

## 10. Content & voice

- **Tone:** friendly, direct, plain English that a shop owner in Noida understands. "You" focused. No jargon ("synergy", "leverage", "cutting-edge"). Short sentences. Indian English spelling, ₹ and Indian number grouping (₹1,50,000 or "₹1.5 lakh").
- **Headline formulas:**
  - Outcome + audience: "More customers for your Noida business, from Google and WhatsApp."
  - Problem → fix: "Your website should bring enquiries, not just look nice."
  - Specific + local: "Web apps and mobile apps that win customers in Noida."
- **CTA wording** (first person, outcome first): primary "Get my free website audit", short "Free audit", WhatsApp "Chat on WhatsApp", secondary "See our work", "View case study". Never "Submit", "Learn more", "Click here".
- **Microcopy:** state what happens next ("We'll reply on WhatsApp within 24 hours").
- **Hard rule: never invent clients, testimonials, logos, ratings, stats or case-study results.** Use `[PLACEHOLDER: real testimonial from client]`, `[PLACEHOLDER: number of projects]` etc. until the owner supplies real data. Placeholders are visible, and must be resolved before launch.

---

## 11. Accessibility & performance budget

**Accessibility (WCAG 2.2 AA):**
- Text contrast ≥ 4.5:1 (large text ≥ 3:1), UI component contrast ≥ 3:1 (all tokens above comply).
- Visible focus on every interactive element (global `:focus-visible`). Keyboard reachable menu, accordion, form.
- Touch targets ≥ 44×44px (`h-11`/`size-11` minimum; buttons `h-12`).
- One `h1` per page, logical heading order, landmarks (`header`, `nav`, `main`, `footer`), skip link "Skip to content".
- Forms: labels (not placeholder-only), `aria-describedby` for help/errors, `aria-invalid`, errors announced (`role="alert"`).
- `lang="en-IN"`, descriptive link text, alt text on all informative images.

**Performance budget (mobile, Lighthouse, Moto G-class on 4G):**
| Metric | Target |
|---|---|
| Lighthouse Performance / Accessibility / Best Practices / SEO | ≥ 90 / ≥ 95 / ≥ 95 / 100 |
| LCP | < 2.5s (aim < 2.0s) |
| CLS | < 0.1 |
| INP | < 200ms |
| First-load JS per route | < 120KB gzipped |
| Hero image | < 120KB (AVIF/WebP), `priority` |
| Fonts | 1 variable family, `display: swap`, latin subset only |
| Third-party scripts | GA4/Meta Pixel loaded `afterInteractive`/`lazyOnload` via `next/script`; no chat widgets |

---

## 12. Do / Don't

| Do | Don't |
|---|---|
| Lavender `surface` sections alternating with white (Hero.png, stats-pricing.png) | Cream/pink backgrounds or a second loud brand colour (project.png rejected) |
| Two-tone h1: ink + violet phrase (Hero.png) | Serif display headings (project.png/footer.png rejected) |
| White cards with soft violet shadow and 16–24px radius | Hard black shadows, sharp corners, heavy borders |
| Eyebrow pill badge above headlines (Hero.png) | More than one eyebrow per section |
| Stat cards with violet numbers (Hero.png, stats-pricing.png) | Inflated/fake numbers ("10,000+ happy clients") |
| One dark `ink` element for emphasis (featured pricing card, footer) | Whole pages in dark mode, or several competing dark blocks |
| Testimonial cards with avatar, name and stars (reviews.png) | Anonymous or invented testimonials, AI-generated faces |
| Case study cards with industry label + result + arrow link (project.png) | Portfolio items without outcomes |
| Pre-footer CTA band (footer.png), used for the audit | Newsletter signup as the main footer CTA; payment logos |
| Amber only for stars/small highlights | Amber text on white (2.0:1) |
| Dark text on WhatsApp green | White text on #25D366 (1.98:1) |
| Static, fast, CSS-only motion | Decorative hand-drawn squiggles as heavy images, scroll animations, carousels |

---

## 13. Reference map

| File | What was taken | What was rejected |
|---|---|---|
| `docs/design/Hero.png` | Violet primary + lavender bg, geometric sans (→ Plus Jakarta Sans), two-tone bold headline, eyebrow pill badge, primary CTA + ghost secondary, avatar-stack + stars social proof, floating stat cards with icon chips, white sticky navbar with CTA on the right, "trusted by" logo strip | Decorative scribble/sparkle graphics, purple blob behind the photo (heavy, distracting) |
| `docs/design/reviews.png` | Testimonial card anatomy (avatar, name, amber stars, quote), 3-up row, full-bleed violet band variant | Wavy section edges, handwritten "It's possible!" doodles |
| `docs/design/project.png` | Project card anatomy (tinted image top with device mockups, category label, title, description, "View Case Study →"), the four pastel tints (→ `tint-*`), 4-column grid, header with intro on the 3rd column, centred pill "See All Projects" button below | Cream background, hot-pink CTA (#E8336D), serif "Selected Work" heading, script-like underline |
| `docs/design/stats-pricing.png` (was OfferandPrice.png) | Stats block (headline + white stat cards with violet numbers on lavender), 3-tier pricing with dark navy featured card (→ `ink` palette) + "Most popular" badge, check-list features, full-width CTAs, pill CTA with icon | Fake-scale stats copy ("10,000+ … companies"), $/month SaaS pricing model (→ ₹ "starting at" project pricing) |
| `docs/design/footer.png` | Lavender pre-footer CTA band with icon circle + inline action, multi-column footer (brand + blurb + socials, link columns), copyright bar | Newsletter/discount framing (→ audit CTA), payment-method logos, serif heading, light footer (→ `ink` footer) |
| `docs/design/notes.md` | *Not present*. Owner supplied: name **Web Merged**, city **Noida**, focus **web apps + SEO + mobile apps**. Contact/NAP details live in `lib/site.ts` (placeholders until supplied) | n/a |

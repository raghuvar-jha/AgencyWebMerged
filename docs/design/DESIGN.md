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
| `surface` | `#F6F4FF` | `bg-surface` | Lavender section bg (hero, stats, tech band, footer band) |
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

Used for the featured pricing card and the testimonial/proof band (optional). The footer is **light** (§6.15). These come from stats-pricing.png's navy "Pro" card.

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
- **Container:** always the shared `<Container>` (`components/ui/Container.tsx`; classes also exported as `containerClasses`) = `mx-auto w-full max-w-site px-5 md:px-8` (`max-w-site` = 1280px incl. gutters → 1216px content on desktop; 20px / 32px gutters). **Never retype the string.** Panels (Stats) and carousels (Reviews) sit directly on the container's content box with no margin, so their edges line up at every width (1440: x 112–1328 · 1024: 32–992 · 768: 32–736 · 375: 20–355). Navbar only: `max-w-nav` (1392px → 1328px content). Long-form text: `max-w-article`.
- **Breakpoints** (Tailwind defaults + `xs`): `xs` 360 (token `--breakpoint-xs`, for small-phone grids only, e.g. tech cards 2 → 3 columns), `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design order: base (360) → `md` → `lg`.
- **Grids:**
  - Card grids: `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` (services, testimonials, pricing). Project cards: four per row at lg (project.png, see §6.7).
  - Hero / split sections: `grid items-center gap-10 lg:grid-cols-2`. Text first on mobile, media second.
  - Gaps: `gap-5` inside grids, `gap-3` within card internals, `space-y-4` for text stacks, `mt-10 md:mt-12` between a section header and its content.
- Stack vertically below `md`. No page-level horizontal scroll ever. Carousels are not used (they hide content and add JS), with **one approved exception: the Reviews carousel** (§6.20: manual, no autoplay by default, every card in the HTML, static row when < 4 reviews). A tab bar that doesn't fit may also scroll sideways **inside its own track** (`no-scrollbar` utility, §6.18).

---

## 5. Shape & depth

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 8px | Buttons (measured ≈8px in Hero.png), inputs, small chips, icon tiles |
| `rounded-md` | 12px | Dropdowns, menus |
| `rounded-lg` | 16px | Cards (service, testimonial, stats) |
| `rounded-xl` | 24px | Section panels (hero trust bar, stats panel on mobile), images in cards |
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
- **Mobile (< lg):** hamburger `size-11` (`aria-expanded`, `aria-controls`, label toggles Open/Close menu) whose three bars **morph into an X** (outer bars `translate-y-1.75 ±rotate-45`, middle `scale-x-0 opacity-0`, 300ms `ease-out-soft`).
  - **Frosted-glass panel**, rendered in a **portal on `<body>`** (the header's `backdrop-blur` is a backdrop root and the containing block for fixed children, see the gotcha below): `fixed inset-x-3 md:inset-x-8 top-20 z-40 rounded-xl border border-background/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150 shadow-raised`, `max-h-[calc(100dvh-6rem)] overflow-y-auto`.
  - **Scrim** below the header: `fixed inset-x-0 top-16 bottom-0 z-30 bg-ink/25 backdrop-blur-xs`; tap closes.
  - **Motion (CSS, transform/opacity):** panel `origin-top` from `-translate-y-3 scale-97 opacity-0` to rest, scrim fades, 300ms `ease-out-soft`. Links (`<nav aria-label="Mobile">`, `divide-foreground/10`, `flex justify-between py-4 text-h4` + `ArrowRight size-4 text-subtle` that nudges on hover) and the CTA group stagger in from `-translate-y-1 opacity-0` with `delay-75 … delay-400` while opening; closing has no delays. CSS rather than GSAP so it responds instantly even before lazy GSAP loads (§8). Reduced motion: instant (global rule).
  - The closed panel stays mounted for the exit animation but is `inert` (no focus, hidden from screen readers).
  - Then full-width primary CTA (lg) + WhatsApp button (lg). Closes on Escape (focus returns to the button), outside pointer-down (panel and button excluded), scrim tap, link click and resize to ≥ lg; locks body scroll while open. Opening focuses the first link; Tab / Shift+Tab cycle through the toggle and menu items while open (the portal sits at the end of the DOM).
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
- Media: photo slot `aspect-square max-w-xs lg:max-w-sm` (centred, `xl:mx-0`; square to match the cutout: a 4:5 slot left an empty band above the head, a big gap on mobile and a low-sitting photo on desktop) holding the founder cutout: a **static import** (`lib/founder/founderPic.webp`, 1024² transparent WebP) via `hero.photo.src`, rendered `next/image fill priority sizes="(min-width: 1024px) 384px, 320px" object-contain object-bottom mask-b-from-80%` (no crop; the cut-off shoulders fade out). `src: null` → dashed placeholder panel. Decorations (`HeroBlobs` `fill-primary/10`, `Squiggle`, `Sparkle`) are inline SVG, `aria-hidden`, `lg` only.
- Stat card (`StatCard`): `rounded-lg bg-background/85 shadow-card`. Below **xl**: a 3-column grid under the photo, stacked compact (`p-3 sm:p-4`, icon `size-10`, number `text-h4`, label `text-caption`). At **xl** (1280+): `absolute right-0 top-1/2 -translate-y-1/2 w-60 flex-col gap-8`, overlapping the photo's right edge; card `flex-row gap-4 px-5 py-8`, icon circle `size-14 bg-surface-strong text-primary`, number `text-title`, label `text-small text-muted whitespace-nowrap`. (Not at lg: the 464px column made the cards cover the founder's face.)
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

### 6.8 Review card (testimonial)
Implemented: `components/ui/ReviewCard.tsx` (server-safe). Data: `lib/content/reviews.ts` (`Review { id, name, role, quote, rating: number | null, avatar?, source? }`). **Placeholders only; never invent reviews, names, photos or ratings; no review structured data until reviews are real.**
Anatomy (reviews.png): avatar + name/role → quote → stars (+ "Google review").
- `<figure class="flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-card">` (equal heights via `h-full`).
- Top row `flex items-center gap-3`: avatar `size-12 rounded-pill object-cover` (`next/image` 48×48), or initials `grid size-12 place-items-center rounded-pill bg-surface-strong text-small font-bold text-primary` (`aria-hidden`). `<figcaption class="min-w-0">`: name `block text-body font-bold text-primary`, role "Owner, [Business]" `block text-caption font-medium normal-case tracking-normal text-muted`.
- Quote `<blockquote class="mt-4 line-clamp-4 text-small text-muted">` (full text stays in the DOM).
- Footer (only if rated or `source: "google"`) `mt-auto flex items-center justify-between gap-3 pt-4`: `StarRating` (§6.19) + "Google review" `text-caption font-medium normal-case tracking-normal text-muted`.
- In the carousel the active slide adds `lg:group-data-active/slide:shadow-raised` (300ms, `motion-safe`).

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
- **Only real, verifiable numbers.** Until then values are `[X]` placeholders. Values render through `<CountUp>` (§8), which counts real numbers up once and leaves placeholders static.
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

### 6.15 Footer + Audit banner
Implemented: `components/sections/Footer.tsx` (server, rendered once in `app/layout.tsx`) + `components/sections/footer/{AuditBanner,AuditForm,FooterColumn,SocialLinks}.tsx`. Copy: `lib/content/footer.ts`; business details from `lib/site.ts` (name, phone, WhatsApp, email, hours, city/region, socials, MSME), Quick Links from `navLinks`, Services from `lib/content/services.ts`. Light footer (replaces the earlier `bg-ink` idea; footer.png) on a **full-bleed lavender band**: the background runs edge to edge, the content stays on the shared container.
Anatomy: audit banner → 5-column grid → bottom bar.
- Footer: `<footer class="bg-surface pt-12 pb-8">` (full-bleed band, so no top border needed) → `<Container>` (content edges = every section's). Text on `surface`: muted 6.25:1, primary 6.11:1.
- **Audit banner** (`AuditBanner`): `flex flex-col gap-6 rounded-lg bg-linear-to-r from-surface-strong to-background p-6 md:p-8` (fades to white so it stays visible on the lavender band); **xl:** one row `xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:py-4 xl:pr-12 xl:pl-8` (≈112px tall). Below xl the form drops under the copy at full width (the one-row layout is cramped at 1024).
  - Left: `flex items-center gap-4 md:gap-6 xl:gap-8`; icon circle `size-14 md:size-20 rounded-pill bg-primary text-primary-foreground` with lucide `Search` (`size-6 md:size-9`, stroke 2; "audit" = inspecting a site); title `<h2 class="text-h3">`; subtitle `mt-1.5 max-w-xl text-small text-muted` (muted on surface-strong ≈ 5.7:1).
  - **AuditForm** (client; `useActionState(submitAudit)`; `noValidate`): `flex flex-col gap-3 md:flex-row md:gap-0`. Input `h-12 w-full rounded-sm border border-border-strong bg-background px-5 text-body md:flex-1 md:rounded-r-none xl:w-72 xl:flex-none` (+ sr-only label "Email address", `type="email" autocomplete="email"`). Button `buttonClasses({ size: "md" })` + `min-w-44 font-bold tracking-wide uppercase md:rounded-l-none` ("Get my audit"). Below md both are full width and fully rounded.
  - States: pending → `Loader2` spinner + "Sending…", disabled, `aria-busy`; error → `mt-2 text-small text-error` message linked by `aria-describedby`, input `aria-invalid border-error`; success → form replaced by `text-small font-semibold text-primary` thanks line. The wrapper is `aria-live="polite"`. Hidden honeypot input `website` (`sr-only`, `aria-hidden`, `tabIndex -1`).
  - Server action `app/actions/audit.ts`: zod (`lib/validation/audit.ts`: trim, lowercase, ≤ 254, email), honeypot → generic error, in-memory rate limit 5 / IP / 10 min, returns `{ status, ok, error? }`, never exposes internals. **Storage: none yet** (no `leads` table; logs a masked email). TODO: Lead model (needs approval).
- **Grid** `mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-10 lg:grid-cols-4 lg:gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]` (ratios measured from footer.png; the last column is wider here because it holds contact details):
  | Width | Layout |
  |---|---|
  | < md | brand (span 2) · Quick Links + Services · Resources · Contact (span 2) |
  | md | brand (span 2), then 2×2 |
  | lg | brand (span 4), then the 4 columns in one row |
  | xl+ | 5 columns |
  - Brand: `Logo size="sm"` (mark 40 + `text-h3` wordmark) · tagline `mt-1 text-caption font-medium normal-case tracking-normal text-muted` · description `mt-4 max-w-70 text-small text-muted` · `SocialLinks mt-4`.
  - **SocialLinks**: only networks with a real `https://` URL in `site.socials` render (none → nothing). `<a target="_blank" rel="noopener noreferrer" aria-label="Web Merged on Instagram">` `group grid size-11 place-items-center rounded-pill` (44px hit area) holding a `size-8 rounded-pill bg-primary text-primary-foreground group-hover:bg-primary-hover motion-safe:group-hover:-translate-y-0.5` circle with a Simple Icons glyph `size-4`. LinkedIn (not in Simple Icons) shows a text "in".
  - Contact column ("Get in Touch"): heading per §6.21; rows `md:space-y-2`, lucide icon `size-4 text-primary` + `text-small text-muted`, `gap-2.5`. WhatsApp (`wa.me`), phone (`tel:`), email (`mailto:`) are links **only once filled in**; placeholders render as plain text. Location "Noida, Uttar Pradesh, India" (no street address: service-area business), hours. Then `mt-5 text-caption … text-muted` "MSME Reg. No: …" (number `whitespace-nowrap`). Optional `payments` text chips `rounded-pill border border-border px-3 py-1 text-caption` (never payment-brand logos).
- **Bottom bar** `mt-12 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-caption font-medium normal-case tracking-normal text-muted md:flex-row md:justify-between md:text-left`: "© {year} Web Merged. All rights reserved." (year from a `"use cache"` + `cacheLife("days")` component: Cache Components forbid a bare `new Date()`, so the page revalidates daily) · "Made with ♥ in Noida, India" (`Heart size-3.5 fill-current text-primary` `aria-hidden` + sr-only "love") · Privacy / Terms (`min-h-11 md:min-h-0`).
- **JSON-LD** (once, in the footer): `lib/json-ld.ts` `localBusinessJsonLd()` → `ProfessionalService` with name, `areaServed` Noida, locality/region/country (no street), and url/email/telephone/sameAs **only when filled in** (placeholders are left out). TODO: `logo` once the real logo exists.

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
- Panel `role="tabpanel" aria-labelledby tabIndex={0}`, inactive ones `hidden`. Switching: `useSwapStagger` (§8): old cards fade out 0.15s, then the new panel's cards stagger in (0.04s, y 12). The first panel staggers on scroll; the tab bar fades up (`Reveal`).
- Keyboard (automatic activation, roving tabindex): ←/→ move and wrap, Home/End jump; focus moves to and selects the tab, which `scrollIntoView({ inline: "nearest" })` inside the track; Tab goes on into the panel.
- Section: `id="tech"`, full-bleed `bg-surface py-section md:py-section-lg` between Projects (white) and Stats. Centred header per §6.5 (`max-w-2xl`, eyebrow, `text-h2`, `Underline mx-auto mt-2 block w-28`, intro `mt-4 text-body text-muted`). Tabs `mt-10`, panel `mt-10`, category line `mt-8 text-center text-small text-muted`.

### 6.19 Star rating
Implemented: `components/ui/StarRating.tsx` (`rating`, `max = 5`). `flex items-center gap-1`; lucide `Star size-4 strokeWidth 2`, filled `fill-accent text-accent`, empty `fill-subtle text-subtle`; all stars `aria-hidden` + `<span class="sr-only">Rated N out of 5</span>`. Render nothing (not 0 stars) when the rating is unknown (`null`).

### 6.20 Reviews carousel + Reviews section ("What Clients Say")
Implemented: `components/ui/ReviewsCarousel.tsx` (client, carousel logic only) + `components/sections/ReviewsSection.tsx` (server). Library: **`embla-carousel-react` 8.6.0** (pinned, ~7KB gz; approved exception to "no carousels", §4).
- Section: `id="reviews"`, white, right after Stats, `py-section md:py-section-lg`, inside `<Container>` so the viewport's edges equal the Stats panel's edges. Header per §6.5, centred: eyebrow "Testimonials", `text-h2` with the middle word `text-primary` ("What **Clients** Say"), `Underline mx-auto mt-2 block w-28`, subtitle `mx-auto mt-4 max-w-lg text-body-lg text-muted`. Carousel `mt-6`.
- **≥ 4 reviews → carousel; 1–3 → static** `<ul class="flex flex-col items-center gap-6 py-6 md:flex-row md:items-stretch md:justify-center lg:gap-8">`, items `w-full max-w-sm md:flex-1` (no client JS).
- Region `role="region" aria-roledescription="carousel" aria-label="Client reviews"`; ←/→ keys move while focus is inside. Slides `role="group" aria-roledescription="slide" aria-label="N of M"`. An sr-only `aria-live="polite" aria-atomic` line announces "Review N of M" (`off` while autoplay runs).
- Embla options: `loop: true`, `align: "start"`, `containScroll: false`, `breakpoints: { "(min-width: 1024px)": { align: "center" } }`.
- Viewport (the Embla root) = the container content box, `overflow-hidden` (nothing past the edges). Track `flex touch-pan-y pt-6 pb-12` (room for the raised shadow). Fade: `mask-r-from-92% md:mask-r-from-95% lg:mask-x-from-95%` (only the peeks fade; arrows sit outside the masked element).
- Slides: `relative min-w-0 shrink-0 basis-7/8 md:basis-4/9 lg:basis-1/4` + spacing as **right margin** `mr-4 md:mr-6 lg:mr-8 xl:mr-12` (Embla reads the last slide's margin for the loop gap; CSS `gap` would lose it).
  | Width | Visible | Peek | Arrows |
  |---|---|---|---|
  | lg+ | 3 cards, centre card active | 56px each side (304px cards, 48px gaps at 1216) | 44px over the peeks, 8px inside the edges |
  | md–lg | 2 cards (start aligned) | ~30px right | beside the dots |
  | < md | 1 card (87.5%) | ~26px right | hidden (swipe) |
- Centre emphasis (lg+): active slide `lg:z-10 lg:scale-106` + card `shadow-raised`, `motion-safe:transition-transform duration-300 ease-out`. Side cards stay 100% opacity (as in reviews.png).
- Arrows: `<button aria-label="Previous review"/"Next review">` `grid size-11 place-items-center rounded-pill bg-background text-foreground shadow-card hover:bg-surface-strong hover:text-primary` + `ChevronLeft/Right size-5`.
- Dots (all widths): `<button aria-label="Go to review N" aria-current>` `grid h-11 w-6 place-items-center` (24×44 target) holding `h-2 rounded-pill`, active `w-6 bg-primary`, others `w-2 bg-border-strong`.
- Autoplay: **off**. `autoplayMs` prop if ever needed (plain timers, no plugin): paused on hover/focus, never under `prefers-reduced-motion`. Reduced motion also makes buttons/dots jump (`scrollTo(i, true)`) and disables the emphasis transition.
- No JS: before Embla initialises the viewport is `no-scrollbar snap-x snap-mandatory overflow-x-auto` (slides `snap-start`), so the row still scrolls. On init it switches to `overflow-hidden`, and the viewport's native `scrollLeft` is pinned to 0 (otherwise the browser's re-snap offsets Embla's transforms).

### 6.21 Footer column
Implemented: `components/sections/footer/FooterColumn.tsx` (`{ title, links: NavLink[] }`). Exports `footerHeadingClasses` / `footerLinkClasses` (the contact column reuses them).
- `<nav aria-label="{title}">` → `<h2 class="mb-4 text-body font-bold text-foreground">` (an h2 styled small so it doesn't compete with page headings) → `<ul class="md:space-y-1">` (≈ 25px row pitch on md+, as in footer.png).
- Link (`next/link`): `flex w-fit min-h-11 items-center rounded-sm text-small text-muted underline-offset-4 transition-colors duration-150 hover:text-primary hover:underline md:min-h-0`. **Block-level `flex`, not `inline-flex`**: an inline link adds a line box per row and spreads the rows. 44px rows on mobile for touch.

---

## 7. Iconography & imagery

- **Technology logos:** `simple-icons` (CC0, pinned), imported by name only in `lib/tech-icons.ts` (server-only, so 0 KB client JS). Rendered as inline SVG in the brand's own hex: the **only** non-token colours allowed. Near-invisible brand colours (< 1.5:1 on white, e.g. JavaScript yellow) render in `text-foreground`. Logos are `aria-hidden`; the visible name is the label. Missing logos (AWS, Ahrefs): initials badge.
- **Icons:** `lucide-react` (installed; import individual icons, tree-shaken). It has **no brand logos**. Stroke `1.75` (2 for ≤16px). Sizes: 16 (`size-4`) inline/stars, 20 (`size-5`) buttons/lists, 24 (`size-6`) card icon tiles. Colour inherits (`currentColor`). Decorative icons: `aria-hidden`. Icon-only buttons need `aria-label`. Brand icons (WhatsApp, Instagram, Facebook, LinkedIn) as small inline SVG components in `components/ui/icons/`.
- **Imagery:** real photos of the founder, real client screenshots (device mockups as in project.png), Indian small-business context. No generic stock "handshake/laptop" photos or AI faces pretending to be clients.
- **Aspect ratios:** hero founder cutout 1/1, project card image area 7/4 (case study page cover 4/3), blog cover 16/9 (also the OG image ratio ~1.91/1 generated separately), avatars 1/1.
- **`next/image` always.** Hero image `priority` + `sizes`. Everything else lazy (default). Provide `width/height` or `fill` + sized parent to avoid CLS. AVIF/WebP via Next defaults. Source images ≤ 2400px wide.
- Alt text: describe content and purpose ("Mobile screens of the Sharma Dental booking site"); decorative images `alt=""`.

---

## 8. Motion (GSAP)

One motion system for the whole site: **GSAP** (`gsap` 3.15, ScrollTrigger + SplitText + DrawSVG, free "Standard" licence), used **only** through the primitives in `components/motion/` and the tokens in `lib/motion/tokens.ts`. GSAP is the only animation library; ask before adding others. Hover/colour feedback stays CSS (table at the end).

### Tokens (`lib/motion/tokens.ts`, the single source)
| Token | Value |
|---|---|
| duration | fast `0.4` · base `0.8` · slow `1.2` (s) |
| ease | out `power3.out` (default) · inOut `power2.inOut` (draws) |
| distance | sm `16` · md `32` · lg `56` (px, desktop) |
| stagger | `0.08` (s) |
| start | `clamp(top 85%)` (ScrollTrigger start; clamp keeps footer triggers reachable) |
| mobile (< 768px) | distance × `0.5`, duration × `0.75` |
| reduced motion | content shown instantly (≤ `0.2`s fade allowed, none used) |
| introWindowMs | `400`: navbar/hero intro plays only if JS is ready within it |
| failsafeMs | `3000`: never-started motion un-hides everything |

### Primitives (`components/motion/`, client leaves; sections stay Server Components)
Each renders its own element (`as`, default `div`), so wrapping never adds a box. Children pass through server-rendered.
| Primitive | Props (defaults) | Use |
|---|---|---|
| `<Reveal>` | `as`, `y=32`, `x=0`, `scale`, `delay=0`, `duration=0.8`, `trigger="scroll" \| "load"`, `once=true` | Section headers, panels, CTAs, blocks (`trigger="load"`: navbar) |
| `<Stagger>` | `as`, `selector=":scope > *"`, `y=24`, `x`, `scale` (e.g. `0.97`), `stagger=0.08`, `duration`, `sequence?: number[]` (custom order) | Card grids, lists, footer columns |
| `<SplitHeading>` | `as="h2"`, `type="lines" \| "words"`, `stagger=0.1`, `trigger`, `draw` (also draw SVG strokes inside) | Big headings below the fold (Stats h2). **Never the LCP heading, never client components inside** (it reverts to the original HTML when done) |
| `<CountUp value>` | `value: string`, `duration=1.2` | Numbers ("350+", "98%", "₹2,50,000"). Placeholders (`[X]+`) render as-is. Final value always in an sr-only span |
| `<Parallax>` | `as`, `speed=0.15` (±60px) | **Decorations only** (rings, blobs). md+ only. Put the positioning classes on `<Parallax>` itself |
| `<DrawLine>` | `as="span"`, `delay=0.2`, `duration`, `trigger` | Wrap an SVG underline/doodle. Non-scaling-stroke SVGs (Underline) get a clip wipe, others real DrawSVG (`lib/motion/draw.ts`) |
| `<IntroSequence>` | `as` + children marked `data-intro="eyebrow \| heading \| text \| cta \| proof \| media \| cards \| deco"` (+ `data-intro-draw`) | The hero's on-load timeline (≤ 1.2s). Media starts at opacity 0.9, never 0 |
| `<HoverLift>` | `as`, `y=-8` + a `[data-hover-lift]` descendant | Card mockup lift on hover (fine pointers only) |
| `useSwapStagger()` | → `{ leave(panel, done), enter(panel) }` | Tab/content swaps (TechTabs) |
| `<MotionProvider>` | none, mounted once in `app/layout.tsx` | Readiness flag, debounced ScrollTrigger refresh (fonts, page height, route change), focus safety, fail-safe sweep |

Examples:
```tsx
<Reveal as="header" className="mx-auto max-w-2xl text-center">…eyebrow, h2…
  <DrawLine className="mx-auto mt-2 block w-28"><Underline className="block w-full" /></DrawLine>
</Reveal>
<Stagger as="ul" y={32} stagger={0.1} className="grid …">{cards}</Stagger>
<Stagger sequence={featuredLast} scale={0.97} className="…">{pricingCards}</Stagger>
<p className="text-h1 font-bold text-primary"><CountUp value={stat.value} /></p>
<Parallax className="absolute … md:block"><RingPattern className="size-full" /></Parallax>
```

### Choreography patterns
- **Section header:** `<Reveal as="header">` + `<DrawLine>` around the Underline. (Large below-the-fold headline: `<SplitHeading draw>`.)
- **Card grid / list:** `<Stagger as="ul">` (y 24–32, stagger 0.05–0.1). Special order → `sequence` (Stats staircase `[0,1,3,2]`, featured pricing last). Optional `scale={0.97}`.
- **Block that has its own motion** (Embla carousel): one `<Reveal>` around the whole block; never animate its slides on scroll.
- **Stats:** panel `Reveal` → `SplitHeading draw` → cards `Stagger sequence` → `CountUp` values → ring `Parallax`.
- **Hero:** `IntroSequence` on load: eyebrow → paragraph → CTAs → proof → photo (0.9→1) → stat cards from the right → squiggle draw + sparkle. **The H1 (the LCP element) is static**: animating it cost +985ms mobile LCP in Lighthouse.
- **Navbar:** `<Reveal as="header" trigger="load" y={-12} duration={0.5}>`. **Footer:** banner `Reveal`, columns `Stagger` (y 16, 0.06), bottom bar static.

### How it stays safe (built into the primitives; don't bypass)
- **No JS / crawlers:** an inline `<head>` script (`lib/motion/boot.ts`) adds `js-motion` to `<html>`; only then does CSS (`globals.css`) pre-hide `[data-motion]` until the primitive marks it `[data-motion-ready]`. No JS → nothing is hidden.
- **Reduced motion:** the pre-hide CSS sits inside `prefers-reduced-motion: no-preference`, and every primitive's `gsap.matchMedia` branch shows content instantly. No parallax, no counting.
- **LCP:** GSAP is **lazy-loaded** (`lib/motion/load.ts`) after the window `load` event + idle time, and each primitive sets up in its own idle callback (one long task otherwise: TBT 54 → 204ms). `trigger="load"` content is pre-hidden only during the 400ms intro window; if JS isn't ready by then it simply shows.
- **Transform/opacity only** (`opacity`, not `autoAlpha`: `visibility:hidden` would drop links from the Tab order). Exception: strokes/clip on small decorative SVGs. `clearProps` after every entrance, so no inline transforms stay behind (sticky/fixed still work).
- **No layout shift:** SplitText line masks keep the heading height (checked: 240px/143px before and after). CLS 0.000 in every Lighthouse run.
- **Once:** every entrance plays once per page load (`once: true`); returning to a page doesn't replay it. Only scrubbed decorations repeat.
- **Keyboard:** focus inside a hidden or animating element finishes its animation instantly (or shows it if it hasn't been set up yet).
- **Mobile:** shorter distances, faster durations. No pinning or horizontal scroll-jacking anywhere.
- **Clean-up:** each primitive runs in a `gsap.context` scoped to its element, reverted on unmount (no stale ScrollTriggers across routes; verified).

### Do / Don't
| Do | Don't |
|---|---|
| Wrap the animating part of a Server Component in a primitive | Add `"use client"` to a section to animate it |
| Use tokens and the default props | Hard-code durations/eases/distances in components |
| Add a new primitive (+ document it here) for a new pattern | Write raw `gsap.*` calls in sections or ui components |
| Keep motion subtle: one entrance per element | Animate the LCP element, pin sections, parallax text, animate width/height/top/left/box-shadow on scroll |

### CSS motion (hover and state feedback, unchanged)
| What | Duration | Easing |
|---|---|---|
| Colour/background/border hover | 150ms (`duration-150`) | default `ease-out` |
| Card shadow lift | 200ms (`duration-200 transition-shadow`) | `ease-out-soft` |
| Accordion chevron | 200ms | `ease-out-soft` |
| Mobile menu: panel drop-in, scrim fade, hamburger→X, link stagger (`delay-75…400`) | 300ms | `ease-out-soft` |
| Arrow-link nudge | 150ms (gap change) | default |

- `prefers-reduced-motion: reduce` disables all CSS transitions/animations and smooth scroll globally (in `globals.css`). Spinners still indicate loading via the "Sending…" text.
- No auto-playing carousels.

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
12. **Footer** (global, `app/layout.tsx`): audit banner (last-chance conversion) + link columns + contact (local SEO) + LocalBusiness JSON-LD.

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
| One dark `ink` element for emphasis (featured pricing card) | Whole pages in dark mode, or several competing dark blocks |
| Testimonial cards with avatar, name and stars (reviews.png) | Anonymous or invented testimonials, AI-generated faces |
| Case study cards with industry label + result + arrow link (project.png) | Portfolio items without outcomes |
| Pre-footer CTA band (footer.png), used for the audit | Newsletter signup as the main footer CTA; payment logos |
| Amber only for stars/small highlights | Amber text on white (2.0:1) |
| Dark text on WhatsApp green | White text on #25D366 (1.98:1) |
| Subtle GSAP motion through the shared primitives (§8), once per element, transform/opacity only | Raw gsap calls in sections, pinning/scroll-jacking, parallax on text, animating the LCP element, heavy images as decorations, carousels (only exception: the manual Reviews carousel, §6.20) |

---

## 13. Reference map

| File | What was taken | What was rejected |
|---|---|---|
| `docs/design/Hero.png` | Violet primary + lavender bg, geometric sans (→ Plus Jakarta Sans), two-tone bold headline, eyebrow pill badge, primary CTA + ghost secondary, avatar-stack + stars social proof, floating stat cards with icon chips, white sticky navbar with CTA on the right, "trusted by" logo strip | Decorative scribble/sparkle graphics, purple blob behind the photo (heavy, distracting) |
| `docs/design/reviews.png` | Testimonial card anatomy (avatar, name, amber stars, quote), carousel with 3 cards + side peeks and an emphasised centre card, arrows over the peeks, two-tone centred headline | Wavy section edges, handwritten "It's possible!" doodles |
| `docs/design/project.png` | Project card anatomy (tinted image top with device mockups, category label, title, description, "View Case Study →"), the four pastel tints (→ `tint-*`), 4-column grid, header with intro on the 3rd column, centred pill "See All Projects" button below | Cream background, hot-pink CTA (#E8336D), serif "Selected Work" heading, script-like underline |
| `docs/design/stats-pricing.png` (was OfferandPrice.png) | Stats block (headline + white stat cards with violet numbers on lavender), 3-tier pricing with dark navy featured card (→ `ink` palette) + "Most popular" badge, check-list features, full-width CTAs, pill CTA with icon | Fake-scale stats copy ("10,000+ … companies"), $/month SaaS pricing model (→ ₹ "starting at" project pricing) |
| `docs/design/footer.png` | Light footer: lavender gradient banner with icon circle + joined email input/button, 5-column grid (brand + blurb + socials, 3 link columns, last column), copyright bar | Newsletter/discount framing (→ free audit), payment-method logos (→ optional text chips), serif heading, last column "We accept" (→ "Get in Touch") |
| `docs/design/notes.md` | *Not present*. Owner supplied: name **Web Merged**, city **Noida**, focus **web apps + SEO + mobile apps**. Contact/NAP details live in `lib/site.ts` (placeholders until supplied) | n/a |

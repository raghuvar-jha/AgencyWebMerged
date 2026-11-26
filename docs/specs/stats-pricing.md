# Spec: Stats Section + Pricing Section

Reference: `docs/design/stats-pricing.png` (a cropped, low-resolution screenshot, about 800×800px).
The px values below are for a **1440px desktop width**: the reference was scaled by about ×1.6 and rounded to clean values. They are estimates. Step 1 checks them.

## 0. Read first
1. `CLAUDE.md`
2. `docs/design/DESIGN.md`
3. `docs/design/stats-pricing.png`
4. The existing `components/Hero.tsx` and `lib/content/home.ts`. Reuse the same tokens, button styles and content patterns. Don't duplicate them.

Map every value to the nearest DESIGN.md token (within about 4px). This section should use the **same primary purple, lavender surface and font** as the Hero. If the reference's purple looks slightly different, use the existing token anyway.

## 1. Check the measurements before coding
Use Python + Pillow to sample the colours (stats panel background, stat number purple, CTA purple, the Pro card's dark background, card borders, feature text grey) and measure the proportions. Print a table: **spec value | measured value | value you'll use**. The image is low-res, so prefer DESIGN.md tokens when a measured value is ambiguous.

## 2. Files
- `components/sections/StatsSection.tsx`: Server Component
- `components/ui/MetricCard.tsx`: one stat card (named differently from the hero's `StatCard`, which has an icon)
- `components/sections/PricingSection.tsx`: Server Component
- `components/ui/PricingCard.tsx`: one plan card, with `variant: "default" | "featured"`
- `components/decorations/Underline.tsx`: the hand-drawn underline stroke (SVG, `aria-hidden`)
- `components/decorations/RingPattern.tsx`: the faint concentric circles (SVG, `aria-hidden`)
- Add `stats` and `pricing` to `lib/content/home.ts` (typed, see section 6). No copy in components.
- Render both sections in `app/page.tsx` after the Hero (Stats first, then Pricing).

## 3. StatsSection

### Container
- Section padding-y 64px. Inner container max-width 1224px (the same as the Hero).
- **Panel:** a rounded box with radius 32px, background lavender `surface-soft` (about `#F3F0FD`), padding 80px 72px, `overflow: hidden`, `position: relative`, minimum height about 560px.
- **RingPattern:** 3–4 concentric circle outlines (1.5px stroke, white at about 50%) centred around the middle of the panel, about 700px in diameter, behind the content.

### Desktop (≥ lg): 2 columns, left 45% / right 55%, items centred
**Left column:**
1. **H2:** size 50px, line-height 1.3, weight 700, letter-spacing −0.02em, `text-strong`, max-width 520px.
   Copy: "[X]+ Happy Businesses / Trust Us", breaking over 3 lines like the reference ("[X]+ Happy / Businesses / Trust Us").
   After the last word, inline: `<Underline />`. It's about 170×12px with a 3px stroke in `primary`, gently curved, and 16px from the text, vertically centred on the last line.
2. **Gap 32px.**
3. **Paragraph:** 17px, line-height 1.7, `text-body`, max-width 440px.
   Copy: "From local shops to growing brands, we help businesses get found online, win more customers and grow faster."
4. **Gap 40px.**
5. **CTA pill:** height 54px, padding-left 28px, padding-right 8px, fully rounded, `bg-primary`, white text at 17px weight 600. Then a 12px gap and a 30px circle (1.5px white border) holding a right-arrow icon (16px).
   Label: "See How It Works", linking to `#process`. Reuse the Button component with a `pill` + `trailingIcon` variant if DESIGN.md has one; otherwise add that variant.

**Right column:** 4 MetricCards in a **staggered layout** (it looks like rising steps):
- Use a CSS grid with 3 columns of 176px, gap 20px, and `position: relative`. Place each card with grid rows plus `translateY` offsets (or absolute positioning inside a fixed 600×480px box) to match the reference:
  | Card | Column | Vertical position (top of column area) |
  |---|---|---|
  | Card 1 (e.g. retention %) | 1 | about 250px down |
  | Card 2 (e.g. projects) | 2 | about 105px down |
  | Card 3 (e.g. clients) | 3 | 0 (highest) |
  | Card 4 (e.g. on-time %) | 3 | below card 3, 20px gap |
- The result reads like steps going up from left to right, with column 3 holding two cards.

### MetricCard
- 176×180px, background white, radius 16px, shadow about `0 10px 30px rgba(60,40,120,0.07)`. Content centred both ways, padding 20px.
- Number: 38px, weight 700, `primary`, line-height 1.1.
- Gap 10px.
- Label: 16px, weight 500, line-height 1.45, `text-body`, centred, at most 2 lines.
- Props: `{ value: string; label: string }`. The value is a string so it can hold "92%", "350+" or "[X]+".
- Optional count-up animation: only if DESIGN.md allows motion, it must respect `prefers-reduced-motion`, and it goes in a tiny client wrapper. Default is **no animation**.

### Tablet and mobile
- Below lg: a single column. Text first, then the cards in a **2×2 grid** (no stagger), gap 16px, each card full width of its cell at about 150px tall.
- Below md: panel padding 40px 24px, radius 24px. H2 34px. Underline 110px wide. The CTA is full width or left-aligned (follow DESIGN.md).

## 4. PricingSection

### Header
- Section padding-y 96px. Container max-width 1224px.
- H2 centred: "Simple, Transparent Pricing" at 40px, weight 700, letter-spacing −0.02em, `text-strong`.
- Optional subtitle under it (16px gap, 18px, `text-body`, centred, max-width 560px): "Fixed quotes, no hidden costs. Prices below are starting points." Include it; it reassures Indian SMB buyers.
- Gap to cards: 56px.

### Cards row (desktop ≥ lg)
- 3 cards in a row, centred, gap 32px, `align-items: center`, so the featured card is slightly taller and stands out.
- Default card: width 340px, padding 36px 32px, background white, 1px border `border-subtle` (about `#ECEAF2`), radius 18px, soft shadow `0 10px 30px rgba(20,17,31,0.05)`.
- **Featured card (the middle one):** width 360px, about 12px taller, background `surface-dark` (about `#12122A`, a deep navy), no border, stronger shadow. All text is light: name `#FFFFFF` at 85%, price `#FFFFFF`, features `#FFFFFF` at 85%, checks white.

### PricingCard content (top to bottom)
1. **Top row:** plan name on the left (19px, weight 500, `text-muted`; white at 85% on featured). On the right, featured only: a "Most Popular" badge (height 30px, padding-x 14px, fully rounded, 1px `primary` border at about 70%, 13px weight 500, text white at 85%, background transparent).
2. **Gap 24px.**
3. **Price row:** price 46px, weight 700, `text-strong` (white on featured), letter-spacing −0.02em, then a 6px gap and the period (16px, `text-muted`; white at 60% on featured), aligned on the text baseline. Above the price, optional small text "Starting at" (14px, `text-muted`) when `startingAt: true`.
4. **Gap 24px.**
5. **CTA button:** full width, height 46px, radius 10px, `bg-primary`, white text at 16px weight 600, hover `primary-hover`. Label from the content (e.g. "Get Started" or "Get a Quote"), linking to `#contact?plan=<id>` or `/contact?plan=<id>`.
6. **Gap 32px.**
7. **Features list** (`<ul>`, gap 16px between items): each `<li>` is a 16px check icon (lucide `Check`, stroke 2.5, `text-strong`; white on featured), a 12px gap, then text at 15px, line-height 1.5, `text-body` (white at 85% on featured). Featured cards may have more items than the others; the cards don't need to match in height apart from the `align-items: center` rule.

Props:
```ts
type PricingPlan = {
  id: string;
  name: string;
  price: string;        // "[₹XX,XXX]" placeholder or a formatted ₹ string
  period?: string;      // "/project", "/month"
  startingAt?: boolean;
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;       // "Most Popular"
};
```

### Tablet and mobile
- md–lg: the 3 cards in a horizontally scrollable row (`snap-x`, cards 320px wide), or 2 + 1 stacked. Pick the one that looks cleaner and say which.
- Below md: the cards stack in one column at full width, max-width 420px, centred, gap 20px. The featured card goes **first** on mobile (use `order-first`) so the recommended plan is seen first. Don't make it taller on mobile.

## 5. Accessibility
- Each section uses `<section aria-labelledby>` with an `<h2>`. There's no h1 in these sections.
- Stats: each MetricCard is a `<div>` with the value and label in readable order. Don't hide the numbers from screen readers.
- Pricing: each card is an `<article>` with the plan name as an `<h3>`. The price uses `<p>`. The badge text is real text, not just colour. The checks are `aria-hidden`.
- Contrast: purple numbers on white must reach at least 3:1 (they're large text); grey feature text must reach 4.5:1 on white; white at 85% text on the dark navy must pass. Adjust any colour that fails.
- Focus rings on all buttons and links. Touch targets at least 44px.

## 6. Content (`lib/content/home.ts`): placeholders only
Never invent real-looking numbers. Use `[X]` placeholders until I provide real ones.

```ts
export const stats = {
  title: { line1: "[X]+ Happy", line2: "Businesses", line3: "Trust Us" },
  description: "From local shops to growing brands, we help businesses get found online, win more customers and grow faster.",
  cta: { label: "See How It Works", href: "#process" },
  items: [
    { value: "[X]%", label: "Client Retention" },
    { value: "[X]+", label: "Projects Delivered" },
    { value: "[X]+", label: "Happy Clients" },
    { value: "[X]%", label: "On-Time Delivery" },
  ],
};

export const pricing = {
  title: "Simple, Transparent Pricing",
  subtitle: "Fixed quotes, no hidden costs. Prices below are starting points.",
  plans: [
    {
      id: "starter",
      name: "Starter Website",
      price: "[₹XX,XXX]",
      period: "/project",
      startingAt: true,
      features: ["Up to [X] pages", "Mobile-first, fast loading", "WhatsApp + contact form", "Basic on-page SEO", "[X] revisions"],
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
      features: ["Up to [X] pages + blog", "Google Business Profile setup", "Analytics & call tracking", "Speed & SEO optimisation", "[X] month free maintenance", "Priority support"],
      cta: { label: "Get Started", href: "/contact?plan=growth" },
    },
    {
      id: "retainer",
      name: "SEO + Ads Retainer",
      price: "[₹XX,XXX]",
      period: "/month",
      startingAt: true,
      features: ["Keyword & competitor research", "[X] SEO articles / month", "Backlink building", "Google Ads management", "Monthly results report", "Dedicated WhatsApp support", "Cancel anytime"],
      cta: { label: "Get a Quote", href: "/contact?plan=retainer" },
    },
  ],
};
```
Make the placeholders easy to find, e.g. export a `PLACEHOLDER` note comment at the top of the file listing every `[X]` to replace.

## 7. Visual comparison loop
1. Screenshot `/` with Playwright at 1440px (ask before installing). Capture both sections, then crop to each section and to the same aspect ratio as the reference.
2. Compare them with `stats-pricing.png`: the panel shape, headline breaks, underline position, card stagger, card sizes, the pricing card heights and featured contrast, button sizes, and list spacing.
3. Fix the differences and take new screenshots. Do up to 3 rounds. Then screenshot at 768 and 375px and check the responsive rules.

## 8. Done when
- [ ] At 1440px both sections match the reference's structure and proportions, apart from the differences you report.
- [ ] The stats cards are staggered on desktop and in a 2×2 grid on mobile.
- [ ] The featured pricing card is dark, slightly taller on desktop, and first on mobile.
- [ ] All copy comes from `lib/content/home.ts`; numbers and prices are `[X]` placeholders; no hard-coded hex values.
- [ ] No horizontal scroll at 360–1440px (except an intentional tablet scroll row).
- [ ] Contrast checks pass. Headings are in order (h2 → h3).
- [ ] `lint`, `typecheck` and `build` pass.

## 9. Final report
Include: files changed, the measurement table, the screenshots, the differences remaining, new tokens or variants added (e.g. `surface-dark`, the Button `pill` variant), and the list of placeholders I need to fill in.
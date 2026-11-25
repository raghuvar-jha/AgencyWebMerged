# Spec: Navbar + Hero (+ Trust Bar)

Reference: `docs/design/Hero.png` (screenshot about 1216×936px).
All px values below are for a **1440px desktop width** (the reference scaled by about ×1.18). They are estimates from the image. Step 1 checks them.

## 0. Read first
1. `CLAUDE.md`
2. `docs/design/DESIGN.md`
3. `docs/design/Hero.png`

Map every value in this spec to the nearest DESIGN.md token. If no token exists within about 4px, or a colour isn't in the palette, list it and suggest a new token, then ask before adding it to DESIGN.md.

## 1. Check the measurements before coding
Use Python + Pillow (ask before installing anything) to check this spec against `hero.png`:
- Sample the hex colours at these points: page background (top-left and bottom-right), nav CTA fill, purple headline text, dark headline text, body text, stat card fill, stat icon circle, star colour, blob shapes, trust bar card.
- Measure, in image px and then ×(1440 / image width): nav height, logo size, H1 cap height and line spacing, button height, stat card size, trust bar size, and the left edges of the content columns.
- Print a table: **spec value | measured value | value you'll use**. If they differ by more than 4px, use the measured value.

## 2. Files
- `components/Navbar.tsx`: Server Component
- `components/MobileMenu.tsx`: Client Component (the menu toggle only)
- `components/Hero.tsx`: Server Component
- `components/hero/StatCard.tsx`
- `components/hero/TrustBar.tsx`
- `components/hero/Decorations.tsx`: inline SVG squiggle, sparkle and blobs, all `aria-hidden`
- `lib/content/home.ts`: all copy, nav links, stats and logos (typed). No copy hard-coded in components.
- Render them in `app/page.tsx`. The Navbar goes in the root layout if CLAUDE.md says it's global.

## 3. Global look
- **Page background:** a soft lavender gradient, about `#F5F2FD` at top-left to `#EEE9FA` at bottom-right, covering the whole navbar and hero.
- **Font:** a geometric sans with tight, heavy headlines (the reference looks like Plus Jakarta Sans or a close match). Use DESIGN.md's font. If DESIGN.md has none yet, suggest `Plus Jakarta Sans` (600/700/800) loaded with next/font, and ask first.
- **Colour tokens (estimated; confirm in Step 1):**
  | Role | Approx hex |
  |---|---|
  | primary (buttons, purple headline) | `#6B4BDB` |
  | primary-hover | `#5A3CC4` |
  | primary-soft (icon circles, eyebrow border) | `#ECE6FC` / `#D9CFF5` |
  | text-strong (dark headline, numbers) | `#14111F` |
  | text-body (paragraph, nav links) | `#4A4660` |
  | text-muted (small social-proof text) | `#6E6A82` |
  | surface (stat cards, trust bar) | `#FFFFFF` at about 85–100% opacity |
  | star | `#F5B731` |
  | blob decoration | `#E2D9F7` at about 60% |

## 4. Navbar
- **Height:** 96px. Background is transparent (the page gradient shows through). No border.
- **Container:** max-width 1328px, centred, padding-x 24px. Flex row, items centred, space-between.
- **Logo (left):** a mark about 44×40px (a purple and dark angular "mountain/arrow" shape, as inline SVG or `/public/logo.svg`), then a 10px gap, then the wordmark at 26px, weight 700, `text-strong`, letter-spacing −0.01em. It links to `/`.
  Use **[YOUR AGENCY NAME]** and a placeholder mark. Don't copy the reference logo.
- **Links (right group):** 15px, weight 500, `text-body`, gap 40px between links, hover changes to `primary`.
  Links: Home, Services, Work, Pricing, About, Contact.
- **CTA:** 48px gap after the last link. `bg-primary`, white text, 15px weight 600, height 46px, padding-x 22px, radius 6px, very subtle shadow, `primary-hover` on hover. Label: "Get Free Audit", linking to `#contact`.
- **Below lg:** the logo and a hamburger `<button>` (44×44px, `aria-label`, `aria-expanded`, `aria-controls`). The panel drops down with links stacked (18px, 16px vertical padding) and the CTA full-width. It closes on Escape, on link click and on outside click. The page doesn't scroll while it's open.

## 5. Hero layout
- **Container:** max-width 1224px, centred, padding-x 24px. Top padding about 64px below the navbar; bottom padding
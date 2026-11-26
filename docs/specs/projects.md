# Spec: Projects Section ("Selected Work")

Reference: `docs/design/project.png` (a low-resolution screenshot, about 1056×300px).
The px values below are for a **1440px desktop width** (the reference scaled by about ×1.78 and rounded). They are estimates. Step 1 checks them.

## 0. Read first
1. `CLAUDE.md`
2. `docs/design/DESIGN.md`
3. `docs/design/project.png`
4. The existing sections (Hero, Stats, Pricing) and `lib/content/home.ts`. Reuse their tokens, the Button component, the Underline decoration and the content patterns.

**Style rule:** copy the reference's layout, proportions, spacing and card structure exactly. Use **DESIGN.md's colours and fonts** for brand consistency:
- The reference's serif navy headline uses DESIGN.md's heading font and `text-strong`
- The reference's pink eyebrow, underline and CTA use `primary`
- The reference's cream background uses DESIGN.md's soft surface (or a new `surface-warm` token if DESIGN.md defines one; ask first)
- The four pastel card tints are kept as a small set of `tint-*` tokens (see section 4)

## 1. Check the measurements before coding
Use Python + Pillow to measure `project.png`: the card width and height ratio, the image-area height compared with the body height, the gaps, the header layout and the CTA size. Sample the four card tint colours. Print a table: **spec value | measured value | value you'll use**. The image is low-res, so prefer DESIGN.md tokens when a value is ambiguous.

## 2. Files
- `components/sections/ProjectsSection.tsx`: Server Component
- `components/ui/ProjectCard.tsx`: one card
- `components/decorations/WaveDivider.tsx`: the soft wave shapes at the top and bottom of the section (SVG, `aria-hidden`)
- `lib/content/projects.ts`: typed project data (see section 7). It's separate from home.ts because case study pages will reuse it later.
- Placeholder images: `public/projects/placeholder-1.webp` to `placeholder-4.webp`, or CSS placeholders if the files don't exist.
- Render the section in `app/page.tsx` with `id="work"` (the Hero's "See Our Work" button links here). Put it after the Hero/Stats and before Pricing, unless the page order in DESIGN.md says otherwise.

## 3. Section layout
- **Background:** the soft surface colour across the full width. A gentle `WaveDivider` sits at the top edge (a lavender or primary-soft wave about 40px tall) and another at the bottom edge (a subtle tinted wave about 50px tall), as in the reference.
- **Optional doodles:** a small hand-drawn arrow or sparkle near the bottom-right, matching the Hero's decorations. Show them only if DESIGN.md's decoration style allows it, desktop only, `aria-hidden`.
- Section padding-y: 96px top, 112px bottom (leaving room for the wave).
- Container: max-width 1224px, padding-x 24px.

## 4. Header (desktop ≥ lg)
A 2-column flex row, `justify-between`, aligned to the bottom (`items-end`), gap 48px.

**Left:**
1. **Eyebrow:** "My Work" at 14px, weight 600, `primary`. (If DESIGN.md says eyebrows are uppercase pills like the Hero's, use that style instead, for consistency.)
2. Gap 10px.
3. **H2:** "Selected Work" at 44px, weight 700, letter-spacing −0.02em, `text-strong`, heading font.
4. **Underline:** reuse `Underline.tsx`. It's about 120px wide with a 3px stroke in `primary`, 8px below the H2, starting at the left edge, slightly curved like a brush stroke.

**Right** (max-width 400px, left-aligned text, ending about 30% before the container edge as in the reference; or simply aligned to the start of the 3rd card column):
- A paragraph at 16px, line-height 1.6, `text-body`, on 2 lines:
  "Here are some projects I'm proud of. / Each one is built with ♥ and lots of coffee."
  The heart is an inline SVG at 14px in `primary` with `aria-label="love"`, not an emoji.

Gap from header to cards: 40px.

**Tint tokens:** add these to DESIGN.md if they're missing (confirm the colours in Step 1, then adjust the lightness to match the palette):
| Token | Approx hex | Reference card |
|---|---|---|
| `tint-green` | `#BFD9AE` | card 1 |
| `tint-pink` | `#F6B3CF` | card 2 |
| `tint-yellow` | `#F8CD5A` | card 3 |
| `tint-purple` | `#BBA9F2` | card 4 |

## 5. Cards grid
- **Desktop (≥ lg):** 4 columns, `grid-template-columns: repeat(4, minmax(0, 1fr))`, gap 32px. Each card is about 282px wide by 320px tall.
- **Tablet (md–lg):** 2 columns, gap 24px.
- **Mobile (< md):** a horizontal scroll row (`flex`, `overflow-x-auto`, `snap-x snap-mandatory`), each card 82% of the viewport wide with `snap-start`, gap 16px, padding-x 24px. Hide the scrollbar visually but keep it usable. A single column is the fallback if the scroll row feels wrong. Report which one you used.

### ProjectCard
- `<article>`, background white, radius 16px, `overflow-hidden`, shadow about `0 8px 24px rgba(20,17,31,0.06)`. On hover it lifts by −4px and the shadow gets a little stronger, over 200ms ease. Use `motion-safe:` only.
- The whole card is clickable through the "View Case Study" link, using the stretched-link pattern (`after:absolute after:inset-0` on the link, `relative` on the card). Don't nest interactive elements inside it.

**Image area (top):**
- Height 170px (about 53% of the card), background is the card's `tint-*`, radius 16px on the top corners only (it inherits from the card).
- Content: the project's mockup image (`next/image`, `object-contain`, with the bottom of the image aligned to the bottom of the area, about 90% of the area's height, centred). In the reference, each mockup shows two phone screens overlapping, one slightly in front and to the right. That's part of the image itself, so don't build it in CSS.
- Placeholder until real images exist: two rounded rectangles (phone shapes, about 70×140px and 64×128px, white with a 2px `text-strong` border at 10% opacity, radius 12px, overlapping by about 20px and offset vertically by 12px), centred, plus a small "[Project mockup]" label for screen readers only.
- `sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 82vw"`, lazy-loaded (not `priority`).

**Body:**
- Padding 20px 20px 22px. Flex column.
- Category: 13px, weight 500, `text-muted`.
- Gap 4px.
- Title (`<h3>`): 19px, weight 700, `text-strong`.
- Gap 8px.
- Description: 14px, line-height 1.55, `text-body`, at most 2 lines (`line-clamp-2`).
- Gap 14px.
- Link: "View Case Study", then a 6px gap and an arrow-right icon (14px), at 14px weight 700 in `text-strong`. On hover the text turns `primary` and the arrow moves 3px to the right (`motion-safe`). Its `aria-label` is "View case study: {title}".

## 6. CTA
- Gap 48px below the grid, centred.
- A pill button: height 44px, padding-x 24px, fully rounded, `bg-primary`, white text at 15px weight 600, then an 8px gap and an arrow-right icon (16px). Hover uses `primary-hover`.
- Label: "See All Projects", linking to `/work` (if that route doesn't exist yet, link anyway and add it to the TODO list in your report).
- Reuse the Button component (`pill` variant + trailing icon) from the Stats spec if it already exists.

## 7. Content (`lib/content/projects.ts`): placeholders only
Never invent client names or results. Use real projects only when I provide them.

```ts
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tint: "green" | "pink" | "yellow" | "purple";
  image?: { src: string; alt: string; width: number; height: number };
  href: string;            // `/work/${slug}`
  featured?: boolean;      // show on the homepage
};

export const projects: Project[] = [
  { slug: "project-1", title: "[Project Name]", category: "[Industry, e.g. Food & Delivery]", description: "[One-line summary of what you built and the result.]", tint: "green",  href: "/work/project-1", featured: true },
  { slug: "project-2", title: "[Project Name]", category: "[Industry, e.g. E-commerce]",     description: "[One-line summary of what you built and the result.]", tint: "pink",   href: "/work/project-2", featured: true },
  { slug: "project-3", title: "[Project Name]", category: "[Industry, e.g. Finance]",        description: "[One-line summary of what you built and the result.]", tint: "yellow", href: "/work/project-3", featured: true },
  { slug: "project-4", title: "[Project Name]", category: "[Industry, e.g. Health & Fitness]", description: "[One-line summary of what you built and the result.]", tint: "purple", href: "/work/project-4", featured: true },
];

export const projectsSection = {
  eyebrow: "My Work",
  title: "Selected Work",
  intro: { line1: "Here are some projects I'm proud of.", line2: "Each one is built with", line2End: "and lots of coffee." },
  cta: { label: "See All Projects", href: "/work" },
};
```
The homepage shows `projects.filter(p => p.featured).slice(0, 4)`. If there are fewer than 4 projects, the grid still looks balanced (the cards keep their width and the row is centred).

## 8. Accessibility
- `<section id="work" aria-labelledby="work-title">` with an `<h2 id="work-title">`. Each card is an `<article>` with an `<h3>`.
- Mockup images get real alt text, e.g. "Screens of the [Project] food delivery app: menu and order tracking". Placeholders get alt text marking them as placeholders.
- Contrast: check `text-muted` at 13px on white (needs 4.5:1), white CTA text on `primary`, and the eyebrow colour on the section background.
- Keyboard: Tab moves to each card's link (one stop per card) and then to the CTA, with visible focus rings. The mobile scroll row works with the keyboard too: focusing a card scrolls it into view.

## 9. Visual comparison loop
1. Use Playwright to screenshot the section at 1440px (ask before installing), cropped to the section and scaled to the reference's width, so you can compare directly with `project.png`.
2. Compare: the header layout and the position of the right-hand paragraph, the H2 size and underline, card proportions (image-area to body ratio), the gaps, the text hierarchy inside the cards, and the CTA size and spacing.
3. Fix the differences and take new screenshots. Do up to 3 rounds. Then check 768px and 375px.

## 10. Done when
- [ ] At 1440px the structure and proportions match `project.png`, apart from the differences you report. Colours and fonts follow DESIGN.md.
- [ ] 4 columns on desktop, 2 on tablet, a scroll row (or 1 column) on mobile, with no page-level horizontal scroll.
- [ ] Each card has one keyboard stop, its whole surface is clickable, and the hover lift respects reduced motion.
- [ ] All content comes from `lib/content/projects.ts` with placeholders; no invented clients.
- [ ] No hard-coded hex values; the tint tokens are added to DESIGN.md.
- [ ] `lint`, `typecheck` and `build` pass.

## 11. Final report
Include: files changed, the measurement table, the screenshots, the differences remaining, the new tokens and variants, the mobile layout you chose, and TODOs (the `/work` page, the `/work/[slug]` case study pages, real images).
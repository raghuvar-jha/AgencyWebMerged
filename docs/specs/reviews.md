# Spec: Reviews / Testimonials Section ("What Clients Say")

Reference: `docs/design/reviews.png` (a low-resolution screenshot, about 1688×542px).
Copy the layout, card structure and carousel behaviour from the reference. Use colours, fonts, radii and shadows from **DESIGN.md**, the same as the other sections (the reference's orange becomes `primary`).

## 0. Read first
1. `CLAUDE.md`
2. `docs/design/DESIGN.md`
3. `docs/design/reviews.png`
4. `components/sections/StatsSection.tsx` (the "Happy Businesses Trust Us" panel). **This section's width must match that panel exactly.**
5. The other sections and content files, so you reuse their tokens, eyebrow, H2, Underline and button styles.

## 1. Width rule (most important)
- Find the exact container and panel width StatsSection uses (its max-width, horizontal padding and the panel's outer edges). Reuse the **same container class or component**. Don't type the number again; if the value is hard-coded there, pull it into a shared `Container` / `sectionContainer` and use it in both sections.
- At every breakpoint, the left and right edges of this section's carousel area line up exactly with the left and right edges of the Stats panel.
- The carousel viewport has `overflow: hidden` at those edges. **Nothing** goes past them: no cards, arrows or shadows bleeding into the page margins. (Shadows may be clipped slightly; add a little vertical padding inside the viewport so the top and bottom shadows aren't cut off.)
- Background: plain white (no panel), so the section feels lighter than the Stats panel but just as wide. Optional: if DESIGN.md's section rhythm calls for alternating backgrounds, use the soft surface on a rounded panel with the **same radius and width** as the Stats panel. Say which you chose.

## 2. Check the measurements before coding
Use Python + Pillow to measure `reviews.png`: card width and height, the gap, how much bigger the centre card is than the side cards, avatar size, arrow size, and the header spacing. Scale the values to the container width from section 1. Print a table: **reference value | scaled value | value you'll use** (snapped to tokens).

## 3. Files
- `components/sections/ReviewsSection.tsx`: Server Component (header, layout and data)
- `components/ui/ReviewsCarousel.tsx`: Client Component (only the carousel logic)
- `components/ui/ReviewCard.tsx`: one card (server-safe)
- `components/ui/StarRating.tsx`: reusable stars
- `lib/content/reviews.ts`: typed review data (placeholders)
- Render it in `app/page.tsx` with `id="reviews"`, after the Stats section (it builds on the "trust" message), unless DESIGN.md's page order says otherwise.

## 4. Header (centred)
- Section padding-y: the same as the other sections (about 96px).
- Optional eyebrow: "Testimonials" (the same pill style as the other eyebrows).
- **H2:** "What **Clients** Say", with "Clients" in `primary` and the rest in `text-strong`. Same size, weight and letter-spacing as the other section H2s (about 44px, weight 700–800). Drop the "!" unless DESIGN.md's voice uses it.
- **Subtitle:** 17px, line-height 1.6, `text-body`, centred, max-width 520px, on 2 lines: "See how we've helped businesses get found online, win more customers and grow."
- Gap to the carousel: 48px.

## 5. Carousel layout (desktop ≥ lg)
- Inside the shared container: **3 full cards visible**, with the centre card active, plus a **thin peek (about 40–56px)** of the previous and next cards at the left and right edges, still inside the container, as in the reference.
- Fade the peeking cards out towards the edges with a `mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent)` on the viewport, so the edges feel soft, not chopped.
- Gap between cards: about 32px (scaled from the reference's about 67px, then snapped to a token).
- **The centre card is emphasised:** scale 1.06, a stronger shadow, `z-index` above the others, and side cards at full opacity (or 85%; say which matches the reference best). Transition 300ms ease, `motion-safe` only.
- **Arrows:** circles of 44px, white background, the soft card shadow, a lucide `ChevronLeft` / `ChevronRight` icon at 20px in `text-strong`, hover background `primary-soft` with the icon in `primary`. Each one is vertically centred on the cards and sits **over the peek area, inside the container edges** (about 8px in from each edge). Real `<button>`s with `aria-label="Previous review"` / `"Next review"`.
- Optional dots below (8px circles, the active one `primary` and 24px wide as a pill, 8px gap, 28px margin-top). Include them on mobile, where the arrows are hidden. Each dot is a button with `aria-label="Go to review N"`.
- Looping: infinite loop on desktop. **Autoplay is off by default.** If it's turned on later through a prop: 6s, paused on hover and focus, and disabled under `prefers-reduced-motion`.

### Tablet (md–lg)
- 2 cards visible, no centre emphasis (or emphasis on the first visible card), arrows kept, peek about 32px.

### Mobile (< md)
- 1 card visible at about 88% of the container width, with the next card peeking. Swipe works, the arrows are hidden, the dots are shown. No page-level horizontal scroll.

### Implementation
- Preferred: `embla-carousel-react` (small, supports swipe, loop and centring well). **Ask before installing.** Use `align: "center"`, `loop: true`, `containScroll: false`, and track the selected index to apply the centre emphasis.
- No-dependency fallback: CSS `scroll-snap` (`snap-x snap-mandatory`, `snap-center`) with arrow buttons calling `scrollBy`, and an IntersectionObserver to find the centred card. Report which approach you used.
- All cards are server-rendered in the HTML (for SEO and for users without JS). Without JS, the row is still scrollable horizontally.

## 6. ReviewCard
- `<figure>`, background white, radius 16px (match the other cards), padding 28px, shadow `0 10px 30px rgba(20,17,31,0.06)`, border 1px `border-subtle` at 60%. Equal height across cards (use flex and `h-full`).
- **Top row** (flex, gap 14px, items centred):
  - Avatar: a 56px circle, `next/image` with `object-cover`. Placeholder: a `primary-soft` circle with initials in `primary` (weight 700).
  - A column: the name (`figcaption` content) at 16px weight 700 in `primary`, then the role and company at 13px weight 500 in `text-muted` (e.g. "Owner, [Business name]").
- Gap 18px.
- **Quote:** `<blockquote>` at 15px, line-height 1.65, `text-body`, `line-clamp-4` (it keeps the cards even; the full text stays in the DOM).
- Gap 18px.
- **StarRating:** 5 stars at 18px with a 4px gap. Filled stars use the `star` token (amber); empty stars use `border-subtle` / a muted grey. The visible stars are `aria-hidden`, plus screen-reader text "Rated N out of 5".
- Optional (recommended): a small "Google review" badge (a 12px G mark is fine as a neutral icon, or just the text) at the bottom right, in `text-muted` at 12px, when `source: "google"`.

## 7. Content (`lib/content/reviews.ts`): placeholders only
**Never invent reviews,
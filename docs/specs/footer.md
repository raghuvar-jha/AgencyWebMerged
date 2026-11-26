# Spec: Footer (with Audit CTA banner)

Reference: `docs/design/footer.png` (a low-resolution screenshot, about 1390×350px; it's roughly 1440px scaled by ×0.965, so values below are already converted to **1440px**).
**Ignore the black rewind/forward video controls in the middle of the image.** They belong to the screen recorder, not the design.
Copy the layout, column structure and spacing from the reference. Use colours, fonts, radii and shadows from **DESIGN.md**.

## 0. Read first
1. `CLAUDE.md`
2. `docs/design/DESIGN.md`
3. `docs/design/footer.png`
4. The shared Container used by StatsSection and ReviewsSection. **The footer uses the same container, and its edges line up with those sections.**
5. `components/Navbar.tsx` + `lib/nav.ts` (reuse the logo and links), and `lib/content/*` (reuse the services list and contact details if they exist).

## 1. Check the measurements before coding
Use Python + Pillow on `footer.png` (skip the video-controls area): banner height, radius, icon circle size, input and button sizes, the column x positions (to get grid ratios), heading and link sizes, the link row spacing, and the social icon size. Sample the banner gradient and primary colours. Print a table: **reference value | 1440 value | value you'll use** (snapped to tokens).

## 2. Files
- `components/Footer.tsx`: Server Component (rendered in `app/layout.tsx` so every page has it)
- `components/footer/AuditBanner.tsx`: the banner layout (server)
- `components/footer/AuditForm.tsx`: Client Component (only the form state; it submits to a server action)
- `app/actions/audit.ts`: server action with zod validation (see section 7)
- `components/footer/FooterColumn.tsx`: a heading plus a list of links
- `components/footer/SocialLinks.tsx`
- `lib/content/footer.ts`: typed footer data (see section 8)

## 3. Layout overview
- The footer background is white (or the soft surface if the section above is white and you need separation; say which you chose). A 1px `border-subtle` line at the very top is optional.
- Padding-top 48px, padding-bottom 32px.
- Order: the **Audit banner**, then a 56px gap, then the **column grid**, then a 48px gap, then the **bottom bar**.

## 4. Audit banner (`AuditBanner`)
- Full width of the shared container, about 112px tall on desktop, radius 16px, background a soft gradient from `primary-soft` (left, about `#EDE6FC`) to the lavender surface (right, about `#F7F3FE`). No border. Padding 0 48px 0 32px. Flex row, items centred, `justify-between`, gap 32px.
- **Left group** (flex, gap 24px, items centred):
  - Icon circle: 88px, `bg-primary`, with a white lucide `Mail` icon (or `Search` / `Sparkles`, whichever fits "audit" better; say which) at 38px, stroke 2.
  - A text column:
    - Title: 24px, weight 700, heading font, `text-strong`: "Get a Free Website Audit"
    - Gap 6px.
    - Subtitle: 15px, `text-body`: "Send us your site and get a video review of what's costing you customers. Free, within 24 hours."
- **Right: `AuditForm`** (flex row, no gap; the input and button join into one control):
  - Input: width 300px, height 52px, white background, radius 10px on the left corners only, no visible border (a 1px `border-subtle` is fine if contrast needs it), padding-x 20px, 15px text, placeholder "Enter your email" in `text-muted`. `type="email"`, `autocomplete="email"`, `required`. It has a visually hidden `<label>` "Email address".
  - Button: height 52px, padding-x 32px, `bg-primary`, white text at 14px weight 700, uppercase, letter-spacing 0.06em, radius 10px on the right corners only. `primary-hover` on hover. Label: "GET MY AUDIT".
  - States: while submitting, the button shows a spinner and is disabled. On success, the form is replaced with the text "Thanks! We'll email your audit within 24 hours." in `primary` at 15px weight 600, announced through `aria-live="polite"`. On an error, show a 13px error message under the input (`aria-describedby`), with the input border in the error token.
- **Tablet (md–lg):** the banner grows taller and wraps: icon and text on top, the form full width below it (input `flex-1`). Padding 28px.
- **Mobile (< md):** the icon circle shrinks to 56px; the title is 20px; the form stacks with the input and button each full width, each with all corners rounded, and a 10px gap.

## 5. Column grid
- Desktop (≥ lg): CSS grid with 5 columns, `grid-template-columns: 1.5fr 1fr 1fr 1fr 1.1fr`, column gap 40px, items aligned to the top (this matches the reference's column x positions; confirm it in Step 1).
- Tablet (md–lg): the brand column spans the full width on top, then the 4 link columns in a `repeat(4, 1fr)` row. If that's cramped, use 2×2 below the brand column.
- Mobile (< md): the brand column first, then the link columns in a 2-column grid (gap 32px 24px), then the Contact column at full width.

### Column 1: Brand
- Logo: reuse the Navbar logo (mark about 40px plus the wordmark at 22px weight 700, `text-strong`), linking to `/`. Under it, a tagline at 11px weight 500 in `text-muted`: "[Your tagline, e.g. Websites & Marketing That Grow Businesses]".
- Gap 18px.
- Description: 14px, line-height 1.6, `text-body`, max-width 280px, on 3 lines:
  "We build fast websites, mobile apps and marketing that help businesses get found online and win more customers."
- Gap 22px.
- `SocialLinks`: a row of 32px circular icon buttons, gap 12px. Each is a `bg-primary` circle with a 16px white brand icon (use the same icon set as the Tech section, e.g. Simple Icons, for consistency; ask before installing if it isn't installed yet). Hover uses `primary-hover` and lifts by −2px (`motion-safe`). Each is a real `<a>` with `aria-label="[Agency] on Instagram"`, `target="_blank"` and `rel="noopener noreferrer"`. **Only render the networks that have a URL in the content.**

### Columns 2–4: link columns (`FooterColumn`)
- Heading: 15px, weight 700, `text-strong`, margin-bottom 18px. It's a `<h2>` styled small (or a `<p>` with `role="heading" aria-level="2"`), because footer headings shouldn't compete with page headings visually.
- Links: a `<ul>` with items spaced 12px apart (the reference has about 24px between baselines). Each link is 14px, `text-body`, `next/link`. Hover turns it `primary` with an underline offset of 4px. Focus ring visible.
- **Column 2: "Quick Links":** Home, Our Work, Pricing, About, Blog, Contact
- **Column 3: "Services":** Website Development, Mobile App Development, SEO, Google & Meta Ads, Website Maintenance
- **Column 4: "Resources":** Free Website Audit, FAQ, Privacy Policy, Terms & Conditions, Refund Policy

### Column 5: "Get in Touch" (replaces the reference's "We Accept")
- The same heading style.
- A list (gap 14px) of rows, each a 16px lucide icon in `primary` plus 14px `text-body` text with a 10px gap:
  - `MessageCircle`: "[+91 XXXXX XXXXX]" as a WhatsApp link `https://wa.me/91XXXXXXXXXX`
  - `Phone`: "[+91 XXXXX XXXXX]" as a `tel:` link
  - `Mail`: "[hello@yourdomain.com]" as a `mailto:` link
  - `MapPin`: "[City], [State], India" (text only; no street address, since you're a service-area business)
  - `Clock`: "Mon–Sat, 10am–7pm" (placeholder)
- Gap 20px, then a small muted line at 12px, `text-muted`: "MSME Reg. No: UDYAM-UP-28-0253897".
- Optional (only if `payments` is set in the content): a small "We accept" label plus text chips (UPI · Bank Transfer · Razorpay · International cards), 12px, `border-subtle` chips with radius 999px. Use text chips, not payment-brand logos.

## 6. Bottom bar
- Desktop: a 1px `border-subtle` line across the container, then 24px padding-top. A flex row, `justify-between`, wrapping on small screens:
  - Left: `© {new Date().getFullYear()} [Agency Name]. All rights reserved.` at 13px in `text-muted`. The year is computed so it never goes out of date.
  - Right: "Made with ♥ in [City], India" (the heart is an inline SVG in `primary`, `aria-hidden`, with a hidden "love" label for screen readers) and small links to Privacy and Terms, at 13px in `text-muted`, with a 20px gap.
- Mobile: stacked and centred, with an 8px gap.

## 7. Audit form backend
- Server action `submitAudit(formData)`: validate `email` with zod (trim, lowercase, max 254 characters). Add a honeypot field (a visually hidden `website` input; reject the submission if it's filled) and basic rate limiting per IP (simple in-memory or DB-based; say which).
- Storage: if a `leads` table already exists, insert `{ email, source: "footer_audit", created_at }`. **If no table exists, ask me before creating or changing the schema.** Until it exists, log the submission on the server and return success, with a `TODO` in the report.
- No third-party newsletter service without asking.
- Return `{ ok: true }` or `{ ok: false, error }`. Never expose internal errors to the user.

## 8. Content (`lib/content/footer.ts`): placeholders
```ts
export const footer = {
  brand: {
    name: "[AGENCY NAME]",
    tagline: "[Websites & Marketing That Grow Businesses]",
    description: "We build fast websites, mobile apps and marketing that help businesses get found online and win more customers.",
  },
  audit: {
    title: "Get a Free Website Audit",
    subtitle: "Send us your site and get a video review of what's costing you customers. Free, within 24 hours.",
    placeholder: "Enter your email",
    button: "GET MY AUDIT",
    success: "Thanks! We'll email your audit within 24 hours.",
  },
  columns: [
    { title: "Quick Links", links: [ { label: "Home", href: "/" }, { label: "Our Work", href: "/#work" }, { label: "Pricing", href: "/#pricing" }, { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" } ] },
    { title: "Services", links: [ { label: "Website Development", href: "/services/website-development" }, { label: "Mobile App Development", href: "/services/mobile-apps" }, { label: "SEO", href: "/services/seo" }, { label: "Google & Meta Ads", href: "/services/ads" }, { label: "Website Maintenance", href: "/services/maintenance" } ] },
    { title: "Resources", links: [ { label: "Free Website Audit", href: "/#contact" }, { label: "FAQ", href: "/#faq" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }, { label: "Refund Policy", href: "/refund-policy" } ] },
  ],
  contact: {
    whatsapp: "[91XXXXXXXXXX]",
    phone: "[+91 XXXXX XXXXX]",
    email: "[hello@yourdomain.com]",
    location: "[City], [State], India",
    hours: "Mon–Sat, 10am–7pm",
    msme: "UDYAM-UP-28-0253897",
  },
  socials: { instagram: "", linkedin: "", facebook: "", youtube: "", x: "" }, // empty = hidden
  payments: null as null | string[],
  bottom: { madeIn: "[City], India" },
};
```
- Reuse existing data where it already exists (e.g. the services list from the Tech or Services content, contact details from home.ts). Don't duplicate it.
- If any `href` points to a page that doesn't exist yet (`/privacy`, `/terms`, `/services/*`, `/blog`), keep the link and list it under TODOs in the report.

## 9. SEO and accessibility
- `<footer>` landmark. Each link column is a `<nav aria-label="{title}">`.
- Add **Organization / LocalBusiness JSON-LD** once (in the layout or footer) with the name, URL, logo, email, telephone, `areaServed` = [City] and `sameAs` = the social URLs that are filled in. Leave out the street address (service-area business).
- All interactive elements are at least 44px tall on mobile (pad the link rows on mobile if needed). Focus rings are visible.
- Contrast: 14px `text-body` and 13px `text-muted` on the footer background must reach 4.5:1. Check the banner title and subtitle on the gradient too.

## 10. Visual comparison loop
1. Screenshot with Playwright at 1440px (ask before installing). Capture the footer and the section above it, and confirm the footer's edges line up with the shared container (the same as the Stats and Reviews sections).
2. Compare with `footer.png` (ignoring the video controls): the banner proportions, icon circle, the joined input and button, column positions and ratios, heading and link sizes and spacing, the social icons, and the bottom bar.
3. Fix the differences. Do up to 3 rounds. Then check 1024, 768 and 375px.
4. Test the form: an empty submission, an invalid email, a valid email (success state), and a filled honeypot (rejected).

## 11. Done when
- [ ] The footer is on every page through the layout, and its edges line up with the shared container at every breakpoint.
- [ ] The banner, the 5-column grid and the bottom bar match the reference's structure and proportions (the column 5 content changed as specified).
- [ ] The audit form validates, shows loading, success and error states, includes a honeypot, and doesn't change the DB schema without approval.
- [ ] Social icons appear only for filled URLs; the year is dynamic; JSON-LD is valid.
- [ ] All content comes from `lib/content/footer.ts`; no hard-coded hex values.
- [ ] `lint`, `typecheck` and `build` pass.

## 12. Final report
Include: files changed, the measurement table, the screenshots, the form test results, the DB/lead storage status, the differences remaining, and TODOs (missing pages, real contact details, social URLs).
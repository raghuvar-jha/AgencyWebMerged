// "What Clients Say" section data.
// PLACEHOLDERS ONLY. Never invent reviews, names, photos or ratings (DESIGN.md §10).
// Replace each slot with a real review (ideally copied from the Google Business profile,
// with the client's permission) before launch. No review structured data until then.
//
// PLACEHOLDERS TO REPLACE (search for "[" in this file):
// - reviews[].name / role / quote   real client, their business, their words
// - reviews[].rating                their actual star rating (null = no stars shown)
// - reviews[].avatar                real photo with permission (omit = initials)

export type Review = {
  id: string;
  name: string;
  /** e.g. "Owner, Sharma Dental" */
  role: string;
  quote: string;
  /** 1–5, or null while unknown (no stars rendered). */
  rating: number | null;
  avatar?: { src: string; alt: string };
  source?: "google";
};

const placeholder = (n: number): Review => ({
  id: `review-${n}`,
  name: `[Client name ${n}]`,
  role: "[Role], [Business name]",
  quote: "[PLACEHOLDER: real client review, 1–3 sentences in their own words.]",
  rating: null,
});

export const reviews: Review[] = [1, 2, 3, 4, 5].map(placeholder);

export const reviewsSection = {
  eyebrow: "Testimonials",
  title: { before: "What", highlight: "Clients", after: "Say" },
  subtitle: "See how we've helped businesses get found online, win more customers and grow.",
  carouselLabel: "Client reviews",
  prevLabel: "Previous review",
  nextLabel: "Next review",
  /** "{n}" is replaced with the slide number. */
  dotLabel: "Go to review {n}",
  /** "{n}" / "{total}" are replaced. */
  slideLabel: "{n} of {total}",
  /** Screen-reader announcement when the slide changes. */
  statusLabel: "Review {n} of {total}",
  googleLabel: "Google review",
};

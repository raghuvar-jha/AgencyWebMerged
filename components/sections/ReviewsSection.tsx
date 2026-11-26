import { Underline } from "@/components/decorations/Underline";
import { Container } from "@/components/ui/Container";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";
import { reviews, reviewsSection } from "@/lib/content/reviews";

// DESIGN.md §6.20. White section after the Stats panel, same <Container> so the carousel's
// edges line up with the panel's at every width. 4+ reviews → carousel; 1–3 → static centred row.
const MIN_FOR_CAROUSEL = 4;

export function ReviewsSection() {
  const s = reviewsSection;
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="py-section md:py-section-lg">
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-caption text-primary uppercase">{s.eyebrow}</p>
          <h2 id="reviews-title" className="mt-2 text-h2 text-foreground">
            {s.title.before} <span className="text-primary">{s.title.highlight}</span> {s.title.after}
          </h2>
          <Underline className="mx-auto mt-2 block w-28" />
          <p className="mx-auto mt-4 max-w-lg text-body-lg text-muted">{s.subtitle}</p>
        </header>

        <div className="mt-6">
          {reviews.length >= MIN_FOR_CAROUSEL ? (
            <ReviewsCarousel
              labels={{
                region: s.carouselLabel,
                prev: s.prevLabel,
                next: s.nextLabel,
                dot: s.dotLabel,
                slide: s.slideLabel,
                status: s.statusLabel,
              }}
              slides={reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  googleLabel={s.googleLabel}
                  className="motion-safe:transition-shadow motion-safe:duration-300 lg:group-data-active/slide:shadow-raised"
                />
              ))}
            />
          ) : (
            <ul className="flex flex-col items-center gap-6 py-6 md:flex-row md:items-stretch md:justify-center lg:gap-8">
              {reviews.map((review) => (
                <li key={review.id} className="w-full max-w-sm md:flex-1">
                  <ReviewCard review={review} googleLabel={s.googleLabel} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

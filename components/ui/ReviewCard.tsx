import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import type { Review } from "@/lib/content/reviews";

// DESIGN.md §6.8. Server-safe; the carousel only adds the centre emphasis around it.
export function ReviewCard({
  review,
  googleLabel,
  className,
}: {
  review: Review;
  googleLabel: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image
            src={review.avatar.src}
            alt={review.avatar.alt}
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-pill object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-pill bg-surface-strong text-small font-bold text-primary"
          >
            {initials(review.name)}
          </span>
        )}
        <figcaption className="min-w-0">
          <span className="block text-body font-bold text-primary">{review.name}</span>
          <span className="block text-caption font-medium tracking-normal text-muted normal-case">{review.role}</span>
        </figcaption>
      </div>

      <blockquote className="mt-4 line-clamp-4 text-small text-muted">{review.quote}</blockquote>

      {(review.rating !== null || review.source === "google") && (
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {review.rating !== null ? <StarRating rating={review.rating} /> : <span />}
          {review.source === "google" && (
            <span className="text-caption font-medium tracking-normal text-muted normal-case">{googleLabel}</span>
          )}
        </div>
      )}
    </figure>
  );
}

function initials(name: string) {
  const words = name.replace(/[[\]]/g, "").split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

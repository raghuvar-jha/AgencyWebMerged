import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

// DESIGN.md §6.19. Visible stars are decorative; the sr-only text carries the rating.
export function StarRating({ rating, max = 5, className }: { rating: number; max?: number; className?: string }) {
  const filled = Math.max(0, Math.min(max, Math.round(rating)));

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={2}
          className={cn("size-4", i < filled ? "fill-accent text-accent" : "fill-subtle text-subtle")}
        />
      ))}
      <span className="sr-only">
        Rated {filled} out of {max}
      </span>
    </div>
  );
}

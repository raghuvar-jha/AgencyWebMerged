import { cn } from "@/lib/cn";

/** Faint concentric circle outlines behind panel content. Decorative. */
export function RingPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 700" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      {[110, 190, 270, 345].map((r) => (
        <circle
          key={r}
          cx="350"
          cy="350"
          r={r}
          className="stroke-primary-foreground/60"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

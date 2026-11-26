import { cn } from "@/lib/cn";

/** Hand-drawn underline stroke placed after a headline's last word. Decorative. */
export function Underline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 12"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-3", className)}
    >
      <path
        d="M2 8.5C38 4.5 92 2.5 158 5"
        className="stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

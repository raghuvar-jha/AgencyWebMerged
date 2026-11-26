import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";

// DESIGN.md §6.14. Number-only stat card (the hero's StatCard has an icon).
export function MetricCard({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-2.5 rounded-lg bg-background px-5 py-8 text-center shadow-card",
        className,
      )}
    >
      <p className="text-h1 font-bold text-primary">
        <CountUp value={value} />
      </p>
      <p className="max-w-32 text-body leading-snug font-medium text-muted">{label}</p>
    </div>
  );
}

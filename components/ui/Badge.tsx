import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Recipes from DESIGN.md §6.13.

export type BadgeVariant = "eyebrow" | "soft" | "outline" | "highlight" | "ink" | "outline-ink";

const variants: Record<BadgeVariant, string> = {
  eyebrow: "border border-border bg-background/60 px-4 py-2.5 text-primary uppercase",
  soft: "bg-surface-strong px-3 py-1 text-primary uppercase",
  outline: "border border-border bg-background px-3 py-1 text-muted uppercase",
  highlight: "bg-accent px-3 py-1 text-foreground uppercase",
  ink: "bg-ink-surface px-3 py-1 text-ink-primary uppercase",
  "outline-ink": "h-8 border border-primary/70 px-4 font-medium tracking-normal text-ink-foreground/85",
};

export function Badge({
  variant = "soft",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-pill text-caption whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { PricingPlan } from "@/lib/content/home";

// DESIGN.md §6.9. `variant` follows plan.featured unless set explicitly.
export function PricingCard({
  plan,
  startingAtLabel,
  variant = plan.featured ? "featured" : "default",
  className,
}: {
  plan: PricingPlan;
  startingAtLabel: string;
  variant?: "default" | "featured";
  className?: string;
}) {
  const featured = variant === "featured";
  const nameId = `plan-${plan.id}`;

  return (
    <article
      aria-labelledby={nameId}
      className={cn(
        "flex flex-col rounded-lg px-8 py-10 md:px-10 lg:px-8 xl:px-10",
        featured ? "bg-ink shadow-raised" : "border border-border bg-background shadow-card",
        className,
      )}
    >
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 id={nameId} className={cn("text-h4 font-medium", featured ? "text-ink-foreground/85" : "text-muted")}>
          {plan.name}
        </h3>
        {plan.badge && <Badge variant="outline-ink">{plan.badge}</Badge>}
      </div>

      <div className="mt-6">
        {plan.startingAt && (
          <p className={cn("text-small", featured ? "text-ink-muted" : "text-muted")}>{startingAtLabel}</p>
        )}
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className={cn("text-h1 font-bold", featured ? "text-ink-foreground" : "text-foreground")}>
            {plan.price}
          </span>
          {plan.period && (
            <span className={cn("text-body", featured ? "text-ink-muted" : "text-muted")}>{plan.period}</span>
          )}
        </p>
        {plan.description && (
          <p className={cn("mt-2 text-small", featured ? "text-ink-muted" : "text-muted")}>{plan.description}</p>
        )}
      </div>

      <ButtonLink href={plan.cta.href} size="sm" fullWidth aria-describedby={nameId} className="mt-6">
        {plan.cta.label}
      </ButtonLink>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn("flex gap-3 text-small", featured ? "text-ink-foreground/85" : "text-muted")}
          >
            <Check
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-ink-foreground" : "text-foreground")}
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

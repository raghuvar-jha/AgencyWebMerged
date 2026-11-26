import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { PricingCard } from "@/components/ui/PricingCard";
import { cn } from "@/lib/cn";
import { pricing } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";

// Layout, DESIGN.md §6.9:
// <md  one column, featured first
// md   2 + 1: featured full row on top, the other two side by side
// lg+  3 in a row (content order), equal heights, featured 16px taller (-my-2)
export function PricingSection() {
  // Motion: cards stagger in DOM order with the featured card last (DESIGN.md → Motion).
  const featuredLast = pricing.plans
    .map((plan, i) => ({ i, featured: !!plan.featured }))
    .sort((a, b) => Number(a.featured) - Number(b.featured))
    .map((p) => p.i);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="pt-8 pb-section md:pb-section-lg">
      <Container>
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="text-h2 text-foreground">
            {pricing.title}
          </h2>
          <p className="mt-4 text-body-lg text-muted">{pricing.subtitle}</p>
        </Reveal>

        <Stagger
          sequence={featuredLast}
          scale={0.97}
          stagger={0.1}
          className="mx-auto mt-10 grid max-w-md gap-5 md:max-w-none md:grid-cols-2 md:gap-8 lg:flex lg:items-stretch lg:gap-6 xl:gap-8 lg:justify-center"
        >
          {pricing.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              startingAtLabel={pricing.startingAtLabel}
              className={cn(
                plan.featured
                  ? "order-first md:col-span-2 md:mx-auto md:w-full md:max-w-md lg:order-none lg:-my-2 lg:max-w-88 lg:flex-1"
                  : "lg:max-w-84 lg:flex-1",
              )}
            />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

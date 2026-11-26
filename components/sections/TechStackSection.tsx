import { Globe, Server, ShoppingCart, Smartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { Underline } from "@/components/decorations/Underline";
import { TechCard } from "@/components/ui/TechCard";
import { TechTabs } from "@/components/ui/TechTabs";
import { techCategories, techSection, type TechTabIcon } from "@/lib/content/tech";

// DESIGN.md §6.17–6.18. Full-bleed lavender band between Projects (white) and Stats.
// Card grid: 2 cols < 360px · 3 from xs (360) · 4 from md · 6 from lg; a short last row is centred.

const tabIcons: Record<TechTabIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp,
};

export function TechStackSection() {
  const { eyebrow, title, intro, tablistLabel } = techSection;

  const tabs = techCategories.map((category) => {
    const Icon = tabIcons[category.icon];
    return {
      id: category.id,
      label: category.label,
      icon: <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />,
      panel: (
        <>
          {/* Gutter pattern: each <li> has px-2.5 and the list pulls back -mx-2.5, giving a 20px gap.
              flex-wrap + justify-center centres a short last row. */}
          <ul className="-mx-2.5 flex flex-wrap justify-center gap-y-5">
            {category.items.map((item) => (
              <TechCard key={`${category.id}-${item.name}`} item={item} />
            ))}
          </ul>
          <p className="mt-8 text-center text-small text-muted">{category.description}</p>
        </>
      ),
    };
  });

  return (
    <section id="tech" aria-labelledby="tech-title" className="bg-surface py-section md:py-section-lg">
      <div className="mx-auto w-full max-w-site px-5 md:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-caption text-primary uppercase">{eyebrow}</p>
          <h2 id="tech-title" className="mt-2 text-h2 text-foreground">
            {title}
          </h2>
          <Underline className="mx-auto mt-2 block w-28" />
          <p className="mt-4 text-body text-muted">{intro}</p>
        </header>

        <TechTabs label={tablistLabel} tabs={tabs} />
      </div>
    </section>
  );
}

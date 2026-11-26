import { cn } from "@/lib/cn";
import type { TechItem } from "@/lib/content/tech";
import { getTechLogo } from "@/lib/tech-icons";

// Recipe: DESIGN.md §6.17. Not a link: a plain <li> (grid cell) holding the card.

export function TechCard({ item }: { item: TechItem }) {
  const logo = getTechLogo(item.slug);

  return (
    // Cell: width per breakpoint + half of the 20px gutter (see TechStackSection).
    <li className="w-1/2 px-2.5 xs:w-1/3 md:w-1/4 lg:w-1/6">
      <div
        className={cn(
          "flex h-full flex-col items-center rounded-lg border border-border bg-background px-3 py-5 text-center",
          "transition duration-200 ease-out-soft hover:border-primary/40 hover:shadow-card motion-safe:hover:-translate-y-0.5",
        )}
      >
        {logo ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn("size-10 shrink-0 fill-current", !logo.color && "text-foreground")}
            // Brand colour from Simple Icons data (the one allowed non-token colour).
            style={logo.color ? { color: logo.color } : undefined}
          >
            <path d={logo.path} />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-sm bg-surface-strong text-small font-bold text-primary"
          >
            {initials(item.name)}
          </span>
        )}
        <span className="mt-3 text-small font-semibold text-foreground">{item.name}</span>
        {item.tag && (
          <span className="mt-0.5 text-caption font-medium tracking-normal text-muted normal-case">{item.tag}</span>
        )}
      </div>
    </li>
  );
}

function initials(name: string) {
  if (name.length <= 3) return name.toUpperCase();
  const words = name.split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words.map((w) => w[0]).join("") : name.slice(0, 2);
  return letters.slice(0, 3).toUpperCase();
}

import { Search } from "lucide-react";
import { AuditForm } from "@/components/sections/footer/AuditForm";
import { footer } from "@/lib/content/footer";

// DESIGN.md §6.15. Full container width; xl: one row; md–xl: copy on top, form full width
// below (one row is cramped at 1024); < md: smaller icon, stacked form.
export function AuditBanner() {
  const { audit } = footer;

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-linear-to-r from-surface-strong to-background p-6 md:p-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:py-4 xl:pr-12 xl:pl-8">
      <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-pill bg-primary text-primary-foreground md:size-20"
        >
          <Search className="size-6 md:size-9" strokeWidth={2} />
        </span>
        <div>
          <h2 className="text-h3 text-foreground">{audit.title}</h2>
          <p className="mt-1.5 max-w-xl text-small text-muted">{audit.subtitle}</p>
        </div>
      </div>
      <AuditForm copy={audit} />
    </div>
  );
}

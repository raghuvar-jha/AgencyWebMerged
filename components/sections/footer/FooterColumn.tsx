import Link from "next/link";
import type { NavLink } from "@/lib/content/home";

// DESIGN.md §6.21. A <nav> per column; the heading is an h2 styled small so it doesn't
// compete with page headings. Rows are 44px tall on mobile (touch), tight on md+.
export const footerHeadingClasses = "mb-4 text-body font-bold text-foreground";
export const footerLinkClasses =
  "flex w-fit min-h-11 items-center rounded-sm text-small text-muted underline-offset-4 transition-colors duration-150 hover:text-primary hover:underline md:min-h-0";

export function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className={footerHeadingClasses}>{title}</h2>
      <ul className="md:space-y-1">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={footerLinkClasses}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

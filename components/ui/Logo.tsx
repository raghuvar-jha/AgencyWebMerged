import Link from "next/link";
import { site } from "@/lib/site";

// [PLACEHOLDER] mark: replace with the real logo (public/logo.svg) when available.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 12 15 37l9-19"
        className="stroke-foreground"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m24 18 9 19 9-25"
        className="stroke-primary"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label={`${site.name}, home`}>
      <LogoMark className="size-10 lg:size-12" />
      <span className="text-h4 font-extrabold tracking-tight text-foreground lg:text-title">{site.name}</span>
    </Link>
  );
}

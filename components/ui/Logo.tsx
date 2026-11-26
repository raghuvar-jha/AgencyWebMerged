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

// md: navbar (mark 40→48, wordmark 18→28). sm: footer (mark 40, wordmark 20→24).
const sizes = {
  md: { mark: "size-10 lg:size-12", word: "text-h4 lg:text-title" },
  sm: { mark: "size-10", word: "text-h3" },
};

export function Logo({ size = "md" }: { size?: keyof typeof sizes }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label={`${site.name}, home`}>
      <LogoMark className={sizes[size].mark} />
      <span className={`${sizes[size].word} font-extrabold tracking-tight text-foreground`}>{site.name}</span>
    </Link>
  );
}

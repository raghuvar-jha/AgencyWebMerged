import { cn } from "@/lib/cn";

// Decorative inline SVGs for the hero. All aria-hidden, no images to load.

export function HeroBlobs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 620" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        className="fill-primary/10"
        d="M292 28c62 10 128 54 152 118 25 66-6 118-6 178 0 66 44 122 14 186-28 60-104 92-170 86-70-6-112-58-170-92C46 470-8 426 2 360c10-62 72-88 92-148 22-64-8-128 38-170 40-36 98-24 160-14Z"
      />
      <path
        className="fill-primary/10"
        d="M98 300c-30 44-62 98-42 154 18 50 76 70 126 62 44-8 58-52 96-74 44-26 112-12 136-58 26-48-8-106-52-132-44-26-96-12-142-2-52 10-92 6-122 50Z"
      />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 64" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M2 6c18 22 40 36 62 34 12-1 16-12 8-16-9-4-16 8-8 18 12 15 34 18 58 16"
        className="stroke-foreground"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M20 2c1.2 10.5 7.5 16.8 18 18-10.5 1.2-16.8 7.5-18 18-1.2-10.5-7.5-16.8-18-18 10.5-1.2 16.8-7.5 18-18Z"
        className="stroke-foreground"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

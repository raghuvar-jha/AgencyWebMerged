import Image from "next/image";
import { trustBar } from "@/lib/content/home";

export function TrustBar() {
  return (
    <div className="rounded-xl bg-background/90 px-5 py-8 shadow-card md:px-10">
      <p className="text-center text-body font-medium text-foreground">{trustBar.title}</p>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
        {trustBar.logos.map((logo) => (
          <li key={logo.name} className="flex h-10 items-center justify-center">
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 140}
                height={logo.height ?? 40}
                className="h-8 w-auto opacity-80 grayscale transition duration-150 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="flex h-10 w-full items-center justify-center rounded-sm border border-dashed border-border-strong/60 text-caption tracking-normal text-muted">
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

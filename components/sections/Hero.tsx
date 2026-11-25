import Image from "next/image";
import { ArrowRight, Star, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsApp";
import { HeroBlobs, Sparkle, Squiggle } from "@/components/sections/hero/Decorations";
import { StatCard } from "@/components/sections/hero/StatCard";
import { TrustBar } from "@/components/sections/hero/TrustBar";
import { hero, heroStats } from "@/lib/content/home";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  const { headline, photo, socialProof } = hero;

  return (
    <section
      aria-labelledby="hero-title"
      // Pulled up under the sticky navbar so the gradient shows through it.
      className="relative -mt-16 overflow-hidden bg-linear-to-br from-surface to-surface-strong/70 pt-16 lg:-mt-24 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-site items-center gap-12 px-5 pt-10 md:px-8 lg:grid-cols-2 lg:gap-8 lg:pt-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center rounded-pill border border-border bg-background/60 px-4 py-2.5 text-caption text-primary uppercase">
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-8 text-display text-foreground">
            <span className="block">{headline.lead}</span>
            <span className="block text-primary">{headline.highlight}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-body-lg text-muted lg:mx-0">{hero.description}</p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8 lg:justify-start">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <a
              href={whatsappLink(hero.whatsappCta.message)}
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm text-body font-semibold text-primary transition-colors duration-150 hover:text-primary-hover"
            >
              <WhatsAppIcon className="size-5" />
              {hero.whatsappCta.label}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <ul className="flex -space-x-3" aria-hidden="true">
              {Array.from({ length: socialProof.avatarCount }, (_, i) => (
                <li
                  key={i}
                  className="grid size-12 place-items-center rounded-pill bg-surface-strong text-primary ring-2 ring-background"
                >
                  <UserRound className="size-5" strokeWidth={1.75} />
                </li>
              ))}
            </ul>
            <div className="sm:text-left">
              <div className="flex justify-center gap-0.5 sm:justify-start" role="img" aria-label={socialProof.ratingLabel}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-1 max-w-xs text-small text-muted">{socialProof.text}</p>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <HeroBlobs className="absolute -top-8 -bottom-4 -left-8 hidden w-md lg:block" />
          <Squiggle className="absolute -left-24 top-10 hidden w-28 lg:block" />
          <Sparkle className="absolute right-24 -bottom-14 hidden size-10 lg:block" />

          <div className="relative mx-auto aspect-4/5 w-full max-w-xs lg:mx-0 lg:max-w-sm">
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
                className="object-contain object-bottom"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-surface-strong/60 p-6 text-center">
                <UserRound className="size-16 text-primary/40" strokeWidth={1.25} aria-hidden="true" />
                <p className="max-w-48 text-small text-muted">{photo.placeholder}</p>
              </div>
            )}
          </div>

          <ul className="relative mt-6 grid grid-cols-3 gap-3 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:flex lg:w-60 lg:-translate-y-1/2 lg:flex-col lg:gap-8">
            {heroStats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-site px-5 pt-14 pb-section md:px-8 md:pb-section-lg">
        <TrustBar />
      </div>
    </section>
  );
}

import { RingPattern } from "@/components/decorations/RingPattern";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Stagger } from "@/components/motion/Stagger";
import { Underline } from "@/components/decorations/Underline";
import { ButtonLink } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { stats } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";

// Desktop stagger ("rising steps"), DESIGN.md §6.14. Index = position in stats.items.
// Below lg: plain 2×2 grid. lg: one row of 4. xl+: stagger (at lg it leaves the headline too narrow).
const staggerClasses = [
  "xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:mt-62",
  "xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-26",
  "xl:col-start-3 xl:row-start-1",
  "xl:col-start-3 xl:row-start-2",
];

export function StatsSection() {
  const { title } = stats;

  return (
    <section id="stats" aria-labelledby="stats-title" className="pt-section pb-8">
      <Container>
        <Reveal className="relative overflow-hidden rounded-xl bg-surface px-6 py-10 md:rounded-2xl md:px-12 md:py-16 lg:px-20 lg:py-20">
          <Parallax className="absolute top-1/2 left-3/5 hidden size-175 -translate-x-1/2 -translate-y-1/2 md:block">
            <RingPattern className="size-full" />
          </Parallax>

          <div className="relative flex flex-col gap-12 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
            <div className="xl:max-w-xl">
              <SplitHeading as="h2" id="stats-title" draw className="text-display-sm text-foreground">
                {/* {" "} keeps real spaces between the block lines (accessible name / SplitText aria-label). */}
                <span className="block">{title.line1}</span>{" "}
                <span className="block">{title.line2}</span>{" "}
                <span className="block whitespace-nowrap">
                  {title.line3}
                  <Underline className="ml-4 inline-block w-28 align-middle md:ml-6 md:w-40" />
                </span>
              </SplitHeading>
              <p className="mt-8 max-w-md text-body-lg text-muted">{stats.description}</p>
              <ButtonLink
                href={stats.cta.href}
                size="lg"
                shape="pill"
                trailingIcon="arrow-circle"
                className="mt-10 w-full sm:w-auto"
              >
                {stats.cta.label}
              </ButtonLink>
            </div>

            {/* Staircase order: bottom-left first, top-right last (DOM 1, 2, 4, 3). */}
            <Stagger
              as="ul"
              sequence={[0, 1, 3, 2]}
              stagger={0.1}
              className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:shrink-0 xl:grid-cols-3 xl:grid-rows-[auto_1fr] xl:items-start xl:gap-x-5 xl:gap-y-8"
            >
              {stats.items.map((item, i) => (
                <li key={item.label} className={staggerClasses[i]}>
                  <MetricCard value={item.value} label={item.label} className="xl:h-45 xl:w-44" />
                </li>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

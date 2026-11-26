import { Heart } from "lucide-react";
import { Underline } from "@/components/decorations/Underline";
import { DrawLine } from "@/components/motion/DrawLine";
import { HoverLift } from "@/components/motion/HoverLift";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";
import { featuredProjects, projectsSection } from "@/lib/content/projects";
import { Container } from "@/components/ui/Container";

// DESIGN.md §6.7. Layout:
// < sm   one column (max-w-md, centred). No horizontal scroll row (DESIGN.md §4).
// sm–lg  two columns (4-track grid, cards span 2; a lone last card is centred).
// lg+    four columns (8-track grid, cards span 2; fewer than 4 cards are centred).
// The header uses the same 4-column grid + gap-8 at lg, so the intro starts on the 3rd card column.

// Where the first card starts at lg so 1–3 cards stay centred.
const lgStart: Record<number, string> = { 1: "lg:col-start-4", 2: "lg:col-start-3", 3: "lg:col-start-2" };

export function ProjectsSection() {
  const { eyebrow, title, intro, cta, cardLinkLabel, mockupPlaceholder } = projectsSection;
  const count = featuredProjects.length;

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 py-section md:py-section-lg lg:scroll-mt-24">
      <Container>
        <Reveal as="header" className="flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:items-end lg:gap-8">
          <div className="lg:col-span-2">
            <p className="text-caption text-primary uppercase">{eyebrow}</p>
            <h2 id="work-title" className="mt-2 text-h2 text-foreground">
              {title}
            </h2>
            <DrawLine className="mt-2 block w-28">
              <Underline className="block w-full" />
            </DrawLine>
          </div>
          <p className="max-w-md text-body text-muted lg:col-span-2">
            <span className="block">{intro.line1}</span>
            {intro.line2}{" "}
            <Heart
              role="img"
              aria-label="love"
              className="inline-block size-4 fill-current align-baseline text-primary"
              strokeWidth={2}
            />{" "}
            {intro.line2End}
          </p>
        </Reveal>

        {count > 0 && (
          <Stagger as="ul" y={32} stagger={0.1} className="mx-auto mt-10 grid max-w-md gap-6 sm:max-w-none sm:grid-cols-4 lg:grid-cols-8 lg:gap-8">
            {featuredProjects.map((project, i) => (
              <li
                key={project.slug}
                className={cn(
                  "sm:col-span-2",
                  // Lone last card in the 2-column layout: centre it.
                  count % 2 === 1 && i === count - 1 && "sm:col-start-2 lg:col-start-auto",
                  i === 0 && count < 4 && lgStart[count],
                )}
              >
                <HoverLift className="h-full">
                  <ProjectCard project={project} linkLabel={cardLinkLabel} placeholderLabel={mockupPlaceholder} />
                </HoverLift>
              </li>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href={cta.href} size="sm" shape="pill" trailingIcon="arrow">
            {cta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

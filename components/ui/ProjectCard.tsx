import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Project, ProjectTint } from "@/lib/content/projects";

// Recipe: DESIGN.md §6.7 (project.png). Whole card clickable via a stretched link
// (one tab stop); the focus ring is drawn around the card, not the small link.

const tints: Record<ProjectTint, string> = {
  green: "bg-tint-green",
  pink: "bg-tint-pink",
  yellow: "bg-tint-yellow",
  purple: "bg-tint-purple",
};

type ProjectCardProps = {
  project: Project;
  linkLabel: string;
  placeholderLabel: string;
  className?: string;
};

export function ProjectCard({ project, linkLabel, placeholderLabel, className }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-card",
        "transition duration-200 ease-out-soft hover:shadow-raised motion-safe:hover:-translate-y-1",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary",
        className,
      )}
    >
      <div className={cn("relative aspect-7/4 overflow-hidden", tints[project.tint])}>
        {project.image ? (
          <div data-hover-lift className="absolute inset-x-0 bottom-0 h-9/10">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-bottom"
            />
          </div>
        ) : (
          <MockupPlaceholder label={placeholderLabel} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-small font-medium text-muted">{project.category}</p>
        <h3 id={titleId} className="mt-0.5 text-h4 font-bold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-small text-muted">{project.description}</p>
        <div className="mt-auto pt-3">
          <Link
            href={project.href}
            aria-label={`${linkLabel}: ${project.title}`}
            className="inline-flex items-center gap-1.5 text-small font-bold text-foreground transition-colors duration-150 group-hover:text-primary after:absolute after:inset-0 focus-visible:outline-none"
          >
            {linkLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-150 motion-safe:group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Two overlapping phone outlines until a real mockup image exists. */
function MockupPlaceholder({ label }: { label: string }) {
  return (
    <div data-hover-lift className="absolute inset-0 flex items-center justify-center">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="h-5/6 aspect-1/2 rounded-md border-2 border-foreground/10 bg-background" />
      <span
        aria-hidden="true"
        className="-ml-5 mt-6 h-3/4 aspect-1/2 rounded-md border-2 border-foreground/10 bg-background"
      />
    </div>
  );
}

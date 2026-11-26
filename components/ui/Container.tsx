import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

// The one site container (DESIGN.md §4): 1280px max incl. gutters → 1216px content,
// 20px gutters below md, 32px from md. Sections that must share edges (e.g. the Stats
// panel and the Reviews carousel) both use this, so they line up by construction.
export const containerClasses = "mx-auto w-full max-w-site px-5 md:px-8";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(containerClasses, className)}>{children}</Tag>;
}

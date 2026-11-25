import { CalendarCheck, Rocket, Users, type LucideIcon } from "lucide-react";
import type { Stat, StatIcon } from "@/lib/content/home";

const icons: Record<StatIcon, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  calendar: CalendarCheck,
};

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = icons[stat.icon];
  return (
    <li className="flex flex-col items-center gap-2 rounded-lg bg-background/85 p-3 text-center shadow-card sm:p-4 lg:flex-row lg:gap-4 lg:px-5 lg:py-8 lg:text-left">
      <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-surface-strong text-primary lg:size-14">
        <Icon className="size-5 lg:size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-h4 font-extrabold text-foreground lg:text-title">{stat.value}</span>
        <span className="text-caption font-medium tracking-normal text-muted lg:text-small lg:whitespace-nowrap">{stat.label}</span>
      </span>
    </li>
  );
}

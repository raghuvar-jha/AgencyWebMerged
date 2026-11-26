import { CalendarCheck, Rocket, Users, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import type { Stat, StatIcon } from "@/lib/content/home";

const icons: Record<StatIcon, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  calendar: CalendarCheck,
};

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = icons[stat.icon];
  return (
    <li className="flex flex-col items-center gap-2 rounded-lg bg-background/85 p-3 text-center shadow-card sm:p-4 xl:flex-row xl:gap-4 xl:px-5 xl:py-8 xl:text-left">
      <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-surface-strong text-primary xl:size-14">
        <Icon className="size-5 xl:size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-h4 font-extrabold text-foreground xl:text-title">
          <CountUp value={stat.value} />
        </span>
        <span className="text-caption font-medium tracking-normal text-muted xl:text-small xl:whitespace-nowrap">{stat.label}</span>
      </span>
    </li>
  );
}

"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useSwapStagger } from "@/components/motion/use-swap-stagger";
import { cn } from "@/lib/cn";

// WAI-ARIA tabs (automatic activation, roving tabindex). Recipe: DESIGN.md §6.18.
// Only the switching lives here: tab icons and every panel's content are rendered on the
// server and passed in, and all panels are in the HTML (inactive ones `hidden`).
// Motion: the tab bar fades up (Reveal); switching tabs fades the old cards out and staggers the
// new ones in (useSwapStagger, DESIGN.md → Motion). Reduced motion: instant switch.

export type TechTab = { id: string; label: string; icon: ReactNode; panel: ReactNode };

export function TechTabs({ label, tabs }: { label: string; tabs: TechTab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  // The tab the user last asked for (it becomes `active` after the short fade-out).
  const requested = useRef(0);
  const mounted = useRef(false);
  const { leave, enter } = useSwapStagger();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    enter(panelRefs.current[active]);
  }, [active, enter]);

  function select(index: number) {
    const tab = tabRefs.current[index];
    tab?.focus();
    // Keep the active tab visible when the bar scrolls sideways (mobile).
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
    if (index === requested.current) return;
    requested.current = index;
    leave(panelRefs.current[active], () => setActive(index));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    const current = requested.current;
    const next: Record<string, number> = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  }

  return (
    <div>
      {/* The pill track is the scroller, so its rounded ends stay intact when tabs overflow (mobile). */}
      <Reveal y={16} className="no-scrollbar mx-auto mt-10 w-fit max-w-full overflow-x-auto rounded-pill bg-surface-strong p-1.5">
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex w-max gap-1">
          {tabs.map((tab, i) => {
            const selected = i === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tech-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`tech-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-pill px-5 text-small font-semibold whitespace-nowrap transition-colors duration-150",
                  selected ? "bg-background text-foreground shadow-card" : "text-muted hover:text-foreground",
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          role="tabpanel"
          id={`tech-panel-${tab.id}`}
          aria-labelledby={`tech-tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="mt-10 rounded-lg"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

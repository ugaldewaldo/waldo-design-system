import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// ChartLegendRow — Waldo extension (no shadcn equivalent).
// Source: API-DASHBOARD (four hand-built copies across Overview, Projects,
// Entities).
//
// The horizontal legend under a hand-drawn chart: dot, series name, and its
// share or value. Wraps, so it degrades on narrow cards instead of clipping.
//
//   <ChartLegendRow items={[
//     { name: "Serval AI", color: "hsl(var(--chart-1))", value: "16%" },
//     { name: "Atomicwork", color: "hsl(var(--chart-6))", value: "11%" },
//   ]} />
//
// For Recharts charts built on the DS Chart wrapper, use ChartLegend /
// ChartLegendContent from chart.tsx — that one reads Recharts' payload. This is
// for charts drawn by hand (DayColumnChart, SparkBars, segmented bars).
//
// `onItemHover` reports the hovered index so the chart can dim its other
// series; leave it out for a static legend.
// ─────────────────────────────────────────────────────────────────────────────

export interface ChartLegendItem {
  name: React.ReactNode;
  /** CSS colour for the dot. Pass a DS chart token: `hsl(var(--chart-1))`. */
  color: string;
  /** Share or absolute value. Omit for a name-only legend. */
  value?: React.ReactNode;
}

export interface ChartLegendRowProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChartLegendItem[];
  /** Index of the item to emphasise; the others dim. */
  activeIndex?: number | null;
  onItemHover?: (index: number | null) => void;
}

const ChartLegendRow = React.forwardRef<HTMLDivElement, ChartLegendRowProps>(
  ({ items, activeIndex, onItemHover, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}
      onMouseLeave={onItemHover ? () => onItemHover(null) : undefined}
      {...props}
    >
      {items.map((item, i) => (
        <span
          key={i}
          onMouseEnter={onItemHover ? () => onItemHover(i) : undefined}
          className={cn(
            "flex items-center gap-2 text-xs tracking-[-0.02em] whitespace-nowrap",
            "transition-opacity duration-100",
            activeIndex != null && activeIndex !== i ? "opacity-45" : "opacity-100"
          )}
        >
          <span
            aria-hidden
            className="size-[7px] shrink-0 rounded-full"
            style={{ background: item.color }}
          />
          <span className="text-muted-foreground">{item.name}</span>
          {item.value != null && (
            <span className="tabular-nums text-foreground">{item.value}</span>
          )}
        </span>
      ))}
    </div>
  )
);
ChartLegendRow.displayName = "ChartLegendRow";

export { ChartLegendRow };

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChartTooltipPanel,
  ChartTooltipLabel,
  ChartTooltipRow,
  ChartTooltipRows,
  ChartTooltipTotal,
} from "./chart-tooltip-panel";

// ─────────────────────────────────────────────────────────────────────────────
// DayColumnChart — Waldo extension (no shadcn equivalent).
// Source: API-DASHBOARD "Usage" block (Projects + Entities pages).
//
// One thin capsule per day, stacked by series. At rest the columns are hairline
// capsules at 80% opacity — the shape of the period, not a table of bars. The
// hovered column widens and goes fully opaque, which is what makes a 6px column
// hoverable at all, and brings up the per-series breakdown.
//
//   <DayColumnChart
//     dates={["1 Jul", …]} axisTicks={["1 Jul", "8 Jul", "15 Jul"]}
//     series={[{ name: "IT & Ops Watch", color: "hsl(var(--chart-1))", values: [163, …] }]}
//   />
//
// Prefer a stacked Bar chart when the buckets need labels, gridlines or a
// y-axis. This one is for a dense period at a glance inside a card.
//
// `dates` labels every column and drives the tooltip heading; `axisTicks` is
// the sparser set actually printed under the chart.
// ─────────────────────────────────────────────────────────────────────────────

export interface DayColumnSeries {
  name: string;
  /** CSS colour for this series' segments. Pass a DS chart token: `hsl(var(--chart-1))`. */
  color: string;
  /** One value per entry in `dates`. */
  values: number[];
}

export interface DayColumnChartProps extends React.HTMLAttributes<HTMLDivElement> {
  dates: string[];
  axisTicks: string[];
  series: DayColumnSeries[];
  /** Label for the tooltip's summary row. */
  totalLabel?: string;
  /** Column width at rest, px. */
  barWidth?: number;
  /** Column width while hovered, px — the column grows from `barWidth` to this. */
  activeBarWidth?: number;
  /** Plot height, px (excludes the axis row). */
  height?: number;
}

const DayColumnChart = React.forwardRef<HTMLDivElement, DayColumnChartProps>(
  (
    {
      dates,
      axisTicks,
      series,
      totalLabel = "Total",
      barWidth = 6,
      activeBarWidth = 24,
      height = 140,
      className,
      ...props
    },
    ref
  ) => {
    const [activeDay, setActiveDay] = React.useState<number | null>(null);

    const usedByDay = dates.map((_, d) =>
      series.reduce((sum, s) => sum + (s.values[d] ?? 0), 0)
    );
    const plotMax = Math.max(1, ...usedByDay);
    const n = dates.length;

    // Centre of the hovered column, clamped so the tooltip never clips the card.
    const activeLeft =
      activeDay != null && n > 0
        ? Math.min(88, Math.max(12, ((activeDay + 0.5) / n) * 100))
        : 50;

    return (
      <div ref={ref} className={className} {...props}>
        <div className="relative" style={{ height }}>
          <div
            className="relative flex h-full items-end"
            onMouseLeave={() => setActiveDay(null)}
            role="img"
            aria-label="Usage by day"
          >
            {dates.map((date, d) => {
              const used = usedByDay[d];
              const isActive = d === activeDay;
              return (
                <div
                  key={date}
                  className="relative flex h-full flex-1 items-end justify-center"
                  onMouseEnter={() => setActiveDay(d)}
                >
                  <div
                    className={cn(
                      "flex flex-col-reverse overflow-hidden transition-[width,opacity] duration-100",
                      // Hairline columns read as capsules; the widened hover state
                      // drops to a soft radius so it stays a column, not a pill.
                      isActive ? "rounded-md opacity-100" : "rounded-full opacity-80"
                    )}
                    style={{
                      width: isActive ? activeBarWidth : barWidth,
                      height: `${(used / plotMax) * 100}%`,
                      // Inset hairline in the page surface colour: gives the capsule a
                      // crisp edge and tames the irradiation bloom that makes bright
                      // thin bars read as wider than they are. Tracks the theme, so it
                      // darkens the edge on dark and lightens it on light.
                      boxShadow: "inset 0 0 0 0.5px rgb(var(--background) / 0.45)",
                    }}
                  >
                    {series.map((s) => {
                      const v = s.values[d] ?? 0;
                      if (v <= 0) return null;
                      return (
                        <div
                          key={s.name}
                          style={{ height: `${(v / used) * 100}%`, background: s.color }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {activeDay != null && (
            <div
              className="pointer-events-none absolute top-0 z-20 -translate-x-1/2 -translate-y-[calc(100%+10px)]"
              style={{ left: `${activeLeft}%` }}
            >
              <ChartTooltipPanel width={210}>
                <ChartTooltipLabel>{dates[activeDay]}</ChartTooltipLabel>
                <ChartTooltipRows>
                  {series.map((s) => {
                    const v = s.values[activeDay] ?? 0;
                    if (v <= 0) return null;
                    return (
                      <ChartTooltipRow key={s.name} dot={s.color} label={s.name} value={v} />
                    );
                  })}
                </ChartTooltipRows>
                <ChartTooltipTotal label={totalLabel} value={usedByDay[activeDay]} />
              </ChartTooltipPanel>
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-between text-xs tracking-[-0.02em] text-muted-foreground">
          {axisTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    );
  }
);
DayColumnChart.displayName = "DayColumnChart";

export { DayColumnChart };

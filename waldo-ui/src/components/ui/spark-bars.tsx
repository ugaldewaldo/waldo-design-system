import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChartTooltipPanel,
  ChartTooltipRow,
  ChartTooltipRows,
  ChartTooltipCaption,
} from "./chart-tooltip-panel";

// ─────────────────────────────────────────────────────────────────────────────
// SparkBars — Waldo extension (no shadcn equivalent).
// Figma: API-DASHBOARD node 6:2003 "Activity"
//
// Recent activity as 2px bars, one per time bucket, with failures stacked on
// top of each bar. Reads as volume first and health second: a wall of even
// teal is fine, red caps are not. Use it inside a card next to the numbers it
// summarizes.
//
//   <SparkBars data={[{ v: 0.4 }, { v: 0.8, e: 0.1 }, …]} />
//
// Prefer the Sparkline chart for a single trajectory with no failure dimension,
// and a real Bar chart when the buckets need axes or labels.
//
// Values are 0–1 fractions of the available height, not absolute counts — the
// caller normalizes, so the component never has to know the scale.
// ─────────────────────────────────────────────────────────────────────────────

export type SparkBarsTone = "2xx" | "3xx" | "4xx" | "5xx";

export interface SparkBarsTipCode {
  label: string;
  value: number;
  tone: SparkBarsTone;
}

export interface SparkBarsTip {
  codes: SparkBarsTipCode[];
  /** Local time range of the bucket, e.g. "8:35am – 8:40am". */
  timeLocal?: string;
  /** Same range in UTC, e.g. "1:35am – 1:40am UTC". */
  timeUtc?: string;
}

export interface SparkBarsDatum {
  /** Bar height, 0–1 of the available height. */
  v: number;
  /** Error segment, 0–1, stacked above the bar. */
  e?: number;
  /** Warning segment, 0–1, stacked above the error segment. */
  w?: number;
  /** Hover breakdown. Bars without a tip do not respond to hover. */
  tip?: SparkBarsTip;
}

export interface SparkBarsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: SparkBarsDatum[];
  /** Total height in px. */
  height?: number;
  /** Floor for near-zero buckets, so an empty bucket still shows a tick. */
  minBarHeight?: number;
  /** Draw the baseline rule under the bars. */
  baseline?: boolean;
}

const TONE_DOT: Record<SparkBarsTone, string> = {
  "2xx": "hsl(var(--chart-1))",
  "3xx": "hsl(var(--chart-2))",
  "4xx": "rgb(var(--warning))",
  "5xx": "rgb(var(--destructive))",
};

const SparkBars = React.forwardRef<HTMLDivElement, SparkBarsProps>(
  (
    { data, height = 56, minBarHeight = 6, baseline = true, className, ...props },
    ref
  ) => {
    const [active, setActive] = React.useState<number | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const hasTips = data.some((d) => d.tip);
    const n = data.length;

    // Nearest-bar hit testing on the whole track: the bars are 2px wide, far
    // too thin to hover individually.
    const pickIndex = (clientX: number) => {
      const el = trackRef.current;
      if (!el || n === 0) return null;
      const rect = el.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return Math.min(n - 1, Math.max(0, Math.round(ratio * (n - 1))));
    };

    const activeTip = active != null ? data[active]?.tip : undefined;
    const activeLeft = active != null && n > 1 ? (active / (n - 1)) * 100 : 50;

    return (
      <div className="relative min-w-0 flex-1" style={{ height }}>
        <div
          ref={(node) => {
            trackRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cn(
            "flex h-full w-full items-end justify-between gap-[10px] overflow-hidden",
            baseline && "border-b border-border/[0.12]",
            className
          )}
          role="img"
          aria-label="Activity chart"
          onMouseMove={hasTips ? (e) => setActive(pickIndex(e.clientX)) : undefined}
          onMouseLeave={hasTips ? () => setActive(null) : undefined}
          {...props}
        >
          {data.map((d, i) => {
            const barH = Math.max(minBarHeight, d.v * height);
            const errH = (d.e ?? 0) * height;
            const warnH = (d.w ?? 0) * height;
            return (
              <div key={i} className="flex w-[2px] shrink-0 flex-col items-stretch gap-[2px]">
                {warnH > 0 && (
                  <div className="rounded-full bg-warning" style={{ height: warnH }} />
                )}
                {errH > 0 && (
                  <div className="rounded-full bg-destructive" style={{ height: errH }} />
                )}
                <div
                  className={cn(
                    "rounded-full transition-colors duration-75",
                    i === active ? "bg-primary" : "bg-primary/55"
                  )}
                  style={{ height: barH }}
                />
              </div>
            );
          })}
        </div>

        {activeTip && (
          <div
            className="pointer-events-none absolute bottom-full z-20 mb-2 -translate-x-1/2"
            style={{ left: `${activeLeft}%` }}
          >
            <ChartTooltipPanel width={200}>
              <ChartTooltipRows>
                {activeTip.codes.map((c) => (
                  <ChartTooltipRow
                    key={c.label}
                    dot={TONE_DOT[c.tone]}
                    label={c.label}
                    value={c.value}
                  />
                ))}
              </ChartTooltipRows>
              {activeTip.timeLocal && (
                <ChartTooltipCaption secondary={activeTip.timeUtc}>
                  {activeTip.timeLocal}
                </ChartTooltipCaption>
              )}
            </ChartTooltipPanel>
          </div>
        )}
      </div>
    );
  }
);
SparkBars.displayName = "SparkBars";

export { SparkBars };

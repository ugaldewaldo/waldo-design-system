import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// ChartTooltipPanel — Waldo extension (no shadcn equivalent).
//
// The floating panel every hand-rolled hover chart needs. Purely presentational:
// it does not position itself and it does not know about Recharts. Give it a
// positioned wrapper and it renders the panel; the chart owns the hover math.
//
// Why it exists: the API Dashboard grew four separately-styled copies of this
// same panel (day-column chart, spark bars, share bar, and a custom Recharts
// tooltip). Charts compose this instead of restyling a popover each time.
//
//   <ChartTooltipPanel>
//     <ChartTooltipLabel>10 Jul</ChartTooltipLabel>
//     <ChartTooltipRows>
//       <ChartTooltipRow dot="var(--chart-1)" label="IT & Ops Watch" value={163} />
//       <ChartTooltipRow dot="var(--chart-6)" label="My Project" value={70} />
//     </ChartTooltipRows>
//     <ChartTooltipTotal label="Total requests" value={233} />
//   </ChartTooltipPanel>
//
// For Recharts charts built on the DS Chart wrapper, use ChartTooltipContent
// from chart.tsx instead — that one is shadcn's and speaks Recharts' payload
// shape. This is for charts drawn by hand.
// ─────────────────────────────────────────────────────────────────────────────

export interface ChartTooltipPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed panel width in px. Omit to size to content (single-row tooltips). */
  width?: number;
}

const ChartTooltipPanel = React.forwardRef<HTMLDivElement, ChartTooltipPanelProps>(
  ({ width, className, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="chart-tooltip-panel"
      role="tooltip"
      className={cn(
        "rounded-xl border border-border/[0.12] bg-popover/95 px-3.5 py-3",
        "shadow-popover backdrop-blur-md",
        className
      )}
      style={{ width, ...style }}
      {...props}
    />
  )
);
ChartTooltipPanel.displayName = "ChartTooltipPanel";

/** Heading of the panel — the category the hovered mark belongs to (a date, a bucket). */
const ChartTooltipLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-2.5 text-sm font-medium tracking-[-0.02em] text-foreground", className)}
      {...props}
    />
  )
);
ChartTooltipLabel.displayName = "ChartTooltipLabel";

/** Vertical stack for the series rows. */
const ChartTooltipRows = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
);
ChartTooltipRows.displayName = "ChartTooltipRows";

export interface ChartTooltipRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Series name. */
  label: React.ReactNode;
  /** Series value — rendered tabular so columns of numbers line up. */
  value: React.ReactNode;
  /**
   * Colour of the leading dot, as a CSS colour. Pass a DS token —
   * `var(--chart-1)`, `hsl(var(--chart-1))`, `var(--destructive)`. Omit for no dot.
   */
  dot?: string;
}

/** One series row: dot + name on the left, value on the right. */
const ChartTooltipRow = React.forwardRef<HTMLDivElement, ChartTooltipRowProps>(
  ({ label, value, dot, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-4 text-sm", className)}
      {...props}
    >
      <span className="flex items-center gap-2.5 whitespace-nowrap text-foreground/70">
        {dot && (
          <span
            aria-hidden
            className="size-[7px] shrink-0 rounded-full"
            style={{ background: dot }}
          />
        )}
        {label}
      </span>
      <span className="font-medium tabular-nums text-foreground">{value}</span>
    </div>
  )
);
ChartTooltipRow.displayName = "ChartTooltipRow";

export interface ChartTooltipTotalProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
}

/** Summary row below a divider — the total across the series above. */
const ChartTooltipTotal = React.forwardRef<HTMLDivElement, ChartTooltipTotalProps>(
  ({ label, value, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-2.5 flex items-center justify-between gap-4 border-t border-border/[0.1] pt-2.5 text-sm",
        className
      )}
      {...props}
    >
      <span className="text-foreground/55">{label}</span>
      <span className="font-medium tabular-nums text-foreground">{value}</span>
    </div>
  )
);
ChartTooltipTotal.displayName = "ChartTooltipTotal";

/** Centred caption under the rows — used for the time range a bucket covers. */
const ChartTooltipCaption = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { secondary?: React.ReactNode }
>(({ className, children, secondary, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2.5 flex flex-col items-center gap-0.5 text-center", className)}
    {...props}
  >
    <span className="text-sm tabular-nums text-foreground/55">{children}</span>
    {secondary && (
      <span className="text-xs tabular-nums text-foreground/35">{secondary}</span>
    )}
  </div>
));
ChartTooltipCaption.displayName = "ChartTooltipCaption";

export {
  ChartTooltipPanel,
  ChartTooltipLabel,
  ChartTooltipRows,
  ChartTooltipRow,
  ChartTooltipTotal,
  ChartTooltipCaption,
};

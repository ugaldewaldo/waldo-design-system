import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// KPI Stat Card — Brand API component
// 4-up grid of summary metrics.
// delta: up = destructive (more discounting = pressure), down = primary (relief)

export type KpiDelta = {
  direction: "up" | "down";
  label: string;
};

export interface KpiStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  /** Supports plain strings or inline colored spans (e.g. <span className="text-destructive">▲ +4pp</span>) */
  sub?: React.ReactNode;
  delta?: KpiDelta;
}

const KpiStatCard = React.forwardRef<HTMLDivElement, KpiStatCardProps>(
  ({ label, value, sub, delta, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-card rounded-xl p-6 flex flex-col gap-2",
          className
        )}
        {...props}
      >
        {delta && (
          <Badge
            className={cn(
              "absolute top-4 right-4 border-none",
              delta.direction === "up"
                ? "bg-destructive/[0.12] text-destructive"
                : "bg-primary/[0.12] text-primary"
            )}
          >
            {delta.label}
          </Badge>
        )}
        <div className="text-sm font-medium leading-5 tracking-[-0.02em] text-muted-foreground">
          {label}
        </div>
        <div className="text-fs-4xl font-semibold leading-9 tracking-[-0.02em]">
          {value}
        </div>
        {sub && (
          <div className="text-xs leading-4 tracking-[-0.015em] text-muted-foreground">
            {sub}
          </div>
        )}
      </div>
    );
  }
);
KpiStatCard.displayName = "KpiStatCard";

// KpiGrid — convenience wrapper for 4-up layout
export const KpiGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3.5", className)}
    {...props}
  >
    {children}
  </div>
));
KpiGrid.displayName = "KpiGrid";

export { KpiStatCard };

import * as React from "react";
import { cn } from "@/lib/utils";

// Live Status Badge — Brand API component
// Indicates whether a brand is currently discounting.
// active: warning color + static dot
// inactive: muted, no dot

export interface LiveBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  label?: string;
}

const LiveBadge = React.forwardRef<HTMLSpanElement, LiveBadgeProps>(
  ({ active = false, label, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap tracking-[-0.015em]",
          active
            ? "bg-warning/10 text-warning"
            : "bg-secondary text-muted-foreground",
          className
        )}
        {...props}
      >
        {active && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-warning shrink-0"
            aria-hidden
          />
        )}
        {label ?? (active ? "Discounting now" : "No active discount")}
      </span>
    );
  }
);
LiveBadge.displayName = "LiveBadge";

export { LiveBadge };

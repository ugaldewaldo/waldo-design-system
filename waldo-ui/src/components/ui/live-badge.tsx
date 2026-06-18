import * as React from "react";
import { cn } from "@/lib/utils";

// Live Status Badge — Brand API component
// Indicates whether a brand is currently discounting.
// active: destructive color + animated pulse dot
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
            ? "bg-destructive/10 text-destructive"
            : "bg-secondary text-muted-foreground",
          className
        )}
        {...props}
      >
        {active && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 motion-safe:animate-live-pulse"
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

// Tailwind config must include:
// theme.extend.keyframes['live-pulse'] = { '0%,100%':{ opacity:'1', transform:'scale(1)' }, '50%':{ opacity:'0.5', transform:'scale(1.4)' } }
// theme.extend.animation['live-pulse'] = 'live-pulse 1.4s ease-in-out infinite'
// prefers-reduced-motion handled via motion-safe: — dot renders static when reduced

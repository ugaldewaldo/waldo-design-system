import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DepthPill } from "@/components/ui/depth-pill";

// Leaderboard Row — Brand API component
// Ranked list of brands: rank number + name/meta + depth pill.

export interface LeaderboardRowData {
  rank: number;
  name: string;
  type: string;
  offer: string;
  category: string;
  depth: number;
}

export interface LeaderboardRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: LeaderboardRowData;
  isLast?: boolean;
}

const LeaderboardRow = React.forwardRef<HTMLDivElement, LeaderboardRowProps>(
  ({ item, isLast, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3.5 items-start px-2 py-3 cursor-pointer rounded-lg transition-colors hover:bg-secondary",
          className
        )}
        {...props}
      >
        <div className="w-6 shrink-0 text-lg font-semibold leading-7 tracking-[-0.02em] text-center text-foreground">
          {item.rank}
        </div>
        <div
          className={cn(
            "flex-1 min-w-0 flex flex-col gap-[3px] pb-3",
            !isLast && "border-b border-border"
          )}
        >
          <div className="flex gap-2.5 items-center w-full">
            <span className="flex-1 min-w-0 text-sm font-semibold leading-5 tracking-[-0.02em] truncate">
              {item.name}
            </span>
            <Badge variant="secondary">{item.type}</Badge>
            <DepthPill depth={item.depth} maxDepth={70} label={`${item.depth}%`} />
          </div>
          <div className="flex gap-2 items-center overflow-hidden">
            <span className="text-xs leading-4 tracking-[-0.015em] text-muted-foreground shrink-0">
              {item.offer}
            </span>
            <span className="text-label leading-4 tracking-[-0.014em] text-muted-foreground/60 truncate min-w-0">
              · {item.category}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
LeaderboardRow.displayName = "LeaderboardRow";

// Leaderboard — wrapper list
export const Leaderboard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props}>
    {children}
  </div>
));
Leaderboard.displayName = "Leaderboard";

export { LeaderboardRow };

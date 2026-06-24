import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Ad Copy Card — Brand API component
// Quote card with amber-highlighted discount text, source meta, and detection badge.
// Card bg is var(--background) (#171819, zinc-950) — darker than var(--card) for visual nesting.

export interface AdCopyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quote segments: alternate plain text and highlighted text.
   * E.g. [{ text: "Last chance: ", highlight: false }, { text: "up to 60%", highlight: true }, ...]
   */
  segments: Array<{ text: string; highlight?: boolean }>;
  /** Source metadata, e.g. "meta · CTA: Shop Final Sale" */
  meta?: string;
  /** Badge label — defaults to "Detected in ad copy" */
  badgeLabel?: string;
}

const AdCopyCard = React.forwardRef<HTMLDivElement, AdCopyCardProps>(
  ({ segments, meta, badgeLabel = "Detected in ad copy", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 min-w-0 rounded-xl p-4 flex flex-col gap-5",
          className
        )}
        style={{ background: "var(--background)" }}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <p className="text-lg font-normal leading-7 tracking-[-0.02em] text-foreground">
            &ldquo;
            {segments.map((seg, i) =>
              seg.highlight ? (
                <span key={i} style={{ color: "var(--highlight)" }}>
                  {seg.text}
                </span>
              ) : (
                <React.Fragment key={i}>{seg.text}</React.Fragment>
              )
            )}
            &rdquo;
          </p>
          {meta && (
            <p className="text-sm leading-5 tracking-[-0.02em] text-muted-foreground">
              {meta}
            </p>
          )}
        </div>
        <Badge variant="secondary" className="self-start">
          {badgeLabel}
        </Badge>
      </div>
    );
  }
);
AdCopyCard.displayName = "AdCopyCard";

// AdCopyGrid — side-by-side pair wrapper
export const AdCopyGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-4 w-full", className)} {...props}>
    {children}
  </div>
));
AdCopyGrid.displayName = "AdCopyGrid";

export { AdCopyCard };

import * as React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Alert List Row — Brand API component
// Active user alerts: condition label + delivery address.
// Teal dot = active. Trash icon destructive on hover.

export interface AlertListRowData {
  /** Bold part of the condition label */
  conditionMain: string;
  /** Muted part of the condition label */
  conditionDetail: string;
  /** Email or phone delivery address */
  delivery: string;
}

export interface AlertListRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: AlertListRowData;
  onDelete?: () => void;
  isLast?: boolean;
}

const AlertListRow = React.forwardRef<HTMLDivElement, AlertListRowProps>(
  ({ item, onDelete, isLast, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2.5 items-start px-0 py-2.5 min-h-10 cursor-default rounded-lg transition-colors hover:bg-secondary hover:px-2",
          !isLast && "border-b border-border",
          className
        )}
        {...props}
      >
        {/* Active dot */}
        <div className="w-2 shrink-0 flex items-center justify-center pt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-sm leading-5 tracking-[-0.02em]">
            <span className="text-foreground">{item.conditionMain}</span>
            <span className="text-muted-foreground">{item.conditionDetail}</span>
          </div>
          <div className="text-sm leading-5 tracking-[-0.02em] text-muted-foreground/60">
            {item.delivery}
          </div>
        </div>

        {/* Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete alert"
            className={cn(
              "h-4 w-4 shrink-0 mt-0.5 text-muted-foreground/40",
              "hover:text-destructive hover:opacity-100 transition-colors cursor-pointer"
            )}
          >
            <Trash2 className="h-full w-full" strokeWidth={1.5} />
          </button>
        )}
      </div>
    );
  }
);
AlertListRow.displayName = "AlertListRow";

// AlertList — wrapper
export const AlertList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props}>
    {children}
  </div>
));
AlertList.displayName = "AlertList";

export { AlertListRow };

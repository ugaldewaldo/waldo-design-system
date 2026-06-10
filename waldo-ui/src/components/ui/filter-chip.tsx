import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// FilterChip — the pill control for filter bars.
//
// One component for both filter shapes that sit in the same row, so they stay
// consistent with each other and with the DS Button language:
//   • on/off    — <FilterChip icon={<Star/>} active={fav} onClick={toggle}>Favourites</FilterChip>
//   • dropdown  — <PopoverTrigger asChild>
//                   <FilterChip icon={<Tag/>} active={!!sel} showChevron>{sel?.name ?? "Label"}</FilterChip>
//                 </PopoverTrigger>
//
// Pill, bordered, subtle hover; `active` applies the selected/pressed look.
// Plain <button> + ref + prop spread so it composes under PopoverTrigger asChild.
// ─────────────────────────────────────────────────────────────────────────────

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon (sized to 16px automatically) */
  icon?: React.ReactNode;
  /** Selected / pressed — applies the active styling */
  active?: boolean;
  /** Trailing chevron — for dropdown-style filters */
  showChevron?: boolean;
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, icon, active, showChevron, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-active={active || undefined}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border pl-3",
        showChevron ? "pr-2" : "pr-4",
        "text-sm font-medium tracking-[-0.02em] whitespace-nowrap select-none",
        "border-foreground/[0.12] bg-transparent text-foreground/70",
        "data-[active]:text-foreground",
        "transition-colors duration-100 cursor-pointer",
        "hover:bg-foreground/[0.04]",
        "active:bg-foreground/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40",
        "data-[active]:bg-foreground/10 data-[active]:border-transparent",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground/40",
        "data-[active]:[&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon}
      {children}
      {showChevron && (
        <ChevronDown className="!size-3.5 text-muted-foreground" />
      )}
    </button>
  )
);
FilterChip.displayName = "FilterChip";

export { FilterChip };

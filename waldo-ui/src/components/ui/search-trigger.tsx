import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Kbd } from "./kbd";

// ─────────────────────────────────────────────────────────────────────────────
// SearchTrigger — Waldo extension (no shadcn equivalent).
// Figma: API-DASHBOARD node 25:675 "search-trigger"
//
// The pill in a top bar that opens the command palette. It looks like an input
// but it is a button — typing happens inside the Command dialog, not here, so
// a real input would trap focus and duplicate the palette's own field.
//
//   <SearchTrigger onClick={() => setOpen(true)} />
//   <Dialog open={open} …><Command …/></Dialog>
//
// Prefer Input for real single-field search that filters in place, and
// FilterTrigger for a bare label + chevron that opens a filter dropdown.
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  /** Shortcut hint, rendered in a Kbd. Pass null to hide it. */
  shortcut?: React.ReactNode;
}

const SearchTrigger = React.forwardRef<HTMLButtonElement, SearchTriggerProps>(
  ({ placeholder = "Search...", shortcut = "⌘K", className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-9 w-36 items-center gap-2 rounded-full border border-border/[0.12] bg-background px-3.5",
        "cursor-pointer select-none transition-colors duration-100",
        "hover:border-border/[0.25]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <Search className="size-3.5 shrink-0 text-foreground/60" />
      <span className="flex-1 truncate text-left text-sm tracking-[-0.02em] text-foreground/60">
        {placeholder}
      </span>
      {shortcut != null && <Kbd className="shrink-0 bg-transparent">{shortcut}</Kbd>}
    </button>
  )
);
SearchTrigger.displayName = "SearchTrigger";

export { SearchTrigger };

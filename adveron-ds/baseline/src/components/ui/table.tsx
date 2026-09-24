import * as React from "react";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/table.tsx) — same lineage as
// the other primitives here: the registry is served over HTTP by the DS package,
// so consumers keep a copy in-tree rather than importing a runtime dependency.
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing.

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Sticky header — thead stays fixed on scroll. */
  stickyHeader?: boolean;
  /** Max height for the scroll container when stickyHeader is true. If omitted, the page controls scrolling. */
  maxHeight?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, stickyHeader, maxHeight, ...props }, ref): React.ReactElement => (
    <div
      className={cn(
        // `relative` so an absolutely positioned descendant — a `sr-only` header
        // cell — is contained by this clip instead of the page, where it would
        // widen the document past a narrow viewport by the table's overflow.
        "relative w-full",
        // Page-level sticky needs NO scroll container on the root (overflow-x-auto
        // would force overflow-y to compute to auto and trap the sticky thead).
        // Only clip when not sticky (wide tables) or sticky+bounded (own scroller).
        !stickyHeader && "overflow-x-auto",
        stickyHeader && maxHeight && "overflow-auto",
      )}
      style={stickyHeader && maxHeight ? { maxHeight } : undefined}
    >
      <table
        ref={ref}
        className={cn("w-full caption-bottom border-collapse text-sm", className)}
        data-sticky={stickyHeader || undefined}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref): React.ReactElement => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-foreground/[0.08]",
      "[table[data-sticky]_&]:sticky [table[data-sticky]_&]:top-0 [table[data-sticky]_&]:z-10",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref): React.ReactElement => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref): React.ReactElement => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        "border-b border-foreground/[0.07] transition-colors duration-100",
        "hover:bg-foreground/[0.04]",
        "data-[selected]:bg-primary/[0.06]",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref): React.ReactElement => (
  <th
    ref={ref}
    className={cn(
      "h-8 px-3 text-left align-middle",
      "text-xs font-medium uppercase tracking-wider text-muted-foreground",
      "whitespace-nowrap",
      "[table[data-sticky]_&]:bg-muted",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref): React.ReactElement => (
  <td
    ref={ref}
    className={cn("px-3 py-2 align-middle text-sm text-foreground", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };

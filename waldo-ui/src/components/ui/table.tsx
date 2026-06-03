import * as React from "react";
import { cn } from "@/lib/utils";

// ── Root ──────────────────────────────────────────────────────────────────────

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm border-collapse", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

// ── Header ────────────────────────────────────────────────────────────────────

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b border-foreground/[0.08]", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// ── Body ──────────────────────────────────────────────────────────────────────

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// ── Footer ────────────────────────────────────────────────────────────────────

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-foreground/[0.08] bg-secondary/50 font-medium", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ── Row ───────────────────────────────────────────────────────────────────────

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        "border-b border-foreground/[0.06] transition-colors duration-100",
        "hover:bg-foreground/[0.04]",
        "data-[selected]:bg-primary/[0.06]",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// ── Head (th) ─────────────────────────────────────────────────────────────────

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | false;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, children, onClick, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-8 px-3 text-left align-middle",
        "text-[11px] font-medium text-foreground/50 uppercase tracking-wider",
        "whitespace-nowrap",
        sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
        className
      )}
      onClick={sortable ? onClick : undefined}
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-muted-foreground/60">
            {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

// ── Cell (td) ─────────────────────────────────────────────────────────────────

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-3 py-2 align-middle text-sm text-foreground", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// ── Caption ───────────────────────────────────────────────────────────────────

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

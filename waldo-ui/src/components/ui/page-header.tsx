import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PageHeader — Waldo extension (no shadcn equivalent).
// Source: API-DASHBOARD PageShell.
//
// The top of a console page: title, optional scope suffix, optional subtitle,
// and actions pinned right. Exists because every prototype was re-inventing
// this block with slightly different type sizes and gaps.
//
//   <PageHeader
//     title="Activity"
//     scope="IT & Ops Watch"
//     subtitle="Every request, with its latency and status."
//     actions={<Button>Export</Button>}
//   />
//
// `scope` is a label, not a control — it disambiguates twin pages (a project's
// Usage vs the organization's) without adding another way to navigate. Leave it
// out when the surrounding chrome already names the scope.
// ─────────────────────────────────────────────────────────────────────────────

// `title` is omitted from the DOM attributes: HTMLAttributes types it as a
// string (the tooltip attribute), and here it is the page's heading node.
export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  /** Muted suffix beside the title — the scope this page is showing. */
  scope?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned actions. */
  actions?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, scope, subtitle, actions, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-6", className)}
      {...props}
    >
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-medium tracking-[-0.02em] text-foreground">
          {title}
          {scope && <span className="text-muted-foreground/50">{scope}</span>}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm tracking-[-0.02em] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3 pt-1">{actions}</div>}
    </div>
  )
);
PageHeader.displayName = "PageHeader";

export { PageHeader };

import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// KvPill — Waldo extension (no shadcn equivalent).
// Source: API-DASHBOARD RowDetail (expanded log row).
//
// A label and its value on one baseline, in a pill: "Status: 200", "Region:
// us-east-1", "Latency: 142ms". For metadata that is read, not acted on — a
// row of these under an expanded record beats a two-column table when the
// values are short.
//
//   <KvPill label="Status" value="200" />
//   <KvPill label="Request" value={<span className="font-mono">req_8fa2…</span>} />
//
// Prefer Badge for a status with its own colour semantics, Tag when the pill is
// removable, and a real table when the values are long or need alignment across
// rows.
// ─────────────────────────────────────────────────────────────────────────────

export interface KvPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  value: React.ReactNode;
}

const KvPill = React.forwardRef<HTMLSpanElement, KvPillProps>(
  ({ label, value, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-baseline gap-1.5 rounded-full bg-foreground/[0.05] px-3 py-1",
        "text-xs tracking-[-0.02em] whitespace-nowrap",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground">{value}</span>
    </span>
  )
);
KvPill.displayName = "KvPill";

export { KvPill };

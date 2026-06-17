import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo NavItem — Figma DS node 83995-111644
//
// Used in: settings panels, sidebar navigation, filter panels, report builder.
// Height 36px · icon 14px right · active = bg-muted + font-medium
//
// Variants:
//   default       → label [+ trailing icon]
//   with-badge    → count badge left + label
//   collapsible   → label + chevron (expand/collapse)
//   sub-item      → indented 16px
//   section       → ALL CAPS header, not interactive
//
// Usage:
//   <NavItem label="Management" active icon={<TableIcon />} />
//   <NavItem label="Data sources" collapsible expanded onToggle={fn} />
//   <NavSection label="Settings" />
// ─────────────────────────────────────────────────────────────────────────────

// ── NavSection — group header ─────────────────────────────────────────────────

interface NavSectionProps {
  label: string;
  className?: string;
}

export function NavSection({ label, className }: NavSectionProps) {
  return (
    <div
      className={cn(
        "px-6 pb-3 pt-2",
        "text-xs font-medium uppercase tracking-[-0.02em]",
        "text-foreground/30 select-none",
        className
      )}
    >
      {label}
    </div>
  );
}

// ── NavSeparator ──────────────────────────────────────────────────────────────

export function NavSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-foreground/[0.07]", className)} />;
}

// ── NavItem ───────────────────────────────────────────────────────────────────

export interface NavItemProps {
  /** Primary label */
  label: string;
  /** Active / selected state */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Indented sub-item (adds left padding) */
  sub?: boolean;
  /** Trailing icon (right side, 14px) */
  icon?: React.ReactNode;
  /** Count badge (left of label, teal) */
  count?: number | string;
  /** Action button shown on hover (right side) */
  action?: React.ReactNode;
  /** Collapsible — shows chevron */
  collapsible?: boolean;
  /** Expanded state (when collapsible) */
  expanded?: boolean;
  /** Toggle handler (when collapsible) */
  onToggle?: () => void;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function NavItem({
  label,
  active,
  disabled,
  sub,
  icon,
  count,
  action,
  collapsible,
  expanded,
  onToggle,
  onClick,
  className,
  children,
}: NavItemProps) {
  const handleClick = () => {
    if (disabled) return;
    if (collapsible) onToggle?.();
    else onClick?.();
  };

  return (
    <>
      <div
        role={collapsible ? "button" : onClick ? "button" : undefined}
        aria-expanded={collapsible ? expanded : undefined}
        onClick={handleClick}
        className={cn(
          "group relative flex h-9 items-center gap-1.5",
          "rounded-full px-4",
          "text-sm tracking-[-0.02em]",
          "transition-colors duration-100 select-none",
          sub ? "pl-8" : "",
          active
            ? "bg-muted text-foreground font-medium"
            : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
          disabled && "opacity-40 pointer-events-none",
          (collapsible || onClick) && "cursor-pointer",
          className
        )}
      >
        {/* Label */}
        <span className="flex-1 truncate">{label}</span>

        {/* Count badge — right */}
        {count !== undefined && (
          <span className="min-w-[18px] text-center text-[11px] font-medium text-primary shrink-0">
            {count}
          </span>
        )}

        {/* Action — visible on hover */}
        {action && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {action}
          </span>
        )}

        {/* Trailing icon OR chevron */}
        {collapsible ? (
          <span className="shrink-0 text-muted-foreground">
            {expanded
              ? <ChevronDown className="h-3.5 w-3.5" />
              : <ChevronRight className="h-3.5 w-3.5" />
            }
          </span>
        ) : icon ? (
          <span className="shrink-0 text-muted-foreground">{icon}</span>
        ) : null}
      </div>

      {/* Sub-items slot (when collapsible + expanded) */}
      {collapsible && expanded && children && (
        <div>{children}</div>
      )}
    </>
  );
}

// ── NavGroup — container with optional title + items ──────────────────────────

interface NavGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function NavGroup({ label, children, className }: NavGroupProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && <NavSection label={label} />}
      {children}
    </div>
  );
}

// ── NavPanel — scrollable container ──────────────────────────────────────────

interface NavPanelProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
}

export function NavPanel({ children, className, width = "w-[288px]" }: NavPanelProps) {
  return (
    <nav
      className={cn(
        "flex flex-col h-full overflow-y-auto",
        "bg-popover py-2 rounded-3xl",
        width,
        className
      )}
    >
      {children}
    </nav>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo ListItem — values from Figma DS (node 62783:68372, ROWS / BORDER)
//
// Height    → 56px
// Padding   → px-4
// Border    → border-b rgba(210,211,211,0.12) (bottom only)
// Hover bg  → zinc-800 #27282b
// Avatar    → 24px · round for people · square (4px) for brands
// Label     → zinc-200/100% · text-sm-normal
// Sublabel  → zinc-200/50%
//
// Variants seen in Figma:
//   MASTER        → avatar + label + sublabel + dropdown + toggle + actions
//   PRODUCT       → brand avatar (square) + label + actions
//   MEMBERS       → person avatar (round) + name + email + toggle
//   SEARCH        → search icon + placeholder + bulk actions
//   ACATARTEXT    → brand avatar + text + toggle
//   TEXT          → brand avatar + text + icon + toggle
//
// Code approach: composable — pass avatar, label, sublabel, actions as props
// instead of hardcoding the 7 variants. More flexible, same visual system.
// ─────────────────────────────────────────────────────────────────────────────

export interface ListItemProps {
  /** Leading avatar or icon — 24px, use Avatar component */
  avatar?: React.ReactNode;
  /** Primary label text */
  label: string;
  /** Secondary / muted text (email, description, metadata) */
  sublabel?: string;
  /** Right-side actions (toggle, buttons, dropdown) */
  actions?: React.ReactNode;
  /** Middle metadata (shown between label and actions) */
  meta?: React.ReactNode;
  /** Show hover state by default (for selected/active) */
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ avatar, label, sublabel, actions, meta, active, className, onClick }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "flex h-14 items-center gap-2.5 px-4",
        "border-b border-foreground/[0.12]",
        "transition-colors duration-100",
        "hover:bg-muted",
        active && "bg-muted",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Leading avatar */}
      {avatar && (
        <div className="shrink-0">{avatar}</div>
      )}

      {/* Label area — flex-1 */}
      <div className="flex flex-1 min-w-0 items-center gap-2.5 h-full">
        <div className="flex flex-1 min-w-0 flex-col justify-center">
          <span className="text-sm font-normal tracking-[-0.02em] text-foreground truncate">
            {label}
          </span>
          {sublabel && (
            <span className="text-sm font-normal tracking-[-0.02em] text-foreground/50 truncate">
              {sublabel}
            </span>
          )}
        </div>
        {meta && (
          <div className="shrink-0 text-sm text-foreground/50">{meta}</div>
        )}
      </div>

      {/* Right actions */}
      {actions && (
        <div className="shrink-0 flex items-center gap-4">{actions}</div>
      )}
    </div>
  )
);
ListItem.displayName = "ListItem";

// ── ListView — wraps ListItems with optional header ───────────────────────────

export interface ListViewProps {
  children: React.ReactNode;
  /** Section header label */
  header?: React.ReactNode;
  className?: string;
}

function ListView({ children, header, className }: ListViewProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {header && (
        <div className="flex items-center h-9 px-4 border-b border-foreground/[0.12]">
          {typeof header === "string" ? (
            <span className="text-xs font-semibold tracking-[0.04em] uppercase text-foreground/50">
              {header}
            </span>
          ) : header}
        </div>
      )}
      {children}
    </div>
  );
}

export { ListItem, ListView };

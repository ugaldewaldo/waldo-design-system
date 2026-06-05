import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo ListItem — two variants from Figma DS
//
// default (node 62783:68372) — with border-bottom separator
//   Height 56px · border-b foreground/12 · hover bg-muted
//   Use in: standalone lists, member lists, brand lists
//
// ghost (node 71921:131866) — no borders, rounded hover pill
//   Height 40px · no border · hover rounded-lg bg-foreground/7
//   Use in: inside modals/dialogs, settings panels, filter lists
// ─────────────────────────────────────────────────────────────────────────────

export interface ListItemProps {
  /** Leading avatar or icon */
  avatar?: React.ReactNode;
  /** Primary label text */
  label: string;
  /** Secondary / muted text */
  sublabel?: string;
  /** Right-side actions */
  actions?: React.ReactNode;
  /** Middle metadata */
  meta?: React.ReactNode;
  /** Active / selected state */
  active?: boolean;
  /** ghost = no borders, rounded hover (for use inside modals/panels) */
  variant?: "default" | "ghost";
  className?: string;
  onClick?: () => void;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ avatar, label, sublabel, actions, meta, active, variant = "default", className, onClick }, ref) => {
    const isGhost = variant === "ghost";

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2.5",
          "transition-colors duration-100",
          onClick && "cursor-pointer",
          // default variant
          !isGhost && [
            "h-14 px-4",
            "border-b border-foreground/[0.12]",
            "hover:bg-muted",
            active && "bg-muted",
          ],
          // ghost variant — used inside modals/panels
          isGhost && [
            "h-10 px-3 mx-1 rounded-lg",
            "hover:bg-foreground/[0.07]",
            active && "bg-foreground/[0.07]",
          ],
          className
        )}
      >
        {avatar && <div className="shrink-0">{avatar}</div>}

        <div className="flex flex-1 min-w-0 items-center gap-2.5 h-full">
          <div className="flex flex-1 min-w-0 flex-col justify-center">
            <span className={cn(
              "font-normal tracking-[-0.02em] text-foreground truncate",
              isGhost ? "text-sm" : "text-sm"
            )}>
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

        {actions && (
          <div className="shrink-0 flex items-center gap-4">{actions}</div>
        )}
      </div>
    );
  }
);
ListItem.displayName = "ListItem";

// ── ListView ──────────────────────────────────────────────────────────────────

export interface ListViewProps {
  children: React.ReactNode;
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

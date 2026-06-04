import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Empty State
//
// Three main uses (Linear pattern):
//   page    → full-page, centered, for views with no data
//   section → inside a panel, table or card
//   inline  → inside a dropdown, combobox, search result
//
// Anatomía:
//   [icon] — opcional, 32px, muted-foreground
//   title  — required, font-medium
//   desc   — opcional, muted-foreground
//   action — opcional, Button o link
// ─────────────────────────────────────────────────────────────────────────────

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "page" | "section" | "inline";
}

const sizeStyles = {
  page:    "py-20 px-6",
  section: "py-12 px-6",
  inline:  "py-6  px-4",
};

const iconSize = {
  page:    "h-10 w-10",
  section: "h-8  w-8",
  inline:  "h-4  w-4",
};

const titleSize = {
  page:    "text-base",
  section: "text-sm",
  inline:  "text-xs",
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "section",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn("text-muted-foreground/50 mb-3", iconSize[size])}>
          {icon}
        </div>
      )}
      <p className={cn("font-medium text-foreground/70 leading-tight", titleSize[size])}>
        {title}
      </p>
      {description && (
        <p className={cn(
          "text-muted-foreground mt-1 max-w-[280px] leading-snug",
          size === "page" ? "text-sm" : "text-xs"
        )}>
          {description}
        </p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

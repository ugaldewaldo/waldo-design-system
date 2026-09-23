import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// EntityChip — Waldo extension (no shadcn equivalent).
// Figma: API-DASHBOARD node 34:480 "chip-Serval AI" · add node 34:498 "chip-add"
//
// A tracked entity as a pill: favicon or type icon, then the name with its kind
// underneath. Two lines is the point — a brand, an audience and a category can
// share a name, so the kind travels with it.
//
//   <EntityChip name="Serval AI" kind="Brand" image={favicon} />
//   <EntityChip name="IT & Ops leaders" kind="Audience" icon={<Users />} />
//   <EntityChipAdd onClick={openAddDialog} />
//
// Prefer Tag for user-entered removable labels, Badge for a status, and
// FilterChip for something that filters. This one identifies an entity.
//
// Note: the secondary line is `kind`, not `type` — `type` is the DOM attribute
// on <button> and cannot be reused as a prop name.
// ─────────────────────────────────────────────────────────────────────────────

export interface EntityChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  /** Secondary line: "Brand", "Audience", "Category"… */
  kind?: string;
  /** Favicon or logo URL, rendered 24×24. */
  image?: string;
  /** Icon to use when there is no image (e.g. <Users />). */
  icon?: React.ReactNode;
}

const EntityChip = React.forwardRef<HTMLButtonElement, EntityChipProps>(
  ({ name, kind, image, icon, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex shrink-0 items-center gap-[9px] rounded-full bg-foreground/[0.04] py-2 pl-2.5 pr-4",
        "cursor-pointer select-none transition-colors duration-100",
        "hover:bg-foreground/[0.08]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {image ? (
        <img src={image} alt="" className="size-6 shrink-0 rounded-md object-cover" />
      ) : icon ? (
        <span className="flex size-6 shrink-0 items-center justify-center text-foreground/70 [&_svg]:size-[18px]">
          {icon}
        </span>
      ) : null}
      <span className="flex flex-col items-start gap-px leading-none">
        <span className="whitespace-nowrap text-sm tracking-[-0.02em] text-foreground">
          {name}
        </span>
        {kind && (
          <span className="whitespace-nowrap text-xs tracking-[-0.02em] text-muted-foreground">
            {kind}
          </span>
        )}
      </span>
    </button>
  )
);
EntityChip.displayName = "EntityChip";

export interface EntityChipAddProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/** Dashed sibling that adds a new entity — sits at the end of a chip row. */
const EntityChipAdd = React.forwardRef<HTMLButtonElement, EntityChipAddProps>(
  ({ label = "+ Add", className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-[46px] shrink-0 items-center rounded-full border border-dashed border-border/[0.12] px-4",
        "text-sm tracking-[-0.02em] text-foreground/70",
        "cursor-pointer select-none transition-colors duration-100",
        "hover:border-border/[0.25] hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
);
EntityChipAdd.displayName = "EntityChipAdd";

export { EntityChip, EntityChipAdd };

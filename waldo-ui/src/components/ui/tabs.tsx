import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Tabs — Figma DS node 83931-3758
//
// Three variants:
//   text  → transparent background, active = foreground + font-medium
//           + 1px primary underline (square edges, flush with the divider).
//           inactive = muted-foreground. No pill.
//           Use for: page-level navigation, section headers.
//
//   pill  → active tab has bg-secondary pill (rounded-full)
//           inactive = transparent + muted-foreground.
//           Use for: inline filters, view toggles, compact navigation.
//
//   pill-primary → Waldo extension (no shadcn equivalent). Solid foreground
//           active pill on a subtle track; inactive = foreground/70.
//           Use for: main page navigation — at most one per page.
//
// size: default (14px) · sm (12px, tighter padding) — for tab rows that sit
//       beside a chart or inside a card header. Set it on TabsTrigger; TabsList
//       needs no size (its gap is the same at both scales). A time-range row
//       (1D · 1W · 1M · YTD) is variant="pill" size="sm" — not a separate
//       component.
//
// Built on Radix UI Tabs for full keyboard + ARIA support.
// ─────────────────────────────────────────────────────────────────────────────

const Tabs = TabsPrimitive.Root;

// ── TabsList ──────────────────────────────────────────────────────────────────

const tabsListVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        text: "gap-0",
        pill: "gap-1",
        "pill-primary": "gap-0.5 rounded-full bg-foreground/[0.03] p-1",
      },
    },
    defaultVariants: { variant: "text" },
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// ── TabsTrigger ───────────────────────────────────────────────────────────────

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "text-sm font-normal tracking-[-0.02em]",
    "transition-colors duration-100",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        text: [
          "px-3 py-2 rounded-none border-b border-transparent",
          "text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:border-primary",
        ],
        pill: [
          "px-3 py-1 rounded-full",
          "text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:font-medium",
          "data-[state=active]:shadow-surface",
        ],
        "pill-primary": [
          "px-4 py-1.5 rounded-full",
          "text-foreground/70",
          "hover:text-foreground",
          "data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:font-medium",
          "data-[state=active]:shadow-surface",
        ],
      },
      // Compact scale for controls that sit beside a chart or inside a card
      // header, where the default 14px row is too heavy. Radius and active fill
      // are unchanged — only type size and vertical padding tighten.
      size: {
        default: "",
        sm: "text-xs py-[7px]",
      },
    },
    defaultVariants: { variant: "text", size: "default" },
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ── TabsContent ───────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "focus-visible:outline-none",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsListProps, TabsTriggerProps };

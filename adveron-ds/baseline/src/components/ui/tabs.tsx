"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/tabs.tsx), narrowed to the
// parts the console uses.
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing.
// The registry ships three looks — text, pill and pill-primary — and only the
// text one is kept, so there is no variant prop to pick wrong: the console
// navigates a page with underlined tabs under its heading, and the pills are a
// filter idiom this app already spends buttons on.
//
// Built on Radix Tabs, which is what supplies roving-focus keyboard movement
// and the tab/tabpanel ARIA wiring.
const Tabs = TabsPrimitive.Root;

// The rule the active trigger's underline sits on, drawn by the list so it runs
// the width the caller gives it rather than stopping under the last tab.
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref): React.ReactElement => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex items-center border-b border-foreground/[0.08]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// `-mb-px` pulls the trigger's own border onto the list's rule, so the active
// underline replaces that segment instead of stacking two lines.
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref): React.ReactElement => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "-mb-px inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap",
      "rounded-none border-b border-transparent px-3 py-2",
      "text-sm font-normal tracking-[-0.02em] text-muted-foreground",
      "transition-colors duration-100 hover:text-foreground",
      "focus-visible:outline-none",
      "disabled:pointer-events-none disabled:opacity-40",
      "data-[state=active]:border-primary data-[state=active]:font-medium data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref): React.ReactElement => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

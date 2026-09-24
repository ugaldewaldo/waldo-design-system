"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/dropdown-menu.tsx), narrowed
// to the parts the console uses (no submenus).
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing.
//
// Container: zinc-750 (--popover) · radius 20px · py-3
// Item:      px-4 py-2 · foreground/70 → foreground on hover/focus
const contentStyles = cn(
  "z-50 min-w-[160px] overflow-hidden",
  "rounded-2-5xl",
  "bg-popover text-popover-foreground/70",
  "shadow-popover",
  "py-3",
  "data-[state=open]:animate-fade-in data-[state=open]:animate-slide-in-top",
);

// The geometry and type of ONE row in a menu, without the affordances of a
// choosable one. Exported because a menu that STATES something (the scope
// already in force, with its check) has to sit on the same rhythm as the rows
// that switch it, and a second copy of these measurements drifts.
export const dropdownRowLayout = cn(
  "relative flex select-none items-center gap-2",
  "px-4 py-2 text-sm font-normal tracking-[-0.02em]",
);

const itemStyles = cn(
  dropdownRowLayout,
  "cursor-pointer",
  "text-popover-foreground/70 outline-none",
  "transition-colors duration-100",
  "hover:bg-foreground/5 hover:text-foreground",
  "focus:bg-foreground/5 focus:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
);

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(contentStyles, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    destructive?: boolean;
  }
>(({ className, destructive, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      itemStyles,
      destructive && "text-destructive focus:bg-destructive/10 focus:text-destructive",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(itemStyles, "pl-8", className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-ink-accent text-ink-accent" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// A menu of independent toggles rather than one choice: selecting an item does
// NOT close the menu, because a multi-select whose menu shuts after every tick
// makes picking three things three round trips.
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, onSelect, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(itemStyles, "pl-8", className)}
    onSelect={(event) => {
      event.preventDefault();
      onSelect?.(event);
    }}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref): React.ReactElement => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-foreground/[0.12]", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
};

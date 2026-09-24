"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/sheet.tsx), narrowed to the
// parts the console uses: a panel from the RIGHT edge, with the same
// header / body / footer slots as dialog.tsx so a form can move between the two.
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing, and
// the registry's slide animations belong to tw-animate-css, which the console
// does not load. The console's own fade is used instead.
const Sheet = SheetPrimitive.Root;

// SheetContent carries no padding — wrap content in SheetHeader / SheetBody /
// SheetFooter. It is a full-height column and SheetBody is the only scrolling
// region; anything wrapping the slots — a <form>, say — becomes the flex item
// instead and needs "flex min-h-0 flex-1 flex-col" of its own, or the body
// can't shrink and the content overflows unscrolled.
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref): React.ReactElement => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-[2px]",
        "data-[state=open]:animate-fade-in",
      )}
    />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col sm:max-w-md",
        "border-l border-border/[0.08] bg-card shadow-dialog",
        "data-[state=open]:animate-fade-in",
        "focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        className={cn(
          "absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-md",
          "text-muted-foreground transition-colors duration-100",
          "hover:bg-accent hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring/25",
        )}
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn("shrink-0 px-7 pb-5 pt-7", className)} {...props} />;
}

function SheetBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  // overflow-y-auto makes this a scroll container, which zeroes its automatic
  // minimum size — so it shrinks to what the header and footer leave.
  return (
    <div className={cn("flex-1 overflow-y-auto px-7 pb-7", className)} {...props} />
  );
}

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 border-t border-border/[0.08] px-7 py-5",
        className,
      )}
      {...props}
    />
  );
}

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref): React.ReactElement => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-xl font-medium leading-tight text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref): React.ReactElement => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

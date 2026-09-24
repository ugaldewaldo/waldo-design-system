"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/dialog.tsx), narrowed to the
// parts the console uses.
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing.
const Dialog = DialogPrimitive.Root;

const sizeMap = {
  sm: "max-w-[560px]",
  md: "max-w-[720px]",
  lg: "max-w-[960px]",
};

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: keyof typeof sizeMap;
  /**
   * Greys out the close "X" for a dialog that must not be dismissed yet — a
   * confirmation whose action is already in flight. Disabled rather than
   * removed: the chrome stays where the eye left it, and the affordance comes
   * back rather than reappearing from nowhere.
   */
  closeDisabled?: boolean;
}

// DialogContent carries no padding — wrap content in DialogHeader / DialogBody /
// DialogFooter.
//
// DialogContent caps its height at the viewport and DialogBody is the only scrolling
// region, so tall content belongs in a DialogBody that is a *direct* child. Anything
// wrapping the slots — a <form>, say — becomes the flex item instead and needs
// "flex min-h-0 flex-1 flex-col" of its own, or the body can't shrink and the content
// overflows the cap unscrolled. A body whose content isn't focusable also wants
// tabIndex={0} so it can be scrolled by keyboard; one containing inputs or buttons is
// already reachable.
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>((
  { className, children, size = "md", closeDisabled = false, ...props },
  ref,
): React.ReactElement => (
  <DialogPrimitive.Portal>
    {/* Deliberately no backdrop-filter: Chrome re-blurs a full-viewport backdrop on every
        partial repaint above it — a hover state inside the dialog is enough — so the page
        behind flickers as the mouse moves. The 80% wash separates the layers on its own. */}
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-background/80",
        "data-[state=open]:animate-fade-in",
      )}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Top-anchored on a phone, centred from `sm` up. A phone keyboard covers
        // the lower half of the layout viewport without shrinking it, so a dialog
        // centred there puts its first field exactly where the keyboard lands;
        // hung from the top, the field is in view while it is being typed in.
        "fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-50 -translate-x-1/2",
        "sm:top-1/2 sm:-translate-y-1/2",
        // Inset horizontally by the same 1rem the height cap leaves top and bottom. A
        // plain w-full is the viewport width for a fixed element, so on a narrow screen
        // the dialog would sit edge to edge with no gutter while still being capped
        // vertically.
        "w-[calc(100%_-_2rem)] rounded-4xl",
        // Cap to the viewport and lay children out as a column so DialogBody can own the
        // scroll. DialogContent must never scroll itself — a scroller drags its own
        // header, footer and close button along with the content, which is the bug being
        // fixed. It carries no overflow at all so that content not wrapped in DialogBody
        // still spills visibly instead of being silently clipped.
        "flex max-h-[calc(100dvh_-_2rem)] flex-col",
        "border border-border/[0.08] bg-card shadow-dialog",
        "data-[state=open]:animate-fade-in",
        "focus:outline-none",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
      {/* Positioned against DialogContent, which is capped to the viewport and never
          scrolls, so the close button stays on screen however long the body gets. */}
      <DialogPrimitive.Close
        disabled={closeDisabled}
        className={cn(
          "absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-md",
          "text-muted-foreground transition-colors duration-100",
          "hover:bg-accent hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring/25",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn("shrink-0 px-8 pb-5 pt-7", className)} {...props} />;
}

function DialogBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  // overflow-y-auto makes this a scroll container, which zeroes its automatic minimum
  // size — so it shrinks to the space the header and footer leave without needing an
  // explicit min-h-0.
  return <div className={cn("flex-1 overflow-y-auto px-8 pb-7", className)} {...props} />;
}

// One titled region inside a dialog's body — a group of fields with a heading and
// a line saying what settling them does — so a form with several of them draws
// each the same way.
function DialogSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section aria-label={title} className="mt-6 space-y-3">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-end gap-2 px-8 py-5 pb-7",
        className,
      )}
      {...props}
    />
  );
}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref): React.ReactElement => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-medium leading-tight text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref): React.ReactElement => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogSection,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

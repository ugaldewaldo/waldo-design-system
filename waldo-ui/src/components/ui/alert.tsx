import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Alert — inline contextual feedback
//
// Different from Toast (ephemeral, corner) — Alert lives inside the page:
// form errors, plan limits, onboarding states, contextual info.
//
// Variants (Linear / Radix Themes pattern):
//   info        → brand teal tint     — neutral informational
//   success     → green tint          — completed, confirmed
//   warning     → orange tint         — caution, non-blocking
//   error       → coral tint          — something failed
//
// Sizes:
//   sm          → compact 1-line, for inline form hints
//   default     → standard with title + description
// ─────────────────────────────────────────────────────────────────────────────

const alertVariants = cva(
  [
    "relative flex gap-3 rounded-lg px-4 py-3",
    "text-sm",
  ],
  {
    variants: {
      variant: {
        info:    "bg-primary/[0.07]    text-foreground",
        success: "bg-primary/[0.07]    text-foreground",
        warning: "bg-warning/[0.08]    text-foreground",
        error:   "bg-destructive/[0.08] text-foreground",
      },
      size: {
        sm:      "py-2 px-3 text-xs gap-2",
        default: "py-3 px-4 text-sm gap-3",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "default",
    },
  }
);

const iconColor: Record<string, string> = {
  info:    "text-primary",
  success: "text-primary",
  warning: "text-warning",
  error:   "text-destructive",
};

// ── Default icons per variant ──────────────────────────────────────────────

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

const defaultIcons = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon };

// ── Alert ──────────────────────────────────────────────────────────────────

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  /** Hide the default icon */
  hideIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", size, icon, hideIcon, children, ...props }, ref) => {
    const Icon = defaultIcons[variant ?? "info"];
    const color = iconColor[variant ?? "info"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {!hideIcon && (
          <span className={cn("shrink-0 mt-0.5", color)}>
            {icon ?? <Icon />}
          </span>
        )}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

// ── AlertTitle ─────────────────────────────────────────────────────────────

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium leading-tight tracking-[-0.01em] mb-0.5", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// ── AlertDescription ───────────────────────────────────────────────────────

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-foreground/70 leading-snug", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

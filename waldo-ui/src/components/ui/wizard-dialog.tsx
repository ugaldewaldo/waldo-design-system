import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo WizardDialog — Figma DS node 83966-356773
//
// Multi-step onboarding modal with split layout:
//   Left  → step content (form, choices, list)
//   Right → dark image panel (product preview, consistent across steps)
//
// Usage:
//   <WizardDialog open={open} onOpenChange={setOpen}>
//     <WizardDialogContent
//       step={1} totalSteps={3}
//       title="What brands are you working on?"
//       image={<img src="..." />}
//       onBack={handleBack}
//       onNext={handleNext}
//       nextLabel="Continue"
//     >
//       {/* step content */}
//     </WizardDialogContent>
//   </WizardDialog>
// ─────────────────────────────────────────────────────────────────────────────

const WizardDialog = DialogPrimitive.Root;
const WizardDialogTrigger = DialogPrimitive.Trigger;

// ── Overlay ───────────────────────────────────────────────────────────────────

const WizardDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-[2px]",
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-in",
      className
    )}
    {...props}
  />
));
WizardDialogOverlay.displayName = "WizardDialogOverlay";

// ── Content ───────────────────────────────────────────────────────────────────

interface WizardDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Current step (1-based) */
  step: number;
  /** Total number of steps */
  totalSteps: number;
  /** Step title shown in header */
  title: string;
  /** Optional step label override (defaults to "Step X of Y") */
  stepLabel?: string;
  /** Right panel — image, illustration, or product preview */
  image?: React.ReactNode;
  /** Back button handler — hide button if not provided */
  onBack?: () => void;
  /** Next/submit handler */
  onNext?: () => void;
  /** Label for the primary action (default: "Next") */
  nextLabel?: string;
  /** Disable the next button */
  nextDisabled?: boolean;
}

const WizardDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  WizardDialogContentProps
>(({
  className, children, step, totalSteps, title, stepLabel,
  image, onBack, onNext, nextLabel = "Next", nextDisabled,
  ...props
}, ref) => (
  <DialogPrimitive.Portal>
    <WizardDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-[800px] rounded-4xl",
        "bg-card shadow-dialog",
        "flex overflow-hidden",
        "data-[state=open]:animate-fade-in",
        "focus:outline-none",
        className
      )}
      {...props}
    >
      {/* ── Left panel — content ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-0">
          <span className="text-xs text-muted-foreground font-medium tracking-[0.04em] uppercase">
            {stepLabel ?? `Step ${step} of ${totalSteps}`}
          </span>
          <DialogPrimitive.Close className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-colors">
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>

        {/* Title */}
        <div className="px-8 pt-4 pb-5">
          <h2 className="text-xl font-medium text-foreground leading-tight tracking-[-0.01em]">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="flex-1 px-8 pb-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer — navigation */}
        <div className="flex items-center justify-between px-8 pb-7 pt-4">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className={cn(
              "h-11 px-8 rounded-full text-sm font-medium tracking-[-0.02em]",
              "bg-foreground text-background",
              "hover:bg-foreground/90 transition-colors",
              "disabled:opacity-40 disabled:pointer-events-none"
            )}
          >
            {nextLabel}
          </button>
        </div>
      </div>

      {/* ── Right panel — image ── */}
      {image && (
        <div className="w-[280px] shrink-0 bg-zinc-900 flex items-center justify-center overflow-hidden">
          {image}
        </div>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
WizardDialogContent.displayName = "WizardDialogContent";

// ── Progress dots ─────────────────────────────────────────────────────────────

interface WizardProgressProps {
  step: number;
  totalSteps: number;
  className?: string;
}

function WizardProgress({ step, totalSteps, className }: WizardProgressProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block rounded-full transition-all duration-200",
            i + 1 === step
              ? "w-4 h-1.5 bg-primary"
              : i + 1 < step
              ? "w-1.5 h-1.5 bg-primary/50"
              : "w-1.5 h-1.5 bg-foreground/20"
          )}
        />
      ))}
    </div>
  );
}

export {
  WizardDialog,
  WizardDialogTrigger,
  WizardDialogContent,
  WizardProgress,
};
export type { WizardDialogContentProps };

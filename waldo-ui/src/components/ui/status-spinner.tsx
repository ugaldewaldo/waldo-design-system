import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo StatusSpinner — canvas 16px, icon ~14px
//
// Transitions: loading → success (✓) | error (✕) | warning (!)
// Animation: spin → scale pop → icon reveal
//
// Usage:
//   const [status, setStatus] = useState<SpinnerStatus>("loading")
//   <StatusSpinner status={status} />
//
//   // After upload completes:
//   setStatus("success")  // or "error" | "warning"
// ─────────────────────────────────────────────────────────────────────────────

export type SpinnerStatus = "loading" | "success" | "error" | "warning";

interface StatusSpinnerProps {
  status?: SpinnerStatus;
  className?: string;
}

const statusConfig = {
  loading: {
    ring: "border-foreground/20 border-t-foreground/60",
    bg: "transparent",
    icon: null,
  },
  success: {
    ring: "border-primary",
    bg: "bg-primary",
    icon: (
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  error: {
    ring: "border-destructive",
    bg: "bg-destructive",
    icon: (
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
        <path d="M2 2l8 8M10 2l-8 8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  warning: {
    ring: "border-warning",
    bg: "bg-warning",
    icon: (
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
        <path d="M6 2v5M6 9.5v.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
};

export function StatusSpinner({ status = "loading", className }: StatusSpinnerProps) {
  const config = statusConfig[status];
  const isLoading = status === "loading";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "h-3.5 w-3.5 rounded-full",
        "border-[1.5px]",
        "transition-all duration-300 ease-in-out",
        config.ring,
        isLoading ? "animate-spin" : cn("scale-105", config.bg),
        className
      )}
      role="status"
      aria-label={status}
    >
      {!isLoading && (
        <span
          className="animate-[scale-in_0.2s_ease-out_forwards]"
          style={{ animation: "scale-in 0.15s ease-out forwards" }}
        >
          {config.icon}
        </span>
      )}
    </span>
  );
}

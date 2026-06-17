import { Toaster as Sonner, toast } from "sonner";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Toast — powered by Sonner
//
// Two visual patterns from Figma DS (node 83931-2768):
//   notification → compact card (default) — user actions: saved, shared, created
//   banner       → full-width pill         — system alerts: limits, extension
//
// Usage:
//   1. Add <Toaster /> once at the root of your app
//   2. Call toast() anywhere:
//
//   import { toast } from "@waldo/ui"
//
//   toast("Insight saved")
//   toast.success("Brand added", { description: "Nike is now being tracked." })
//   toast.warning("Limit reached", { action: { label: "Upgrade", onClick: fn } })
//   toast.error("Failed to save changes")
//
// ─────────────────────────────────────────────────────────────────────────────

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: cn(
            "group flex items-start gap-3",
            "rounded-xl px-4 py-3",
            "bg-card text-foreground shadow-surface",
            "text-sm font-normal",
          ),
          title:       "font-medium text-sm text-foreground/70 leading-none",
          description: "text-xs text-muted-foreground mt-0.5",
          actionButton: cn(
            "text-sm font-medium text-primary",
            "hover:text-primary/80 transition-colors",
            "!bg-transparent !border-0 !p-0 !h-auto !rounded-none",
          ),
          cancelButton: cn(
            "text-sm text-muted-foreground",
            "hover:text-foreground transition-colors",
            "!bg-transparent !border-0 !p-0 !h-auto !rounded-none",
          ),
          closeButton: cn(
            "!bg-transparent !border-foreground/[0.12] text-foreground/55",
            "hover:text-foreground hover:!bg-foreground/[0.07]",
            "transition-colors",
          ),
          error:   "",
          success: "",
          warning: "",
          info:    "",
          icon:    "shrink-0 mt-0.5",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };

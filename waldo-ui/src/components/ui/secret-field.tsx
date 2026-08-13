import * as React from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// SecretField — Waldo extension (no shadcn equivalent).
// Source: API-DASHBOARD "Your API key" card.
//
// A credential the user needs to copy but shouldn't have sitting in plain sight:
// API keys, tokens, webhook signing secrets. Masked by default, with reveal and
// copy as separate affordances — copying is the common case and should not
// require exposing the value on screen first.
//
//   <SecretField value="waldo_sk_9f3c1e8b7a204d6f95c2" />
//
// Prefer CopyLink for a URL that is not sensitive, and Input type="password"
// when the user is *entering* a secret rather than reading one back.
//
// Masking is display-only — the real value is in the DOM, as it must be for
// copy to work. This hides a key from someone looking over a shoulder or a
// screen recording; it is not a security control.
// ─────────────────────────────────────────────────────────────────────────────

export interface SecretFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The secret. Rendered masked until revealed. */
  value: string;
  /** Characters kept visible at the end when masked. */
  visibleSuffix?: number;
  /** Prefix kept visible when masked — e.g. "waldo_sk_". Omit to mask the whole value. */
  visiblePrefix?: string;
  /** Hide the reveal toggle, leaving copy as the only action. */
  hideReveal?: boolean;
}

const SecretField = React.forwardRef<HTMLDivElement, SecretFieldProps>(
  ({ value, visibleSuffix = 4, visiblePrefix, hideReveal, className, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const masked = React.useMemo(() => {
      const head = visiblePrefix && value.startsWith(visiblePrefix) ? visiblePrefix : "";
      const tail = visibleSuffix > 0 ? value.slice(-visibleSuffix) : "";
      const hidden = Math.max(0, value.length - head.length - tail.length);
      return `${head}${"•".repeat(Math.min(hidden, 14))}${tail}`;
    }, [value, visiblePrefix, visibleSuffix]);

    const copy = () => {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border/[0.14] bg-background/40 px-3.5 py-2.5",
          className
        )}
        {...props}
      >
        <code className="flex-1 truncate font-mono text-sm text-muted-foreground">
          {revealed ? value : masked}
        </code>
        {!hideReveal && (
          <button
            type="button"
            aria-label={revealed ? "Hide value" : "Reveal value"}
            onClick={() => setRevealed((v) => !v)}
            className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        )}
        <button
          type="button"
          aria-label="Copy value"
          onClick={copy}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
    );
  }
);
SecretField.displayName = "SecretField";

export { SecretField };

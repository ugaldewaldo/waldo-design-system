import * as React from "react";

import { cn } from "@/lib/utils";

// A loading placeholder. `aria-hidden`, always: a skeleton is the absence of
// content, so announcing it would read a row of nothing to a screen reader —
// the loading state itself is announced by the region that owns the data.
function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-foreground/[0.08]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

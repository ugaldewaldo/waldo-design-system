import * as React from "react";

import { cn } from "@/lib/utils";

// A section rule. An `<hr>` rather than a styled div because the element already
// carries the separator role — the account detail stacks several independent
// sections, and the break between them is structure, not decoration.
function Separator({
  className,
  ...props
}: React.ComponentProps<"hr">): React.ReactElement {
  return (
    <hr
      className={cn("h-px w-full border-0 bg-foreground/[0.08]", className)}
      {...props}
    />
  );
}

export { Separator };

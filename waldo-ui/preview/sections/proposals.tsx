import * as ProgressPrimitive from "@radix-ui/react-progress";

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { SectionDef } from "../lib";

/* Proposals under review — live examples of a change that is NOT in the design
   system yet, so the approval inbox can show it next to what ships today.
   Nothing here is exported as a component; the real components are untouched.
   These sections are only reachable embedded (?embed=1&only=<id>), never listed
   on the gallery page. */

// PRO-2692, as the product app (packages/frontend) has it: at 75% the fill turns
// yellow, at 90% destructive. The app's yellow is not a Waldo color; this
// example uses Waldo's warning in its place.
function ThresholdProgress({ value }: { value: number }) {
  return (
    <ProgressPrimitive.Root
      value={value}
      className="relative h-1.5 w-56 overflow-hidden rounded-full bg-primary/20"
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          value >= 90 && "bg-destructive",
          value >= 75 && value < 90 && "bg-warning",
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export const proposalSections: SectionDef[] = [
  {
    id: "proposal-pro-2692-today",
    title: "",
    specs: [
      { label: "skeleton", node: <Skeleton className="h-9 w-48" /> },
      { label: "progress 40%", node: <Progress value={40} className="w-56" /> },
      { label: "progress 80%", node: <Progress value={80} className="w-56" /> },
      { label: "progress 95%", node: <Progress value={95} className="w-56" /> },
    ],
  },
  {
    id: "proposal-pro-2692",
    title: "",
    specs: [
      // The app's four heights: 16, 40, 80 and 128px, full width.
      { label: "skeleton sm", node: <Skeleton className="h-4 w-56" /> },
      { label: "skeleton md", node: <Skeleton className="h-10 w-56" /> },
      { label: "skeleton lg", node: <Skeleton className="h-20 w-56" /> },
      { label: "skeleton xl", node: <Skeleton className="h-32 w-56" /> },
      { label: "progress 40%", node: <ThresholdProgress value={40} /> },
      { label: "progress 80%", node: <ThresholdProgress value={80} /> },
      { label: "progress 95%", node: <ThresholdProgress value={95} /> },
    ],
  },
];

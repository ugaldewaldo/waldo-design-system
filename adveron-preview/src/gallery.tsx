import { Component, useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Plus, Settings, Trash2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* Every specimen imports from the app's own src/components/ui. Nothing here
   restates a style: if Adveron changes a component, this page changes with it.

   One section per component file, and the section id IS the file name, so the
   Adveron DS compare page can ask for exactly one: ?embed=1&only=<file>. */

declare const __ADVERON_SOURCE__: "live" | "baseline";

const PARAMS = new URLSearchParams(window.location.search);
const EMBED = PARAMS.get("embed") === "1";
const ONLY = PARAMS.get("only");
const THEME = PARAMS.get("theme");

type Spec = { label: string; node: ReactNode; wide?: boolean };
type SectionDef = { id: string; title: string; note?: string; specs: Spec[] };

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <span className="rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1 font-mono text-[11px] text-destructive">
          {this.state.error.message.slice(0, 70)}
        </span>
      );
    }
    return this.props.children;
  }
}

function Section({ id, title, note, specs }: SectionDef) {
  return (
    <section id={id} className={EMBED ? "p-6" : "scroll-mt-16 border-b border-border py-10"}>
      {EMBED ? null : (
        <>
          <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
          {note ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{note}</p> : null}
        </>
      )}
      <div className={EMBED ? "flex flex-wrap items-start gap-x-8 gap-y-7" : "mt-6 flex flex-wrap items-start gap-x-8 gap-y-7"}>
        {specs.map((s, i) => (
          <div key={`${s.label}-${i}`} className={s.wide ? "flex w-full flex-col gap-2" : "flex min-w-[8rem] flex-col gap-2"}>
            <div className="flex min-h-[2.5rem] items-center">
              <Boundary>{s.node}</Boundary>
            </div>
            <code className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground/70">
              {s.label}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}

const BADGE_VARIANTS = ["default", "secondary", "outline", "destructive", "warning"] as const;
const BUTTON_VARIANTS = [
  "default", "brand", "secondary", "outline", "ghost",
  "solid", "white", "destructive", "destructive-solid", "link",
] as const;

const ROSTER = [
  ["Romy Vassilev", "Owner", "Active"],
  ["Jesse Rogers", "Admin", "Active"],
  ["Tyler Rogers", "Member", "Active"],
  ["Jenny Nicholson", "Admin", "Invited"],
] as const;

const CHART_DATA = [
  { day: "Mon", owned: 42, paid: 18 },
  { day: "Tue", owned: 55, paid: 26 },
  { day: "Wed", owned: 38, paid: 31 },
  { day: "Thu", owned: 61, paid: 22 },
  { day: "Fri", owned: 49, paid: 35 },
];

const CHART_CONFIG = {
  owned: { label: "Owned", color: "var(--color-chart-1)" },
  paid: { label: "Paid", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>
              The key can call the API on behalf of this workspace.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Field label="Name">
              <Input placeholder="Social listening agent" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow the roster.</SheetDescription>
          </SheetHeader>
          <SheetBody className="text-sm text-muted-foreground">Body content.</SheetBody>
        </SheetContent>
      </Sheet>
    </>
  );
}

function SwitchDemo({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />;
}

function RadioDemo() {
  const { register } = useForm<{ plan: string }>({ defaultValues: { plan: "team" } });
  return (
    <RadioGroup
      name="plan"
      legend="Plan"
      register={register}
      options={[
        { value: "starter", label: "Starter", detail: "$0" },
        { value: "team", label: "Team", detail: "$49" },
        { value: "scale", label: "Scale", detail: "$199", description: "Needs an owner to approve.", disabled: true },
      ]}
    />
  );
}

const SECTIONS: SectionDef[] = [
  {
    id: "badge",
    title: "Badge",
    note: "A chip carrying a value a machine returned takes mono: mono face, upper case, tracked out. Human language stays in the interface face. No chip wears the yellow.",
    specs: [
      ...BADGE_VARIANTS.map((v) => ({ label: v, node: <Badge variant={v}>Label</Badge> })),
      { label: "mono", node: <Badge mono>Active</Badge> },
      { label: "mono outline", node: <Badge mono variant="outline">Invited</Badge> },
      { label: "size sm", node: <Badge size="sm">Small</Badge> },
      { label: "size lg", node: <Badge size="lg">Large</Badge> },
    ],
  },
  {
    id: "button",
    title: "Button",
    note: "Exactly one call to action per view, and it is yellow. Turquoise is the highlight, not the action.",
    specs: [
      ...BUTTON_VARIANTS.map((v) => ({ label: v, node: <Button variant={v}>Button</Button> })),
      { label: "size sm", node: <Button size="sm">Small</Button> },
      { label: "size lg", node: <Button size="lg">Large</Button> },
      { label: "icon", node: <Button size="icon" variant="outline" aria-label="Settings"><Settings className="size-4" /></Button> },
      { label: "icon sm", node: <Button size="icon-sm" variant="ghost" aria-label="Delete"><Trash2 className="size-4" /></Button> },
      { label: "icon + text", node: <Button><Plus className="size-4" />New key</Button> },
      { label: "disabled", node: <Button disabled>Disabled</Button> },
    ],
  },
  {
    id: "input",
    title: "Input",
    specs: [
      { label: "default", node: <Input placeholder="Placeholder" className="w-56" /> },
      { label: "value", node: <Input defaultValue="A typed value" className="w-56" /> },
      { label: "disabled", node: <Input disabled placeholder="Disabled" className="w-56" /> },
      { label: "textarea", node: <Textarea placeholder="Longer text" className="w-64" /> },
      { label: "field", node: <Field label="Name" hint="Shown to your team" className="w-64"><Input placeholder="Social listening agent" /></Field> },
      { label: "field error", node: <Field label="Name" error="This name is taken" className="w-64"><Input defaultValue="Agent" /></Field> },
    ],
  },
  { id: "label", title: "Label", specs: [{ label: "label", node: <Label>Field label</Label> }] },
  {
    id: "select",
    title: "Select",
    specs: [
      { label: "default", node: <Select defaultValue="meta" className="w-44"><option value="meta">Meta</option><option value="google">Google</option></Select> },
      { label: "disabled", node: <Select disabled defaultValue="meta" className="w-44"><option value="meta">Meta</option></Select> },
    ],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    specs: [
      { label: "checked", node: <Checkbox defaultChecked aria-label="Checked" /> },
      { label: "unchecked", node: <Checkbox aria-label="Unchecked" /> },
      { label: "disabled", node: <Checkbox disabled aria-label="Disabled" /> },
    ],
  },
  {
    id: "switch",
    title: "Switch",
    specs: [
      { label: "on", node: <SwitchDemo initial /> },
      { label: "off", node: <SwitchDemo initial={false} /> },
    ],
  },
  { id: "radio-group", title: "Radio group", specs: [{ label: "radio group", node: <RadioDemo />, wide: true }] },
  { id: "separator", title: "Separator", specs: [{ label: "separator", node: <Separator className="w-40" /> }] },
  { id: "skeleton", title: "Skeleton", specs: [{ label: "skeleton", node: <Skeleton className="h-9 w-48" /> }] },
  {
    id: "card",
    title: "Card",
    specs: [
      {
        label: "card",
        node: (
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Brand index</CardTitle>
              <CardDescription>Updated four minutes ago</CardDescription>
              <CardAction><Badge mono>Live</Badge></CardAction>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Cleans, unifies and tags every mention before the API sees it.
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">Open</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
  },
  {
    id: "table",
    title: "Table",
    note: "Hairline rows and nothing else. The head is an eyebrow; machine values are mono.",
    specs: [
      {
        label: "table",
        wide: true,
        node: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROSTER.map(([name, role, status]) => (
                <TableRow key={name}>
                  <TableCell className="text-foreground">{name}</TableCell>
                  <TableCell>
                    <Badge variant={role === "Owner" ? "default" : "secondary"}>{role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge mono variant={status === "Active" ? "default" : "outline"}>{status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ),
      },
    ],
  },
  {
    id: "tabs",
    title: "Tabs",
    specs: [
      {
        label: "tabs",
        wide: true,
        node: (
          <Tabs defaultValue="owned" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="owned">Owned</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
            </TabsList>
            <TabsContent value="owned" className="pt-3 text-sm text-muted-foreground">
              Posts the brand published itself.
            </TabsContent>
            <TabsContent value="paid" className="pt-3 text-sm text-muted-foreground">
              Creative pulled from the ad libraries.
            </TabsContent>
            <TabsContent value="earned" className="pt-3 text-sm text-muted-foreground">
              What everyone else said.
            </TabsContent>
          </Tabs>
        ),
      },
    ],
  },
  { id: "dialog", title: "Dialog", note: "Click the trigger — it opens the real overlay.", specs: [{ label: "dialog", node: <DialogDemo /> }] },
  { id: "sheet", title: "Sheet", note: "Click the trigger — it opens the real overlay.", specs: [{ label: "sheet", node: <SheetDemo /> }] },
  {
    id: "dropdown-menu",
    title: "Dropdown menu",
    specs: [
      {
        label: "dropdown",
        node: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Role <ChevronDown className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Owner</DropdownMenuItem>
              <DropdownMenuItem>Admin</DropdownMenuItem>
              <DropdownMenuItem>Member</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    specs: [
      {
        label: "tooltip",
        node: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
              <TooltipContent>Source credibility first, reach second</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
  },
  {
    id: "popover",
    title: "Popover",
    specs: [
      {
        label: "popover",
        node: (
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger>
            <PopoverContent className="text-sm">Filters apply to every panel on this page.</PopoverContent>
          </Popover>
        ),
      },
    ],
  },
  {
    id: "command",
    title: "Command",
    specs: [
      {
        label: "command",
        node: (
          <Command className="w-72 rounded-lg border border-border">
            <CommandInput placeholder="Search brands" />
            <CommandList>
              <CommandEmpty>No brand found.</CommandEmpty>
              <CommandItem>Liquid Death</CommandItem>
              <CommandItem>Olipop</CommandItem>
              <CommandItem>Poppi</CommandItem>
            </CommandList>
          </Command>
        ),
      },
    ],
  },
  {
    id: "chart",
    title: "Chart",
    specs: [
      {
        label: "bar chart",
        wide: true,
        node: (
          <ChartContainer config={CHART_CONFIG} className="h-48 w-full max-w-md">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="owned" fill="var(--color-owned)" radius={4} />
              <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
            </BarChart>
          </ChartContainer>
        ),
      },
    ],
  },
  {
    id: "type",
    title: "Type",
    specs: [
      { label: "display", node: <span className="font-display text-3xl font-semibold tracking-[-0.04em]">Display</span> },
      { label: "interface", node: <span className="text-base">Interface text</span> },
      { label: "mono", node: <span className="font-mono text-sm uppercase tracking-[0.06em]">machine value</span> },
    ],
  },
];

/* Embedded, the page reports its own height so the parent can size the iframe
   to the specimen instead of guessing. */
function useReportHeight() {
  useEffect(() => {
    if (!EMBED || window.parent === window) return;
    const send = () =>
      window.parent.postMessage(
        { type: "gallery-height", source: "adveron", only: ONLY, height: document.documentElement.scrollHeight },
        "*",
      );
    const ro = new ResizeObserver(send);
    ro.observe(document.body);
    send();
    return () => ro.disconnect();
  }, []);
}

export function Gallery() {
  const [dark, setDark] = useState(THEME === "dark");
  useReportHeight();

  // The app stamps data-theme on <html> before first paint. Same switch here.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const sections = ONLY ? SECTIONS.filter((s) => s.id === ONLY) : SECTIONS;

  if (EMBED) {
    return (
      <div className="bg-background">
        {sections.map((s) => <Section key={s.id} {...s} />)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3">
          <span className="font-display text-sm font-semibold tracking-[-0.02em] text-foreground">
            Adveron
          </span>
          <nav className="flex flex-1 flex-wrap gap-4">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {s.title}
              </a>
            ))}
          </nav>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
            Dark
          </label>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <div className="py-10">
          <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-foreground">
            {__ADVERON_SOURCE__ === "live" ? "Live components" : "Baseline components"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {__ADVERON_SOURCE__ === "live" ? (
              <>
                Rendered from <code className="font-mono text-xs">adveron-web/src/components/ui</code> —
                the files the product ships. If it looks wrong here, it is wrong in the app.
              </>
            ) : (
              <>
                Rendered from <code className="font-mono text-xs">adveron-ds/baseline</code> — the frozen
                snapshot pinned in <code className="font-mono text-xs">adveron-ds/UPSTREAM</code>.
              </>
            )}
          </p>
        </div>

        {sections.map((s) => <Section key={s.id} {...s} />)}
      </main>
    </div>
  );
}

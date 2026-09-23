import { Component, useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Plus, Settings, Trash2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
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
   restates a style: if Adveron changes a component, this page changes with it. */

type Spec = { label: string; node: ReactNode; wide?: boolean };

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

function Section({ id, title, note, specs }: { id: string; title: string; note?: string; specs: Spec[] }) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-border py-10">
      <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      {note ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{note}</p> : null}
      <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-7">
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

const NAV = [
  ["badge", "Badge"],
  ["button", "Button"],
  ["input", "Input"],
  ["controls", "Controls"],
  ["card", "Card"],
  ["table", "Table"],
  ["tabs", "Tabs"],
  ["overlays", "Overlays"],
  ["misc", "Misc"],
] as const;

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Dialog</Button>
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
      <Button variant="outline" onClick={() => setOpen(true)}>Sheet</Button>
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

export function Gallery() {
  const [dark, setDark] = useState(false);

  // The app stamps data-theme on <html> before first paint. Same switch here.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3">
          <span className="font-display text-sm font-semibold tracking-[-0.02em] text-foreground">
            Adveron
          </span>
          <nav className="flex flex-1 flex-wrap gap-4">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {label}
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
            Live components
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Rendered from <code className="font-mono text-xs">adveron-web/src/components/ui</code> —
            the files the product ships. If it looks wrong here, it is wrong in the app.
          </p>
        </div>

        <Section
          id="badge"
          title="Badge"
          note="A chip carrying a value a machine returned takes mono: mono face, upper case, tracked out. Human language stays in the interface face. No chip wears the yellow."
          specs={[
            ...BADGE_VARIANTS.map((v) => ({ label: v, node: <Badge variant={v}>Label</Badge> })),
            { label: "mono", node: <Badge mono>Active</Badge> },
            { label: "mono outline", node: <Badge mono variant="outline">Invited</Badge> },
            { label: "size sm", node: <Badge size="sm">Small</Badge> },
            { label: "size lg", node: <Badge size="lg">Large</Badge> },
          ]}
        />

        <Section
          id="button"
          title="Button"
          note="Exactly one call to action per view, and it is yellow. Turquoise is the highlight, not the action."
          specs={[
            ...BUTTON_VARIANTS.map((v) => ({ label: v, node: <Button variant={v}>Button</Button> })),
            { label: "size sm", node: <Button size="sm">Small</Button> },
            { label: "size lg", node: <Button size="lg">Large</Button> },
            { label: "icon", node: <Button size="icon" variant="outline"><Settings className="size-4" /></Button> },
            { label: "icon sm", node: <Button size="icon-sm" variant="ghost"><Trash2 className="size-4" /></Button> },
            { label: "icon + text", node: <Button><Plus className="size-4" />New key</Button> },
            { label: "disabled", node: <Button disabled>Disabled</Button> },
          ]}
        />

        <Section
          id="input"
          title="Input"
          specs={[
            { label: "default", node: <Input placeholder="Placeholder" className="w-56" /> },
            { label: "value", node: <Input defaultValue="A typed value" className="w-56" /> },
            { label: "disabled", node: <Input disabled placeholder="Disabled" className="w-56" /> },
            { label: "textarea", node: <Textarea placeholder="Longer text" className="w-64" /> },
            { label: "field", node: <Field label="Name" hint="Shown to your team" className="w-64"><Input placeholder="Social listening agent" /></Field> },
            { label: "field error", node: <Field label="Name" error="This name is taken" className="w-64"><Input defaultValue="Agent" /></Field> },
            { label: "label", node: <Label>Field label</Label> },
            { label: "select", node: <Select defaultValue="meta" className="w-44"><option value="meta">Meta</option><option value="google">Google</option></Select> },
          ]}
        />

        <Section
          id="controls"
          title="Controls"
          specs={[
            { label: "checkbox", node: <Checkbox defaultChecked /> },
            { label: "checkbox off", node: <Checkbox /> },
            { label: "separator", node: <Separator className="w-40" /> },
            { label: "skeleton", node: <Skeleton className="h-9 w-48" /> },
          ]}
        />

        <Section
          id="card"
          title="Card"
          specs={[
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
          ]}
        />

        <Section
          id="table"
          title="Table"
          note="Hairline rows and nothing else. The head is an eyebrow; machine values are mono."
          specs={[
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
          ]}
        />

        <Section
          id="tabs"
          title="Tabs"
          specs={[
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
          ]}
        />

        <Section
          id="overlays"
          title="Overlays"
          note="Click a trigger — each one opens the real overlay."
          specs={[
            { label: "dialog", node: <DialogDemo /> },
            { label: "sheet", node: <SheetDemo /> },
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
            {
              label: "tooltip",
              node: (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger>
                    <TooltipContent>Source credibility first, reach second</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ),
            },
          ]}
        />

        <Section
          id="misc"
          title="Type"
          specs={[
            { label: "display", node: <span className="font-display text-3xl font-semibold tracking-[-0.04em]">Display</span> },
            { label: "interface", node: <span className="text-base">Interface text</span> },
            { label: "mono", node: <span className="font-mono text-sm uppercase tracking-[0.06em]">machine value</span> },
          ]}
        />
      </main>
    </div>
  );
}

import { Inbox, LayoutGrid, Settings } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EmptyState } from "@/components/ui/empty-state";
import { ListItem, ListView } from "@/components/ui/list-item";
import { NavGroup, NavItem, NavSection, NavSeparator } from "@/components/ui/nav";
import { PageHeader } from "@/components/ui/page-header";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

import type { SectionDef } from "../lib";

const ROSTER = [
  ["Romy Vassilev", "Owner", "Active"],
  ["Jesse Rogers", "Admin", "Active"],
  ["Tyler Rogers", "Member", "Active"],
  ["Jenny Nicholson", "Admin", "Invited"],
] as const;

export const layoutSections: SectionDef[] = [
  {
    id: "card",
    title: "Card",
    note: "One elevation signal per step. A card is a fill — not a fill plus a stroke plus a shadow.",
    specs: [
      {
        label: "card",
        node: (
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Brand index</CardTitle>
              <CardDescription>Updated four minutes ago</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-foreground/70">
              Cleans, unifies and tags every mention before the API ever sees it.
            </CardContent>
          </Card>
        ),
      },
      { label: "aspect ratio", node: <AspectRatio ratio={16 / 9} className="w-56 rounded-md bg-foreground/[0.06]" /> },
      { label: "skeleton", node: <Skeleton className="h-9 w-48" /> },
      { label: "separator", node: <Separator className="w-40" /> },
      { label: "progress", node: <Progress value={62} className="w-56" /> },
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
      {
        label: "pagination",
        node: (
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure",
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
            <TabsContent value="owned" className="pt-3 text-sm text-foreground/60">
              Posts the brand published itself.
            </TabsContent>
            <TabsContent value="paid" className="pt-3 text-sm text-foreground/60">
              Creative pulled from the ad libraries.
            </TabsContent>
            <TabsContent value="earned" className="pt-3 text-sm text-foreground/60">
              What everyone else said.
            </TabsContent>
          </Tabs>
        ),
      },
      {
        label: "accordion",
        wide: true,
        node: (
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="a">
              <AccordionTrigger>How is a mention scored?</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60">
                Source credibility first, reach second.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>What counts as owned media?</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60">
                Anything posted from an account the brand controls.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        label: "collapsible",
        node: (
          <Collapsible>
            <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Show more</Button></CollapsibleTrigger>
            <CollapsibleContent className="pt-2 text-sm text-foreground/60">Hidden until asked for.</CollapsibleContent>
          </Collapsible>
        ),
      },
      { label: "scroll area", node: (
        <ScrollArea className="h-24 w-56 rounded-md border border-foreground/10 p-3 text-sm text-foreground/60">
          {Array.from({ length: 12 }, (_, i) => <div key={i}>Row {i + 1}</div>)}
        </ScrollArea>
      ) },
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    specs: [
      {
        label: "alert",
        wide: true,
        node: (
          <Alert className="max-w-md">
            <AlertTitle>Trial ends in four days</AlertTitle>
            <AlertDescription>Brands deactivate automatically when it lapses.</AlertDescription>
          </Alert>
        ),
      },
      {
        label: "empty state",
        wide: true,
        node: (
          <EmptyState
            icon={<Inbox className="h-6 w-6" />}
            title="No agents yet"
            description="Build one from a template, or start from scratch."
            action={<Button size="sm">New agent</Button>}
            size="section"
          />
        ),
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    specs: [
      {
        label: "page header",
        wide: true,
        node: (
          <PageHeader
            title="Team"
            subtitle="Who has access, in what capacity."
            actions={<Button size="sm">Invite</Button>}
          />
        ),
      },
      {
        label: "breadcrumb",
        node: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Team</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
      {
        label: "nav",
        node: (
          <NavGroup className="w-56">
            <NavSection label="Workspace" />
            <NavItem label="Overview" icon={<LayoutGrid className="h-4 w-4" />} active />
            <NavItem label="Agents" icon={<Inbox className="h-4 w-4" />} count={4} />
            <NavSeparator />
            <NavItem label="Settings" icon={<Settings className="h-4 w-4" />} />
          </NavGroup>
        ),
      },
      {
        label: "list view",
        wide: true,
        node: (
          <ListView className="max-w-md">
            <ListItem label="Competitive tracker" sublabel="Runs every Monday" meta={<Badge mono>Active</Badge>} />
            <ListItem label="Ad pause watcher" sublabel="Runs hourly" meta={<Badge mono variant="outline">Paused</Badge>} />
          </ListView>
        ),
      },
    ],
  },
];

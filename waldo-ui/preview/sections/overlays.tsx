import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster, toast } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import type { SectionDef } from "../lib";

/* Overlays are shown by their trigger: click one and the real overlay opens,
   which is the only way to judge its motion, backdrop and dismissal. */

export const overlaySections: SectionDef[] = [
  {
    id: "overlays",
    title: "Overlays",
    note: "Click a trigger — each one opens the real overlay.",
    specs: [
      {
        label: "dialog",
        node: (
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a member</DialogTitle>
                <DialogDescription>They join with the role you pick.</DialogDescription>
              </DialogHeader>
              <DialogBody className="text-sm text-foreground/60">Body content.</DialogBody>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Send invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
      {
        label: "alert dialog",
        node: (
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive">Alert dialog</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove from team?</AlertDialogTitle>
                <AlertDialogDescription>They lose access immediately.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Remove</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
      {
        label: "sheet",
        node: (
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow the roster.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ),
      },
      {
        label: "drawer",
        node: (
          <Drawer>
            <DrawerTrigger asChild><Button variant="outline">Drawer</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Member</DrawerTitle>
                <DrawerDescription>Detail, without leaving the page.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        ),
      },
      {
        label: "popover",
        node: (
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Methodology</PopoverTitle>
                <PopoverDescription>Source credibility first, reach second.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ),
      },
      {
        label: "dropdown",
        node: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Dropdown</Button></DropdownMenuTrigger>
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
        label: "context menu",
        node: (
          <ContextMenu>
            <ContextMenuTrigger className="rounded-md border border-dashed border-foreground/20 px-4 py-2 text-sm text-foreground/60">
              Right-click me
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Copy link</ContextMenuItem>
              <ContextMenuItem>Remove</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
      {
        label: "hover card",
        node: (
          <HoverCard>
            <HoverCardTrigger asChild><Button variant="link">Hover card</Button></HoverCardTrigger>
            <HoverCardContent className="text-sm text-foreground/60">Detail on hover.</HoverCardContent>
          </HoverCard>
        ),
      },
      {
        label: "tooltip",
        node: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger>
              <TooltipContent>Short, factual, no punctuation.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
      {
        label: "toast",
        node: (
          <>
            <Button variant="outline" onClick={() => toast("Invite sent")}>Toast</Button>
            <Toaster />
          </>
        ),
      },
      {
        label: "command",
        wide: true,
        node: (
          <Command className="max-w-sm rounded-md border border-foreground/10">
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup heading="Brands">
                <CommandItem>Rhode</CommandItem>
                <CommandItem>Glossier</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
      },
    ],
  },
];

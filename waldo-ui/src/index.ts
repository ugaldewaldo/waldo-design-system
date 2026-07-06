// ── Utils ──────────────────────────────────────────────────────────────────────
export { cn } from "./lib/utils";

// ── Core ───────────────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Input, Textarea, Field } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";

export { Badge, badgeVariants } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./components/ui/avatar";

export { Checkbox, CheckboxField } from "./components/ui/checkbox";

export { Switch } from "./components/ui/switch";

export { SegmentedControl } from "./components/ui/segmented-control";
export type { SegmentedControlProps, SegmentedOption } from "./components/ui/segmented-control";

export { Tag, TagInput, tagVariants } from "./components/ui/tag";

export { FilterChip } from "./components/ui/filter-chip";
export type { FilterChipProps } from "./components/ui/filter-chip";

export { ListItem, ListView } from "./components/ui/list-item";

export { Separator } from "./components/ui/separator";
export type { ListItemProps, ListViewProps } from "./components/ui/list-item";

export { FileInput } from "./components/ui/file-input";
export type { FileInputProps, FileItem } from "./components/ui/file-input";
export type { TagProps, TagInputProps } from "./components/ui/tag";

export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
  SelectScrollUpButton, SelectScrollDownButton,
} from "./components/ui/select";

// ── Overlay ────────────────────────────────────────────────────────────────────
export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogBody,
  DialogTitle, DialogDescription,
} from "./components/ui/dialog";

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from "./components/ui/dropdown-menu";

export {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "./components/ui/command";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";

export { Toaster, toast } from "./components/ui/toast";
export { WizardDialog, WizardDialogTrigger, WizardDialogContent, WizardProgress } from "./components/ui/wizard-dialog";
export type { WizardDialogContentProps } from "./components/ui/wizard-dialog";

export { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
export { EmptyState } from "./components/ui/empty-state";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
export { RadioGroup, RadioGroupItem, RadioGroupField } from "./components/ui/radio-group";
export { DotsLoader, ShimmerText, TextCursor } from "./components/ui/loader";
export { StatusSpinner } from "./components/ui/status-spinner";
export { NavItem, NavSection, NavSeparator, NavGroup, NavPanel } from "./components/ui/nav";
export type { NavItemProps } from "./components/ui/nav";
export type { SpinnerStatus } from "./components/ui/status-spinner";
export type { RadioGroupItemProps } from "./components/ui/radio-group";
export { Slider } from "./components/ui/slider";
export { CopyLink } from "./components/ui/copy-link";
export { AdvancedSection } from "./components/ui/advanced-section";
export type { AdvancedSectionProps } from "./components/ui/advanced-section";
export type { CopyLinkProps } from "./components/ui/copy-link";
export { Icon } from "./components/ui/icon";
export type { IconProps, IconSize } from "./components/ui/icon";

// Waldo custom icons — canvas 16px
export {
  IconRadioEmpty, IconCheckFilled, IconCheckboxChecked, IconCircleCheck,
  IconTrash, IconForward, IconExport,
  IconCircleChevronUp, IconCircleChevronDown,
  IconSliders, IconUndo, IconRedo, IconRefresh, IconCycle, IconFilter,
} from "./components/ui/icons/index";
export type { TabsListProps, TabsTriggerProps } from "./components/ui/tabs";
export type { EmptyStateProps } from "./components/ui/empty-state";
export type { AlertProps } from "./components/ui/alert";

// ── Data ───────────────────────────────────────────────────────────────────────
export {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
} from "./components/ui/table";

// ── shadcn additions ───────────────────────────────────────────────────────────
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";

export {
  AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay,
  AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogMedia, AlertDialogAction, AlertDialogCancel,
} from "./components/ui/alert-dialog";

export { AspectRatio } from "./components/ui/aspect-ratio";

export {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "./components/ui/breadcrumb";

export { Calendar, CalendarDayButton } from "./components/ui/calendar";

export {
  Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent,
} from "./components/ui/card";

export {
  type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "./components/ui/carousel";

export {
  type ChartConfig,
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, ChartStyle,
} from "./components/ui/chart";

export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/ui/collapsible";

export {
  Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem,
  ComboboxGroup, ComboboxLabel, ComboboxEmpty, ComboboxSeparator,
  ComboboxTrigger, ComboboxValue,
} from "./components/ui/combobox";

export {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator,
  ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup,
} from "./components/ui/context-menu";

export {
  Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose,
  DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
} from "./components/ui/drawer";

export {
  useFormField, Form, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage, FormField,
} from "./components/ui/form";

export { HoverCard, HoverCardTrigger, HoverCardContent } from "./components/ui/hover-card";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./components/ui/input-otp";

export { Kbd, KbdGroup } from "./components/ui/kbd";

export { Label } from "./components/ui/label";

export {
  Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "./components/ui/menubar";

export {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent,
  NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator,
  NavigationMenuViewport, navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";

export {
  Pagination, PaginationContent, PaginationLink, PaginationItem,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "./components/ui/pagination";

export {
  Popover, PopoverTrigger, PopoverContent, PopoverAnchor,
  PopoverHeader, PopoverTitle, PopoverDescription,
} from "./components/ui/popover";

export { Progress } from "./components/ui/progress";

export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

export {
  Sheet, SheetTrigger, SheetClose, SheetContent,
  SheetHeader, SheetFooter, SheetTitle, SheetDescription,
} from "./components/ui/sheet";

export {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInput, SidebarInset, SidebarMenu,
  SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar,
} from "./components/ui/sidebar";

export { Skeleton } from "./components/ui/skeleton";

export { Toaster as SonnerToaster } from "./components/ui/sonner";

export { Toggle, toggleVariants } from "./components/ui/toggle";

export { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

export { useIsMobile } from "./hooks/use-mobile";

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
export { NavItem, NavSection, NavSeparator, NavGroup, NavPanel } from "./components/ui/nav-item";
export type { NavItemProps } from "./components/ui/nav-item";
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

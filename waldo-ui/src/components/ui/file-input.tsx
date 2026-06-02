import * as React from "react";
import { Trash2, FileText, FileSpreadsheet, FileImage, File } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo FileInput — values from Figma DS (node 83838:481260, Section 2)
//
// Zone       → zinc-850 #242528 · border-radius 24px · padding py-6
// Zone text  → "Click to upload or drag and drop" green-600 #2db4b4
// Optional   → zinc-200/50%
// Files label → green-600 #2db4b4
// File row   → icon + name + trash icon
// Drag over  → lighter bg + teal border
// ─────────────────────────────────────────────────────────────────────────────

export interface FileItem {
  file: File;
  id: string;
  /** Error message shown in warning orange — e.g. "Unable to process" */
  error?: string;
}

export interface FileInputProps {
  value?: FileItem[];
  onChange?: (files: FileItem[]) => void;
  accept?: string;
  multiple?: boolean;
  /** slim = 52px (compact) · default = 68px */
  size?: "default" | "slim";
  optional?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["pdf"].includes(ext ?? ""))
    return <FileText className="h-4 w-4 shrink-0 text-[rgba(210,211,211,0.50)]" />;
  if (["xls", "xlsx", "csv"].includes(ext ?? ""))
    return <FileSpreadsheet className="h-4 w-4 shrink-0 text-[rgba(210,211,211,0.50)]" />;
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext ?? ""))
    return <FileImage className="h-4 w-4 shrink-0 text-[rgba(210,211,211,0.50)]" />;
  return <File className="h-4 w-4 shrink-0 text-[rgba(210,211,211,0.50)]" />;
}

function FileInput({
  value = [],
  onChange,
  accept,
  multiple = true,
  size = "default" as "default" | "slim",
  optional = false,
  disabled = false,
  className,
  placeholder,  // auto-set based on size if not provided
}: FileInputProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles || !onChange) return;
    const added: FileItem[] = Array.from(newFiles).map((f) => ({
      file: f,
      id: Math.random().toString(36).slice(2),
    }));
    onChange(multiple ? [...value, ...added] : added);
  }

  function removeFile(id: string) {
    onChange?.(value.filter((f) => f.id !== id));
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() {
    setIsDragging(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex items-center justify-center gap-2 cursor-pointer select-none",
          size === "slim" ? "rounded-2xl px-4 py-3" : "rounded-2xl px-4 py-6",
          "bg-[#242528]",
          "transition-colors duration-100",
          "focus-visible:outline-none",
          isDragging && "bg-[#2d2f33] border border-[#265152]",
          disabled && "opacity-40 pointer-events-none",
        )}
      >
        <span className="text-sm font-normal tracking-[-0.02em] text-[#2db4b4]">
          {placeholder ?? (size === "slim" ? "Drag and drop files here or click to browse." : "Click to upload or drag and drop")}
        </span>
        {optional && (
          <span className="text-sm text-[rgba(210,211,211,0.50)]">*Optional</span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
          onClick={(e) => {
            // reset so same file can be re-added
            (e.target as HTMLInputElement).value = "";
          }}
        />
      </div>

      {/* File list */}
      {value.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-normal tracking-[-0.02em] text-[#2db4b4] px-1">
            Files
          </span>
          <div className="flex flex-col gap-0.5">
            {value.map(({ file, id, error }) => (
              <div
                key={id}
                className="flex items-center gap-2 px-1 py-1.5 rounded-lg transition-colors group"
              >
                {/* icon + name turn teal on hover (unless error) */}
                <span className={cn(
                  "transition-colors flex-shrink-0",
                  error ? "text-[rgba(210,211,211,0.40)]" : "text-[rgba(210,211,211,0.40)] group-hover:text-[#2db4b4]"
                )}>
                  {getFileIcon(file.name)}
                </span>
                <span className={cn(
                  "text-sm font-normal tracking-[-0.02em] whitespace-nowrap transition-colors",
                  error ? "text-[rgba(210,211,211,0.70)]" : "text-[rgba(210,211,211,0.70)] group-hover:text-[#2db4b4]"
                )}>
                  {file.name}
                </span>
                {error && (
                  <span className="text-sm font-normal tracking-[-0.02em] text-[#e76638] shrink-0">
                    {error}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-[rgba(210,211,211,0.40)] hover:text-[rgba(210,211,211,0.80)]"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { FileInput };

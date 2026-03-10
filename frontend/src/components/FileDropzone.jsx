import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";

/**
 * Reusable drag-drop file picker for PDF / TXT JD files.
 * Props:
 *   file       — currently selected File object (or null)
 *   onFile     — callback(File | null) when file changes
 *   onError    — callback(string) on validation error
 *   disabled   — disables interaction when true
 */
const FileDropzone = ({ file, onFile, onError, disabled = false }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validate = (selected) => {
    if (!selected) return;

    if (
      selected.type !== "application/pdf" &&
      selected.type !== "text/plain"
    ) {
      onError?.("Only PDF or TXT files are allowed");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (selected.size > maxSize) {
      onError?.("File size must be less than 10MB");
      return;
    }

    onFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validate(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={disabled ? undefined : handleDrop}
      className={`border-2 border-dashed rounded-2xl min-h-[280px]
        flex flex-col items-center justify-center text-center
        transition-all duration-200
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-muted hover:border-primary/50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        hidden
        disabled={disabled}
        onChange={(e) => validate(e.target.files[0])}
      />

      <AnimatePresence mode="wait">
        {file ? (
          /* ── File selected ──────────────────────────────────────────── */
          <motion.div
            key="file-selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-4 px-6"
          >
            <div className="flex items-center gap-3 bg-muted rounded-xl px-5 py-3">
              <FileText className="h-8 w-8 text-primary shrink-0" />
              <div className="text-left">
                <p className="text-base font-semibold truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFile(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="ml-3 text-muted-foreground hover:text-foreground transition-colors"
                  title="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {!disabled && (
              <label
                htmlFor="dz-input"
                onClick={() => inputRef.current?.click()}
                className="text-sm text-primary hover:underline cursor-pointer"
              >
                Choose a different file
              </label>
            )}
          </motion.div>
        ) : (
          /* ── Empty prompt ────────────────────────────────────────────── */
          <motion.label
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`px-6 flex flex-col items-center gap-3 select-none ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !disabled && inputRef.current?.click()}
          >
            <div className="rounded-full bg-muted p-5">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base font-semibold">Drag &amp; drop your JD here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse · or paste (Ctrl + V)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                PDF and TXT files up to 10 MB
              </p>
            </div>
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileDropzone;

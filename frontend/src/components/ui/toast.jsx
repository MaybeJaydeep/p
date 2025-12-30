import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 11);
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (message, duration) => showToast(message, "success", duration);
  const error = (message, duration) => showToast(message, "error", duration);
  const info = (message, duration) => showToast(message, "info", duration);
  const warning = (message, duration) => showToast(message, "warning", duration);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    warning: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-in",
        bgColors[type]
      )}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};


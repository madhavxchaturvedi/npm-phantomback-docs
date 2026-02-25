import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, X, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ToastContext = createContext(null);

const icons = {
  success: <Check size={14} className="text-emerald-400" />,
  copied: <Copy size={14} className="text-emerald-400" />,
  info: <Info size={14} className="text-blue-400" />,
  warning: <AlertTriangle size={14} className="text-amber-400" />,
  error: <X size={14} className="text-red-400" />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 2500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container — bottom-right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'pointer-events-auto flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm shadow-lg backdrop-blur-xl',
                'border-border/60 bg-card/95 text-foreground'
              )}
            >
              {icons[toast.type] || icons.success}
              <span className="font-medium">{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="ml-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

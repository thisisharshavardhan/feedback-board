import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-medium backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        toast.type === 'success'
          ? 'bg-[#0c1a14]/85 border-emerald-500/25 text-white'
          : 'bg-[#1a0c0c]/85 border-red-400/25 text-white'
      )}
    >
      {toast.type === 'success' ? (
        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
      )}
      <span className="flex-1 text-white/85">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function addToast(type: ToastType, message: string) {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
  }

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return {
    toasts,
    dismiss,
    success: (msg: string) => addToast('success', msg),
    error: (msg: string) => addToast('error', msg),
  };
}

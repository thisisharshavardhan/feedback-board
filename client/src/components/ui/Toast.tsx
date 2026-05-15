import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium',
        'animate-in slide-in-from-bottom-2 fade-in duration-200',
        toast.type === 'success'
          ? 'bg-white border-[#e5e5e5] text-[#0a0a0a]'
          : 'bg-white border-red-200 text-red-700'
      )}
    >
      {toast.type === 'success' ? (
        <CheckCircle className="w-4 h-4 mt-0.5 text-[#0a0a0a] flex-shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
      )}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors flex-shrink-0"
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
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
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

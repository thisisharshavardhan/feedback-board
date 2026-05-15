import { ReactNode } from 'react';
import { Header } from './Header';
import { ToastContainer, useToast } from '../ui/Toast';

interface LayoutProps {
  children: (props: {
    onSubmitClick: () => void;
    toast: ReturnType<typeof useToast>;
  }) => ReactNode;
  onSubmitClick: () => void;
}

export function Layout({ children, onSubmitClick }: LayoutProps) {
  const toast = useToast();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onSubmitClick={onSubmitClick} />
      <main className="max-w-5xl mx-auto px-6 py-8">
        {children({ onSubmitClick, toast })}
      </main>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}

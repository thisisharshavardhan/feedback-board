import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-[#0c0c20]/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.18)] border border-white/[0.10] p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-start justify-between mb-5">
            <div>
              <RadixDialog.Title className="text-lg font-semibold text-white">
                {title}
              </RadixDialog.Title>
              {description && (
                <RadixDialog.Description className="mt-1 text-sm text-white/50">
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors ml-4 flex-shrink-0">
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          </div>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

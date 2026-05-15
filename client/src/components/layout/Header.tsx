import { useEffect, useRef, useState } from 'react';
import { Plus, ChevronDown, User, ShieldCheck, Check, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../utils/cn';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface HeaderProps {
  onSubmitClick: () => void;
}

function AdminWarningDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] p-6 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-[#0a0a0a]" style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <RadixDialog.Title className="text-base font-semibold text-[#0a0a0a]">
                  Admin Mode — Demo Only
                </RadixDialog.Title>
                <RadixDialog.Description className="text-xs text-[#6b6b6b] mt-0.5">
                  No authentication required in this demo
                </RadixDialog.Description>
              </div>
            </div>
            <RadixDialog.Close className="p-1.5 rounded-lg text-[#a3a3a3] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors ml-2 flex-shrink-0">
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-4 mb-5">
            <p className="text-sm text-[#3a3a3a] leading-relaxed">
              Switching to admin mode lets you <span className="font-medium text-[#0a0a0a]">change feedback statuses</span> and <span className="font-medium text-[#0a0a0a]">delete items</span>.
            </p>
            <p className="text-sm text-[#6b6b6b] leading-relaxed mt-2">
              In a real application, this would require secure authentication. This is for demonstration purposes only.
            </p>
          </div>

          <div className="flex gap-3">
            <RadixDialog.Close asChild>
              <Button variant="secondary" className="flex-1">Cancel</Button>
            </RadixDialog.Close>
            <Button
              className="flex-1"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Enter Admin Mode
            </Button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const { isAdmin, enterAdminMode, exitAdminMode } = useAdmin();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium border transition-all duration-150 select-none',
            isAdmin
              ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] hover:bg-[#1a1a1a]'
              : 'bg-white text-[#0a0a0a] border-[#e5e5e5] hover:border-[#c0c0c0] hover:bg-[#fafafa]'
          )}
        >
          {isAdmin ? (
            <ShieldCheck className="w-3.5 h-3.5" />
          ) : (
            <User className="w-3.5 h-3.5" />
          )}
          {isAdmin ? 'Admin' : 'User'}
          <ChevronDown
            className={cn('w-3 h-3 transition-transform duration-150', open && 'rotate-180', isAdmin ? 'text-white/70' : 'text-[#a3a3a3]')}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#e5e5e5] rounded-xl shadow-lg overflow-hidden z-50 py-1">
            <button
              onClick={() => {
                exitAdminMode();
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left',
                !isAdmin ? 'text-[#0a0a0a] bg-[#f5f5f5]' : 'text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
              )}
            >
              <User className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 font-medium">User</span>
              {!isAdmin && <Check className="w-3.5 h-3.5 text-[#0a0a0a]" />}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                if (!isAdmin) setWarningOpen(true);
              }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left',
                isAdmin ? 'text-[#0a0a0a] bg-[#f5f5f5]' : 'text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 font-medium">Admin</span>
              {isAdmin && <Check className="w-3.5 h-3.5 text-[#0a0a0a]" />}
            </button>
            {isAdmin && (
              <>
                <div className="mx-3 my-1 border-t border-[#f0f0f0]" />
                <button
                  onClick={() => {
                    exitAdminMode();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a] transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-medium">Exit Admin Mode</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <AdminWarningDialog
        open={warningOpen}
        onOpenChange={setWarningOpen}
        onConfirm={enterAdminMode}
      />
    </>
  );
}

export function Header({ onSubmitClick }: HeaderProps) {
  const { isAdmin, exitAdminMode } = useAdmin();

  return (
    <div className="sticky top-0 z-30">
      <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#0a0a0a] flex-shrink-0" />
            <span className="text-sm font-semibold text-[#0a0a0a] tracking-tight">
              Feedback
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RoleSwitcher />
            <Button size="sm" onClick={onSubmitClick}>
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              Submit
            </Button>
          </div>
        </div>
      </header>

      {isAdmin && (
        <div className="bg-[#0a0a0a] border-b border-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
              <p className="text-xs text-white/80 font-medium">
                Admin mode active — for demo purposes only. No real authentication.
              </p>
            </div>
            <button
              onClick={exitAdminMode}
              className="text-xs text-white/50 hover:text-white transition-colors font-medium flex-shrink-0"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

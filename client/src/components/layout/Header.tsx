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
        <RadixDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-[#0e0e10]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-6 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.09] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-white/38" />
              </div>
              <div>
                <RadixDialog.Title className="text-base font-semibold text-white/88">
                  Admin Mode — Demo Only
                </RadixDialog.Title>
                <RadixDialog.Description className="text-xs text-white/35 mt-0.5">
                  No authentication in this demo
                </RadixDialog.Description>
              </div>
            </div>
            <RadixDialog.Close className="p-1.5 rounded-lg text-white/22 hover:text-white/60 hover:bg-white/[0.07] transition-colors ml-2 flex-shrink-0">
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 mb-5">
            <p className="text-sm text-white/55 leading-relaxed">
              Switching to admin mode lets you{' '}
              <span className="text-white/82 font-medium">change feedback statuses</span> and{' '}
              <span className="text-white/82 font-medium">delete items</span>.
            </p>
            <p className="text-sm text-white/28 leading-relaxed mt-2">
              In a real application this would require secure authentication. This is for demonstration purposes only.
            </p>
          </div>

          <div className="flex gap-3">
            <RadixDialog.Close asChild>
              <Button variant="secondary" className="flex-1">Cancel</Button>
            </RadixDialog.Close>
            <Button
              className="flex-1"
              onClick={() => { onConfirm(); onOpenChange(false); }}
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
            'inline-flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-medium border transition-all duration-200 select-none',
            isAdmin
              ? 'bg-white/[0.07] border-white/[0.12] text-white/72 hover:bg-white/[0.10]'
              : 'bg-white/[0.04] border-white/[0.08] text-white/42 hover:bg-white/[0.07] hover:text-white/65 hover:border-white/[0.13]'
          )}
        >
          {isAdmin
            ? <ShieldCheck className="w-3.5 h-3.5 text-blue-400/75" />
            : <User className="w-3.5 h-3.5" />}
          {isAdmin ? 'Admin' : 'User'}
          <ChevronDown className={cn('w-3 h-3 transition-transform duration-150 opacity-45', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 w-44 bg-[#0e0e10]/95 backdrop-blur-xl border border-white/[0.09] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.65)] overflow-hidden z-50 py-1">
            <button
              onClick={() => { exitAdminMode(); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left',
                !isAdmin ? 'text-white/78 bg-white/[0.05]' : 'text-white/38 hover:bg-white/[0.05] hover:text-white/68'
              )}
            >
              <User className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 font-medium">User</span>
              {!isAdmin && <Check className="w-3.5 h-3.5 text-blue-400" />}
            </button>
            <button
              onClick={() => { setOpen(false); if (!isAdmin) setWarningOpen(true); }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left',
                isAdmin ? 'text-white/78 bg-white/[0.05]' : 'text-white/38 hover:bg-white/[0.05] hover:text-white/68'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 font-medium">Admin</span>
              {isAdmin && <Check className="w-3.5 h-3.5 text-blue-400" />}
            </button>
            {isAdmin && (
              <>
                <div className="mx-3 my-1 border-t border-white/[0.06]" />
                <button
                  onClick={() => { exitAdminMode(); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/28 hover:bg-white/[0.05] hover:text-white/58 transition-colors text-left"
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
      <header className="bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1d4ed8] to-[#6d28d9] flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
            <span className="text-sm font-semibold text-white/78 tracking-tight">
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
        <div className="bg-blue-500/[0.05] border-b border-blue-500/[0.10]">
          <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400/45 flex-shrink-0" />
              <p className="text-xs text-blue-300/45 font-medium">
                Admin mode active — for demo purposes only
              </p>
            </div>
            <button
              onClick={exitAdminMode}
              className="text-xs text-blue-400/38 hover:text-blue-300/65 transition-colors font-medium flex-shrink-0"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

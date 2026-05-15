import { useState } from 'react';
import { ChevronUp, Trash2 } from 'lucide-react';
import { FeedbackItem } from '../../api/types';
import { useUpvote } from '../../hooks/useUpvote';
import { useAdmin } from '../../context/AdminContext';
import { deleteFeedback } from '../../api/feedback';
import { StatusBadge } from './StatusBadge';
import { StatusSelect } from '../admin/StatusSelect';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface FeedbackDetailProps {
  item: FeedbackItem;
  onStatusChange: () => void;
  onDelete: () => void;
}

function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  deleting,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-[#0e0e10]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-6 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95">
          <div className="flex items-start justify-between mb-4">
            <div>
              <RadixDialog.Title className="text-base font-semibold text-white/88">
                Delete this feedback?
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-white/38 mt-1">
                This action cannot be undone.
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="p-1.5 rounded-lg text-white/22 hover:text-white/60 hover:bg-white/[0.07] transition-colors ml-2 flex-shrink-0">
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          </div>
          <div className="flex gap-3">
            <RadixDialog.Close asChild>
              <Button variant="secondary" className="flex-1" disabled={deleting}>
                Cancel
              </Button>
            </RadixDialog.Close>
            <Button
              variant="danger"
              className="flex-1"
              onClick={onConfirm}
              disabled={deleting}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export function FeedbackDetail({ item, onStatusChange, onDelete }: FeedbackDetailProps) {
  const { upvotes, hasVoted, loading, toggle } = useUpvote(item.id, {
    upvotes: item.upvotes,
    hasVoted: item.hasVoted,
  });
  const { isAdmin, adminKey } = useAdmin();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createdAt = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteFeedback(item.id, adminKey);
      onDelete();
    } catch {
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  return (
    <>
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5">
            {/* Upvote */}
            <button
              onClick={toggle}
              disabled={loading}
              aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
              className={cn(
                'flex flex-col items-center gap-1.5 w-14 py-3.5 rounded-xl border transition-all duration-200 flex-shrink-0',
                hasVoted
                  ? 'bg-white border-white/0 text-[#080808]'
                  : 'bg-white/[0.04] border-white/[0.09] text-white/28 hover:border-white/[0.18] hover:text-white/65 hover:bg-white/[0.07]',
                loading && 'opacity-40 cursor-not-allowed'
              )}
            >
              <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-sm font-bold leading-none tabular-nums">{upvotes}</span>
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1 className={cn(
                  'text-xl font-semibold leading-snug',
                  item.status === 'done' ? 'line-through text-white/22' : 'text-white/85'
                )}>
                  {item.title}
                </h1>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={item.status} />
                  {isAdmin && (
                    <StatusSelect
                      currentStatus={item.status}
                      feedbackId={item.id}
                      adminKey={adminKey}
                      onSuccess={onStatusChange}
                    />
                  )}
                </div>
              </div>
              <p className="mt-1 text-xs text-white/22">{createdAt}</p>
              <p className="mt-5 text-sm text-white/48 leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="border-t border-white/[0.06] px-6 sm:px-8 py-4 flex justify-end">
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/22 hover:text-red-400 hover:bg-red-500/[0.09] rounded-lg transition-all duration-150"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete feedback
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </>
  );
}

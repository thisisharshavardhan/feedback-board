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
        <RadixDialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] p-6 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95">
          <div className="flex items-start justify-between mb-4">
            <div>
              <RadixDialog.Title className="text-base font-semibold text-[#0a0a0a]">
                Delete feedback?
              </RadixDialog.Title>
              <RadixDialog.Description className="text-sm text-[#6b6b6b] mt-1">
                This action cannot be undone.
              </RadixDialog.Description>
            </div>
            <RadixDialog.Close className="p-1.5 rounded-lg text-[#a3a3a3] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors ml-2 flex-shrink-0">
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          </div>
          <div className="flex gap-3">
            <RadixDialog.Close asChild>
              <Button variant="secondary" className="flex-1" disabled={deleting}>
                Cancel
              </Button>
            </RadixDialog.Close>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
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
      <div className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5">
            <button
              onClick={toggle}
              disabled={loading}
              aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
              className={cn(
                'flex flex-col items-center gap-1.5 w-14 py-3 rounded-xl border transition-all duration-150 flex-shrink-0',
                hasVoted
                  ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
                  : 'bg-white border-[#e5e5e5] text-[#a3a3a3] hover:border-[#0a0a0a] hover:text-[#0a0a0a]',
                loading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-sm font-bold leading-none tabular-nums">{upvotes}</span>
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1
                  className={cn(
                    'text-xl font-semibold text-[#0a0a0a] leading-snug',
                    item.status === 'done' && 'line-through text-[#a3a3a3]'
                  )}
                >
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
              <p className="mt-1 text-xs text-[#b0b0b0]">{createdAt}</p>
              <p className="mt-5 text-sm text-[#4a4a4a] leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="border-t border-[#f5f5f5] px-6 sm:px-8 py-4 flex justify-end">
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#a3a3a3] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150"
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

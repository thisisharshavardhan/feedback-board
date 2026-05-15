import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Trash2 } from 'lucide-react';
import { FeedbackSummary } from '../../api/types';
import { useUpvote } from '../../hooks/useUpvote';
import { useAdmin } from '../../context/AdminContext';
import { deleteFeedback } from '../../api/feedback';
import { StatusBadge } from './StatusBadge';
import { cn } from '../../utils/cn';

interface FeedbackCardProps {
  item: FeedbackSummary;
  onDelete: (id: string) => void;
}

export function FeedbackCard({ item, onDelete }: FeedbackCardProps) {
  const { upvotes, hasVoted, loading, toggle } = useUpvote(item.id, {
    upvotes: item.upvotes,
    hasVoted: item.hasVoted,
  });
  const { isAdmin, adminKey } = useAdmin();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteFeedback(item.id, adminKey);
      onDelete(item.id);
    } catch {
      setDeleting(false);
      setConfirmingDelete(false);
    }
  }

  return (
    <div className="group flex items-stretch gap-0 bg-white border border-[#e5e5e5] rounded-xl transition-all duration-150 hover:border-[#c8c8c8] hover:shadow-sm overflow-hidden">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        disabled={loading}
        aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
        className={cn(
          'flex flex-col items-center justify-center gap-1 w-14 py-4 border-r transition-all duration-150 flex-shrink-0',
          hasVoted
            ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
            : 'bg-white border-[#e5e5e5] text-[#a3a3a3] hover:text-[#0a0a0a] hover:bg-[#fafafa]',
          loading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
        <span className="text-xs font-bold leading-none tabular-nums">{upvotes}</span>
      </button>

      <Link to={`/feedback/${item.id}`} className="flex-1 min-w-0 px-4 py-3.5 flex flex-col justify-center">
        <h3
          className={cn(
            'text-sm font-medium text-[#0a0a0a] leading-snug',
            item.status === 'done' && 'line-through text-[#a3a3a3]'
          )}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-[#b0b0b0]">{date}</p>
      </Link>

      <div className="flex flex-col items-end justify-center gap-2 pr-4 py-3.5 flex-shrink-0">
        <StatusBadge status={item.status} />

        {isAdmin && (
          confirmingDelete ? (
            <div className="flex items-center gap-1.5" onClick={(e) => e.preventDefault()}>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Confirm'}
              </button>
              <span className="text-[#e0e0e0]">·</span>
              <button
                onClick={(e) => { e.preventDefault(); setConfirmingDelete(false); }}
                className="text-xs text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmingDelete(true); }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#c0c0c0] hover:text-red-500 hover:bg-red-50 transition-all duration-150"
              aria-label="Delete feedback"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )
        )}
      </div>
    </div>
  );
}

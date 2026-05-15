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
    <div className="group flex items-stretch bg-white/[0.03] border border-white/[0.07] rounded-xl transition-all duration-200 hover:-translate-y-px hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.06),0_8px_24px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Upvote column */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(); }}
        disabled={loading}
        aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
        className={cn(
          'flex flex-col items-center justify-center gap-1 w-14 py-4 border-r transition-all duration-200 flex-shrink-0',
          hasVoted
            ? 'bg-white border-white/0 text-[#080808]'
            : 'border-white/[0.06] text-white/22 hover:text-white/65 hover:bg-white/[0.04]',
          loading && 'opacity-40 cursor-not-allowed'
        )}
      >
        <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
        <span className="text-xs font-bold leading-none tabular-nums">{upvotes}</span>
      </button>

      {/* Content */}
      <Link to={`/feedback/${item.id}`} className="flex-1 min-w-0 px-4 py-3.5 flex flex-col justify-center">
        <h3
          className={cn(
            'text-sm font-medium leading-snug',
            item.status === 'done'
              ? 'line-through text-white/22'
              : 'text-white/78'
          )}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-white/22">{date}</p>
      </Link>

      {/* Right side: badge + delete */}
      <div className="flex flex-col items-end justify-center gap-2 pr-4 py-3.5 flex-shrink-0">
        <StatusBadge status={item.status} />

        {isAdmin && (
          confirmingDelete ? (
            <div className="flex items-center gap-1.5" onClick={(e) => e.preventDefault()}>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Confirm'}
              </button>
              <span className="text-white/15">·</span>
              <button
                onClick={(e) => { e.preventDefault(); setConfirmingDelete(false); }}
                className="text-xs text-white/28 hover:text-white/60 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmingDelete(true); }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-white/18 hover:text-red-400 hover:bg-red-500/[0.09] transition-all duration-150"
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

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
    <div className="group flex items-stretch bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-2xl transition-all duration-200 hover:bg-white/[0.09] hover:border-white/[0.16] hover:shadow-[0_0_30px_rgba(139,92,246,0.10)] overflow-hidden">
      {/* Upvote column */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(); }}
        disabled={loading}
        aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
        className={cn(
          'flex flex-col items-center justify-center gap-1 w-14 py-4 border-r transition-all duration-200 flex-shrink-0',
          hasVoted
            ? 'bg-gradient-to-b from-violet-600/80 to-fuchsia-600/80 border-violet-500/30 text-white'
            : 'border-white/[0.08] text-white/30 hover:text-white/80 hover:bg-white/[0.06]',
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
              ? 'line-through text-white/30'
              : 'text-white/85'
          )}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-white/30">{date}</p>
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
              <span className="text-white/20">·</span>
              <button
                onClick={(e) => { e.preventDefault(); setConfirmingDelete(false); }}
                className="text-xs text-white/35 hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmingDelete(true); }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
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

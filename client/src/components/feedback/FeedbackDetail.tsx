import { ChevronUp } from 'lucide-react';
import { FeedbackItem } from '../../api/types';
import { useUpvote } from '../../hooks/useUpvote';
import { StatusBadge } from './StatusBadge';
import { StatusSelect } from '../admin/StatusSelect';
import { cn } from '../../utils/cn';

interface FeedbackDetailProps {
  item: FeedbackItem;
  onStatusChange: () => void;
}

export function FeedbackDetail({ item, onStatusChange }: FeedbackDetailProps) {
  const { upvotes, hasVoted, loading, toggle } = useUpvote(item.id, {
    upvotes: item.upvotes,
    hasVoted: item.hasVoted,
  });

  const adminKey = localStorage.getItem('adminKey');

  const createdAt = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8">
      <div className="flex items-start gap-6">
        <button
          onClick={toggle}
          disabled={loading}
          aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
          className={cn(
            'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all duration-150 flex-shrink-0',
            hasVoted
              ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
              : 'bg-white border-[#e5e5e5] text-[#6b6b6b] hover:border-[#0a0a0a] hover:text-[#0a0a0a]',
            loading && 'opacity-60 cursor-not-allowed'
          )}
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm font-bold leading-none">{upvotes}</span>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1
              className={cn(
                'text-xl font-semibold text-[#0a0a0a] leading-snug',
                item.status === 'done' && 'line-through text-[#6b6b6b]'
              )}
            >
              {item.title}
            </h1>
            <div className="flex items-center gap-2">
              <StatusBadge status={item.status} />
              {adminKey && (
                <StatusSelect
                  currentStatus={item.status}
                  feedbackId={item.id}
                  adminKey={adminKey}
                  onSuccess={onStatusChange}
                />
              )}
            </div>
          </div>
          <p className="mt-1 text-xs text-[#a3a3a3]">{createdAt}</p>
          <p className="mt-4 text-sm text-[#6b6b6b] leading-relaxed whitespace-pre-wrap">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

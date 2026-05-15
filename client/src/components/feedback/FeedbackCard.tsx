import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { FeedbackSummary } from '../../api/types';
import { useUpvote } from '../../hooks/useUpvote';
import { StatusBadge } from './StatusBadge';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface FeedbackCardProps {
  item: FeedbackSummary;
}

export function FeedbackCard({ item }: FeedbackCardProps) {
  const { upvotes, hasVoted, loading, toggle } = useUpvote(item.id, {
    upvotes: item.upvotes,
    hasVoted: item.hasVoted,
  });

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="group flex items-start gap-4 p-5 hover:shadow-md cursor-pointer">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        disabled={loading}
        aria-label={hasVoted ? 'Remove upvote' : 'Upvote'}
        className={cn(
          'flex flex-col items-center gap-1 min-w-[44px] px-2 py-2.5 rounded-lg border transition-all duration-150 flex-shrink-0',
          hasVoted
            ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
            : 'bg-white border-[#e5e5e5] text-[#6b6b6b] hover:border-[#0a0a0a] hover:text-[#0a0a0a]',
          loading && 'opacity-60 cursor-not-allowed'
        )}
      >
        <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
        <span className="text-xs font-semibold leading-none">{upvotes}</span>
      </button>

      <Link to={`/feedback/${item.id}`} className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              'text-sm font-semibold text-[#0a0a0a] leading-snug',
              item.status === 'done' && 'line-through text-[#6b6b6b]'
            )}
          >
            {item.title}
          </h3>
          <StatusBadge status={item.status} className="flex-shrink-0 mt-0.5" />
        </div>
        <p className="mt-1 text-xs text-[#a3a3a3]">{date}</p>
      </Link>
    </Card>
  );
}

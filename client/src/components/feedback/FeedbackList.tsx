import { FeedbackSummary } from '../../api/types';
import { FeedbackCard } from './FeedbackCard';
import { Spinner } from '../ui/Spinner';
import { MessageSquare } from 'lucide-react';

interface FeedbackListProps {
  items: FeedbackSummary[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
}

export function FeedbackList({ items, loading, error, onDelete }: FeedbackListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <p className="text-sm text-red-400 font-medium">Failed to load feedback</p>
        <p className="text-xs text-white/22 mt-1">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
          <MessageSquare className="w-5 h-5 text-white/18" />
        </div>
        <p className="text-sm font-medium text-white/45">Nothing here yet</p>
        <p className="text-xs text-white/22 mt-1.5 max-w-[180px] leading-relaxed">
          Be the first to share an idea or report an issue.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 stagger">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

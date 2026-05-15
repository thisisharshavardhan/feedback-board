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
        <p className="text-sm text-red-500 font-medium">Failed to load feedback</p>
        <p className="text-xs text-[#a3a3a3] mt-1">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#f5f5f5] flex items-center justify-center mb-4">
          <MessageSquare className="w-5 h-5 text-[#c0c0c0]" />
        </div>
        <p className="text-sm font-semibold text-[#0a0a0a]">No feedback here</p>
        <p className="text-xs text-[#a3a3a3] mt-1 max-w-[200px]">
          Be the first to share an idea or report an issue.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

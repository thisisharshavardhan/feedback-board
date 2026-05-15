import { FeedbackSummary } from '../../api/types';
import { FeedbackCard } from './FeedbackCard';
import { Spinner } from '../ui/Spinner';

interface FeedbackListProps {
  items: FeedbackSummary[];
  loading: boolean;
  error: string | null;
}

export function FeedbackList({ items, loading, error }: FeedbackListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-sm text-red-500 font-medium">Failed to load feedback</p>
        <p className="text-xs text-[#a3a3a3] mt-1">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-sm font-semibold text-[#0a0a0a]">No feedback yet</p>
        <p className="text-xs text-[#a3a3a3] mt-1">
          Be the first to share an idea or report an issue.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} />
      ))}
    </div>
  );
}

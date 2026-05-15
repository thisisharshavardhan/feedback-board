import { useState, useEffect, useCallback } from 'react';
import { listFeedback } from '../api/feedback';
import { FeedbackSummary, FeedbackStatus, SortOrder } from '../api/types';

interface UseFeedbackResult {
  items: FeedbackSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFeedback(
  status: FeedbackStatus | 'all',
  sort: SortOrder
): UseFeedbackResult {
  const [items, setItems] = useState<FeedbackSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listFeedback(status, sort)
      .then((result) => {
        if (!cancelled) {
          setItems(result.items);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [status, sort, tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return { items, loading, error, refetch };
}

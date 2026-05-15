import { useState, useEffect, useCallback } from 'react';
import { getFeedback } from '../api/feedback';
import { FeedbackItem } from '../api/types';

interface UseFeedbackDetailResult {
  item: FeedbackItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFeedbackDetail(id: string): UseFeedbackDetailResult {
  const [item, setItem] = useState<FeedbackItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getFeedback(id)
      .then((data) => {
        if (!cancelled) {
          setItem(data);
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
  }, [id, tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return { item, loading, error, refetch };
}

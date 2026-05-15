import { useState } from 'react';
import { voteFeedback } from '../api/feedback';

interface UpvoteState {
  upvotes: number;
  hasVoted: boolean;
}

interface UseUpvoteResult {
  upvotes: number;
  hasVoted: boolean;
  loading: boolean;
  toggle: () => Promise<void>;
}

export function useUpvote(
  feedbackId: string,
  initial: UpvoteState
): UseUpvoteResult {
  const [state, setState] = useState<UpvoteState>(initial);
  const [loading, setLoading] = useState(false);

  async function toggle(): Promise<void> {
    if (loading) return;

    const optimistic: UpvoteState = {
      upvotes: state.hasVoted ? state.upvotes - 1 : state.upvotes + 1,
      hasVoted: !state.hasVoted,
    };
    setState(optimistic);
    setLoading(true);

    try {
      const result = await voteFeedback(feedbackId);
      setState(result);
    } catch {
      setState(state);
    } finally {
      setLoading(false);
    }
  }

  return { upvotes: state.upvotes, hasVoted: state.hasVoted, loading, toggle };
}

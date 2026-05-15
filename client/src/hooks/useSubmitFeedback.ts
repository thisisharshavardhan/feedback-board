import { useState } from 'react';
import { createFeedback } from '../api/feedback';

interface UseSubmitFeedbackResult {
  submitting: boolean;
  error: string | null;
  submit: (title: string, description: string, onSuccess: () => void) => Promise<void>;
}

export function useSubmitFeedback(): UseSubmitFeedbackResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(
    title: string,
    description: string,
    onSuccess: () => void
  ): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      await createFeedback(title, description);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  }

  return { submitting, error, submit };
}

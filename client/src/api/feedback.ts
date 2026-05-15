import { apiFetch } from './client';
import {
  FeedbackItem,
  FeedbackSummary,
  FeedbackStatus,
  SortOrder,
  VoteResult,
} from './types';

export interface ListFeedbackResult {
  items: FeedbackSummary[];
  total: number;
}

export function listFeedback(
  status?: FeedbackStatus | 'all',
  sort: SortOrder = 'newest'
): Promise<ListFeedbackResult> {
  const params = new URLSearchParams({ sort });
  if (status && status !== 'all') params.set('status', status);
  return apiFetch<ListFeedbackResult>(`/feedback?${params}`);
}

export function getFeedback(id: string): Promise<FeedbackItem> {
  return apiFetch<FeedbackItem>(`/feedback/${id}`);
}

export function createFeedback(title: string, description: string): Promise<FeedbackItem> {
  return apiFetch<FeedbackItem>('/feedback', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
}

export function voteFeedback(id: string): Promise<VoteResult> {
  return apiFetch<VoteResult>(`/feedback/${id}/vote`, { method: 'POST' });
}

export function updateFeedbackStatus(
  id: string,
  status: FeedbackStatus,
  adminKey: string
): Promise<FeedbackItem> {
  return apiFetch<FeedbackItem>(`/feedback/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    adminKey,
  });
}

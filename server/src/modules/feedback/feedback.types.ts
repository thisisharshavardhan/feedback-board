export type FeedbackStatus = 'open' | 'in_progress' | 'done' | 'closed';

export const VALID_STATUSES: FeedbackStatus[] = ['open', 'in_progress', 'done', 'closed'];

export interface FeedbackRow {
  id: string;
  title: string;
  description: string;
  status: FeedbackStatus;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export interface FeedbackSummary {
  id: string;
  title: string;
  status: FeedbackStatus;
  upvotes: number;
  hasVoted: boolean;
  createdAt: string;
}

export interface FeedbackItem extends FeedbackSummary {
  description: string;
  updatedAt: string;
}

export interface VoteResult {
  upvotes: number;
  hasVoted: boolean;
}

export interface CreateFeedbackDto {
  title: string;
  description: string;
}

export interface UpdateStatusDto {
  status: FeedbackStatus;
}

export type SortOrder = 'newest' | 'top';

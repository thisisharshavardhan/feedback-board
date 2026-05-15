export type FeedbackStatus = 'open' | 'in_progress' | 'done' | 'closed';
export type SortOrder = 'newest' | 'top';

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

export interface ApiError {
  code: string;
  message: string;
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };

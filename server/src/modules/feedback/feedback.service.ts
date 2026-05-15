import { nanoid } from 'nanoid';
import { feedbackRepository } from './feedback.repository';
import {
  FeedbackItem,
  FeedbackRow,
  FeedbackStatus,
  FeedbackSummary,
  CreateFeedbackDto,
  SortOrder,
  VoteResult,
} from './feedback.types';
import { AppError } from '../../errors/AppError';
import { ErrorCodes } from '../../errors/errorCodes';

function toSummary(row: FeedbackRow, hasVoted: boolean): FeedbackSummary {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    upvotes: row.upvotes,
    hasVoted,
    createdAt: row.created_at,
  };
}

function toItem(row: FeedbackRow, hasVoted: boolean): FeedbackItem {
  return {
    ...toSummary(row, hasVoted),
    description: row.description,
    updatedAt: row.updated_at,
  };
}

export const feedbackService = {
  list(
    status: FeedbackStatus | undefined,
    sort: SortOrder,
    voterToken: string
  ): FeedbackSummary[] {
    const rows = feedbackRepository.findAll(status, sort);
    const votedIds = feedbackRepository.getVotedIds(
      voterToken,
      rows.map((r) => r.id)
    );
    return rows.map((r) => toSummary(r, votedIds.has(r.id)));
  },

  getById(id: string, voterToken: string): FeedbackItem {
    const row = feedbackRepository.findById(id);
    if (!row) throw new AppError(404, ErrorCodes.NOT_FOUND, 'Feedback item not found');
    const hasVoted = feedbackRepository.hasVoted(id, voterToken);
    return toItem(row, hasVoted);
  },

  create(dto: CreateFeedbackDto): FeedbackItem {
    const now = new Date().toISOString();
    const id = nanoid(10);
    const row = feedbackRepository.create(id, dto, now);
    return toItem(row, false);
  },

  toggleVote(feedbackId: string, voterToken: string): VoteResult {
    const row = feedbackRepository.findById(feedbackId);
    if (!row) throw new AppError(404, ErrorCodes.NOT_FOUND, 'Feedback item not found');

    if (!voterToken || voterToken.trim().length === 0) {
      throw new AppError(400, ErrorCodes.VALIDATION_ERROR, 'Voter token is required');
    }

    const now = new Date().toISOString();
    const already = feedbackRepository.hasVoted(feedbackId, voterToken);

    if (already) {
      feedbackRepository.removeVote(feedbackId, voterToken);
      feedbackRepository.decrementUpvotes(feedbackId, now);
    } else {
      feedbackRepository.addVote(feedbackId, voterToken);
      feedbackRepository.incrementUpvotes(feedbackId, now);
    }

    const updated = feedbackRepository.findById(feedbackId)!;
    return { upvotes: updated.upvotes, hasVoted: !already };
  },

  updateStatus(feedbackId: string, status: FeedbackStatus, voterToken: string): FeedbackItem {
    const existing = feedbackRepository.findById(feedbackId);
    if (!existing) throw new AppError(404, ErrorCodes.NOT_FOUND, 'Feedback item not found');

    const now = new Date().toISOString();
    const updated = feedbackRepository.updateStatus(feedbackId, status, now);
    if (!updated) throw new AppError(500, ErrorCodes.INTERNAL, 'Failed to update status');

    const hasVoted = feedbackRepository.hasVoted(feedbackId, voterToken);
    return toItem(updated, hasVoted);
  },
};

import { getDb } from '../../db';
import {
  FeedbackRow,
  FeedbackStatus,
  CreateFeedbackDto,
  SortOrder,
} from './feedback.types';

export const feedbackRepository = {
  findAll(status: FeedbackStatus | undefined, sort: SortOrder): FeedbackRow[] {
    const db = getDb();
    const orderCol = sort === 'top' ? 'upvotes' : 'created_at';

    if (status) {
      return db
        .prepare(`SELECT * FROM feedback WHERE status = ? ORDER BY ${orderCol} DESC`)
        .all(status) as unknown as FeedbackRow[];
    }

    return db
      .prepare(`SELECT * FROM feedback ORDER BY ${orderCol} DESC`)
      .all() as unknown as FeedbackRow[];
  },

  findById(id: string): FeedbackRow | undefined {
    return getDb()
      .prepare('SELECT * FROM feedback WHERE id = ?')
      .get(id) as unknown as FeedbackRow | undefined;
  },

  create(id: string, dto: CreateFeedbackDto, now: string): FeedbackRow {
    const db = getDb();
    db.prepare(
      'INSERT INTO feedback (id, title, description, status, upvotes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, dto.title.trim(), dto.description.trim(), 'open', 0, now, now);

    return db.prepare('SELECT * FROM feedback WHERE id = ?').get(id) as unknown as FeedbackRow;
  },

  updateStatus(id: string, status: FeedbackStatus, now: string): FeedbackRow | undefined {
    const db = getDb();
    db.prepare('UPDATE feedback SET status = ?, updated_at = ? WHERE id = ?').run(
      status,
      now,
      id
    );
    return db.prepare('SELECT * FROM feedback WHERE id = ?').get(id) as unknown as FeedbackRow | undefined;
  },

  incrementUpvotes(id: string, now: string): void {
    getDb()
      .prepare('UPDATE feedback SET upvotes = upvotes + 1, updated_at = ? WHERE id = ?')
      .run(now, id);
  },

  decrementUpvotes(id: string, now: string): void {
    getDb()
      .prepare(
        'UPDATE feedback SET upvotes = MAX(0, upvotes - 1), updated_at = ? WHERE id = ?'
      )
      .run(now, id);
  },

  hasVoted(feedbackId: string, voterToken: string): boolean {
    const row = getDb()
      .prepare('SELECT 1 FROM votes WHERE feedback_id = ? AND voter_token = ?')
      .get(feedbackId, voterToken);
    return !!row;
  },

  addVote(feedbackId: string, voterToken: string): void {
    getDb()
      .prepare('INSERT OR IGNORE INTO votes (feedback_id, voter_token) VALUES (?, ?)')
      .run(feedbackId, voterToken);
  },

  removeVote(feedbackId: string, voterToken: string): void {
    getDb()
      .prepare('DELETE FROM votes WHERE feedback_id = ? AND voter_token = ?')
      .run(feedbackId, voterToken);
  },

  getVotedIds(voterToken: string, feedbackIds: string[]): Set<string> {
    if (feedbackIds.length === 0) return new Set();
    const placeholders = feedbackIds.map(() => '?').join(',');
    const rows = getDb()
      .prepare(
        `SELECT feedback_id FROM votes WHERE voter_token = ? AND feedback_id IN (${placeholders})`
      )
      .all(voterToken, ...feedbackIds) as unknown as { feedback_id: string }[];
    return new Set(rows.map((r) => r.feedback_id));
  },
};

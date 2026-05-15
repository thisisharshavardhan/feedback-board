import { Request, Response, NextFunction } from 'express';
import { feedbackService } from './feedback.service';
import { FeedbackStatus, SortOrder } from './feedback.types';

function getVoterToken(req: Request): string {
  return (req.headers['x-voter-token'] as string) ?? '';
}

export const feedbackController = {
  list(req: Request, res: Response, next: NextFunction): void {
    try {
      const status = req.query.status as FeedbackStatus | undefined;
      const sort = (req.query.sort as SortOrder) || 'newest';
      const voterToken = getVoterToken(req);
      const items = feedbackService.list(status, sort, voterToken);
      res.json({ data: { items, total: items.length }, error: null });
    } catch (err) {
      next(err);
    }
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const item = feedbackService.getById(req.params.id, getVoterToken(req));
      res.json({ data: item, error: null });
    } catch (err) {
      next(err);
    }
  },

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const item = feedbackService.create({
        title: req.body.title,
        description: req.body.description,
      });
      res.status(201).json({ data: item, error: null });
    } catch (err) {
      next(err);
    }
  },

  vote(req: Request, res: Response, next: NextFunction): void {
    try {
      const result = feedbackService.toggleVote(req.params.id, getVoterToken(req));
      res.json({ data: result, error: null });
    } catch (err) {
      next(err);
    }
  },

  deleteFeedback(req: Request, res: Response, next: NextFunction): void {
    try {
      feedbackService.deleteById(req.params.id);
      res.json({ data: null, error: null });
    } catch (err) {
      next(err);
    }
  },

  updateStatus(req: Request, res: Response, next: NextFunction): void {
    try {
      const item = feedbackService.updateStatus(
        req.params.id,
        req.body.status,
        getVoterToken(req)
      );
      res.json({ data: item, error: null });
    } catch (err) {
      next(err);
    }
  },
};

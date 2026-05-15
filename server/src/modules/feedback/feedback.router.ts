import { Router, Request, Response, NextFunction } from 'express';
import { feedbackController } from './feedback.controller';
import { validate } from '../../middleware/validate';
import { validateCreateFeedback, validateUpdateStatus } from './feedback.validators';
import { AppError } from '../../errors/AppError';
import { ErrorCodes } from '../../errors/errorCodes';
import { config } from '../../config/env';

function requireAdminKey(req: Request, _res: Response, next: NextFunction): void {
  const key = req.headers['x-admin-key'] as string | undefined;
  if (!key || key !== config.adminSecret) {
    next(new AppError(403, ErrorCodes.FORBIDDEN, 'Invalid or missing admin key'));
    return;
  }
  next();
}

const router = Router();

router.get('/', feedbackController.list);
router.post('/', validate(validateCreateFeedback), feedbackController.create);
router.get('/:id', feedbackController.getById);
router.post('/:id/vote', feedbackController.vote);
router.patch(
  '/:id/status',
  requireAdminKey,
  validate(validateUpdateStatus),
  feedbackController.updateStatus
);

export { router as feedbackRouter };

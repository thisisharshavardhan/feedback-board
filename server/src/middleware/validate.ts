import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ErrorCodes } from '../errors/errorCodes';

type Validator = (body: unknown) => string | null;

export function validate(validator: Validator) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const error = validator(req.body);
    if (error) {
      next(new AppError(400, ErrorCodes.VALIDATION_ERROR, error));
      return;
    }
    next();
  };
}

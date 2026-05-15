import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ErrorCodes } from '../errors/errorCodes';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      data: null,
      error: { code: err.code, message: err.message },
    });
    return;
  }

  console.error('[error]', err);
  res.status(500).json({
    data: null,
    error: { code: ErrorCodes.INTERNAL, message: 'An unexpected error occurred' },
  });
}

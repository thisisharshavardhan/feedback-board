import { VALID_STATUSES } from './feedback.types';

export function validateCreateFeedback(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required';

  const { title, description } = body as Record<string, unknown>;

  if (typeof title !== 'string' || title.trim().length < 5)
    return 'Title must be at least 5 characters';
  if (title.trim().length > 100) return 'Title must be under 100 characters';

  if (typeof description !== 'string' || description.trim().length < 20)
    return 'Description must be at least 20 characters';
  if (description.trim().length > 2000) return 'Description must be under 2000 characters';

  return null;
}

export function validateUpdateStatus(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required';

  const { status } = body as Record<string, unknown>;

  if (typeof status !== 'string' || !VALID_STATUSES.includes(status as never))
    return `Status must be one of: ${VALID_STATUSES.join(', ')}`;

  return null;
}

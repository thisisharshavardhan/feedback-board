export function validateTitle(value: string): string | true {
  if (!value || value.trim().length < 5) return 'Title must be at least 5 characters';
  if (value.trim().length > 100) return 'Title must be under 100 characters';
  return true;
}

export function validateDescription(value: string): string | true {
  if (!value || value.trim().length < 20) return 'Description must be at least 20 characters';
  if (value.trim().length > 2000) return 'Description must be under 2000 characters';
  return true;
}

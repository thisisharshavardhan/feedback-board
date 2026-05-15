import { getVoterToken } from '../utils/voterToken';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

interface RequestOptions extends RequestInit {
  adminKey?: string;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { adminKey, headers: extraHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Voter-Token': getVoterToken(),
    ...(extraHeaders as Record<string, string>),
  };

  if (adminKey) {
    headers['X-Admin-Key'] = adminKey;
  }

  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...rest,
    headers,
  });

  const json = await res.json();

  if (!res.ok || json.error) {
    const message = json.error?.message ?? 'Something went wrong';
    throw new Error(message);
  }

  return json.data as T;
}

const KEY = 'fb_voter_token';

export function getVoterToken(): string {
  let token = localStorage.getItem(KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(KEY, token);
  }
  return token;
}

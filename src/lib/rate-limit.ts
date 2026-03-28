const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const ipRequests = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  ipRequests.set(ip, { ...entry, count: entry.count + 1 });
  return true;
}

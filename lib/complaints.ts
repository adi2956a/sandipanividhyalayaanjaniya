const HOUR_IN_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_HOUR = 5;

declare global {
  var complaintRateLimitCache:
    | Map<string, { count: number; resetAt: number }>
    | undefined;
}

const rateLimitCache = global.complaintRateLimitCache ?? new Map<string, { count: number; resetAt: number }>();
global.complaintRateLimitCache = rateLimitCache;

export function generateComplaintTrackingId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";

  for (let index = 0; index < 6; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `CMP-${suffix}`;
}

export function checkComplaintRateLimit(ipAddress: string) {
  const now = Date.now();
  const existing = rateLimitCache.get(ipAddress);

  if (!existing || existing.resetAt <= now) {
    rateLimitCache.set(ipAddress, { count: 1, resetAt: now + HOUR_IN_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_REQUESTS_PER_HOUR) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    };
  }

  rateLimitCache.set(ipAddress, { ...existing, count: existing.count + 1 });
  return { allowed: true, retryAfterSeconds: 0 };
}

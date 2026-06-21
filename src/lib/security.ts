/**
 * Security utilities — XSS + SQL Injection protection
 * Supabase already uses parameterized queries (SQL injection safe)
 * These helpers sanitize inputs on the frontend layer
 */

/* ── Strip HTML tags to prevent XSS ── */
export function sanitizeText(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
    .replace(/`/g, '&#96;');
}

/* ── Validate email format ── */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/* ── Validate password strength ── */
export function isStrongPassword(password: string): {
  valid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
}

/* ── Strip SQL-like patterns from input ── */
export function sanitizeSQLInput(input: string): string {
  // Remove common SQL injection patterns
  return input
    .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|FROM|WHERE|AND|OR|HAVING|GROUP BY|ORDER BY)\b)/gi, '')
    .replace(/[;'"\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim();
}

/* ── Sanitize a full name ── */
export function sanitizeName(name: string): string {
  return name
    .replace(/[<>'"&\\;]/g, '') // strip dangerous chars
    .replace(/\s+/g, ' ')        // collapse spaces
    .trim()
    .slice(0, 100);               // max length
}

/* ── Rate limiter (in-memory, per session) ── */
const attempts: Record<string, { count: number; resetAt: number }> = {};

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60_000): {
  allowed: boolean;
  remainingMs: number;
} {
  const now = Date.now();
  const record = attempts[key];

  if (!record || now > record.resetAt) {
    attempts[key] = { count: 1, resetAt: now + windowMs };
    return { allowed: true, remainingMs: 0 };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remainingMs: record.resetAt - now };
  }

  record.count++;
  return { allowed: true, remainingMs: 0 };
}

/* ── Format remaining time for rate limit message ── */
export function formatRateLimitTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  return seconds < 60 ? `${seconds}s` : `${Math.ceil(seconds / 60)}min`;
}

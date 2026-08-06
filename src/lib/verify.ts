import crypto from 'crypto';
import { NextRequest } from 'next/server';

/**
 * Verifies secret token passed in query parameters or request headers against WEBHOOK_SECRET.
 */
export function verifySecret(req: NextRequest): boolean {
  const expectedSecret = process.env.WEBHOOK_SECRET;
  if (!expectedSecret) return false;

  const token =
    req.nextUrl.searchParams.get('token') ||
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-webhook-secret') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) return false;

  const expectedBuf = Buffer.from(expectedSecret);
  const tokenBuf = Buffer.from(token);

  if (expectedBuf.length !== tokenBuf.length) return false;

  return crypto.timingSafeEqual(expectedBuf, tokenBuf);
}


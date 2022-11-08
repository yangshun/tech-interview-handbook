import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country ?? null;
  const response = NextResponse.next();
  if (country != null) {
    response.cookies.set('country', country);
  }
  return response;
}

import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

const protectedPaths = [
  '/admin',
  '/supervisor',
  '/student'
];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log(`[Auth Middleware] Accessing path: ${path}`);

  // Check if the path is protected
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    console.log('[Auth Middleware] Protected route detected');
    const token = request.cookies.get('auth_token')?.value;
    console.log('[Auth Middleware] Token found:', !!token);

    if (!token) {
      console.log('[Auth Middleware] No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const userData = verifyToken(token);
    console.log('[Auth Middleware] User data:', userData);
    
    if (!userData) {
      console.log('[Auth Middleware] Invalid token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user has access to the specific route
    const routeRole = path.split('/')[1]; // Gets 'admin', 'supervisor', or 'student'
    console.log(`[Auth Middleware] Required role: ${routeRole}, User role: ${userData.role}`);
    
    if (userData.role !== routeRole) {
      console.log('[Auth Middleware] Unauthorized access, redirecting');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    console.log('[Auth Middleware] Access granted');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/supervisor/:path*',
    '/student/:path*',
  ]
};

import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

const protectedPaths = [
  '/admin',
  '/supervisor',
  '/student'
];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const userData = verifyToken(token);
    
    if (!userData) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user has access to the specific route
    const routeRole = path.split('/')[1]; // Gets 'admin', 'supervisor', or 'student'
    if (userData.role !== routeRole) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
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

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function withAuth(handler) {
  return async (req) => {
    try {
      const token = cookies().get('auth_token')?.value;
      
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      
      return handler(req);
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  };
}

export function checkPermission(requiredPermissions) {
  return async (req) => {
    try {
      const token = cookies().get('auth_token')?.value;
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const userPermissions = decoded.permissions || [];

      const hasPermission = requiredPermissions.every(permission => 
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      req.user = decoded;
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  };
}

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import users from './users.json';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticateUser(username, password) {
  const user = users.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return null;
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      permissions: user.permissions,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  cookies().set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 24 hours
  });

  return {
    username: user.username,
    role: user.role,
    permissions: user.permissions
  };
}

export function getCurrentUser() {
  try {
    const token = cookies().get('auth_token')?.value;
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function logout() {
  cookies().delete('auth_token');
}

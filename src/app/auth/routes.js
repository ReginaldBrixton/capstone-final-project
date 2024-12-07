export const authRoutes = {
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  verifyEmail: '/auth/verify-email',
};

export const protectedRoutes = {
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
};

export const publicRoutes = {
  home: '/',
  about: '/about',
  contact: '/contact',
};

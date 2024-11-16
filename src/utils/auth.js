import jwt from 'jsonwebtoken';
import { roles } from './users.json';

export const authenticateUser = (username, password) => {
  const user = roles.find(
    (user) => user.username === username && user.password === password
  );
  
  if (user) {
    const token = jwt.sign(
      { 
        username: user.username,
        role: user.role,
        permissions: user.permissions 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return { user, token };
  }
  
  return null;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions.includes(requiredPermission);
};

'use client';

import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  deleteUser as deleteFirebaseUser,
  updateEmail,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  enableNetwork,
  disableNetwork,
  getDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { useToast } from '../ui/useToast';

export function UserManagementTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'student' });
  const [editingUser, setEditingUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      enableNetwork(db).then(() => {
        toast({
          title: 'Online',
          description: 'Connection restored. Refreshing data...',
        });
        fetchUsers();
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      disableNetwork(db).then(() => {
        toast({
          title: 'Offline',
          description: 'Working in offline mode. Some features may be limited.',
          variant: 'destructive',
        });
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial offline check
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: isOffline 
          ? 'Working offline. Data may not be up to date.'
          : 'Failed to fetch users. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    if (isOffline) {
      toast({
        title: 'Error',
        description: 'Cannot add users while offline',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      await setDoc(doc(db, 'users', user.uid), {
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date().toISOString()
      });

      setNewUser({ email: '', password: '', role: 'student' });
      toast({
        title: 'Success',
        description: 'User added successfully',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updates) => {
    if (isOffline) {
      toast({
        title: 'Error',
        description: 'Cannot update users while offline',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, 'users', userId);
      
      // Check if document exists
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        toast({
          title: 'Error',
          description: 'User not found. They may have been deleted.',
          variant: 'destructive',
        });
        // Refresh the user list to remove any stale data
        fetchUsers();
        return;
      }

      await updateDoc(userRef, updates);
      
      if (updates.email) {
        // For email updates, we need to handle authentication separately
        toast({
          title: 'Note',
          description: 'Email updates require re-authentication and must be done by the user themselves.',
        });
      }

      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setEditingUser(null);
    }
  };

  const deleteUser = async (userId, email) => {
    if (isOffline) {
      toast({
        title: 'Error',
        description: 'Cannot delete users while offline',
        variant: 'destructive',
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      // Check if document exists first
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        toast({
          title: 'Error',
          description: 'User not found. They may have been deleted already.',
          variant: 'destructive',
        });
        // Refresh the user list to remove any stale data
        fetchUsers();
        return;
      }

      // Delete from Firestore
      await deleteDoc(userRef);
      
      // Delete from Authentication
      const auth = getAuth();
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, 'temporary-password');
        await deleteFirebaseUser(user);
      } catch (authError) {
        console.error('Error deleting auth user:', authError);
        // Continue with success message since Firestore document was deleted
      }

      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {isOffline && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-4">
          You are currently offline. Some features may be limited.
        </div>
      )}
      
      <form onSubmit={addUser} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
            disabled={loading}
          />
          <select
            className="w-full p-2 border rounded-md"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            disabled={loading}
          >
            <option value="student">Student</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding User...' : 'Add User'}
        </Button>
      </form>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <Input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        disabled={loading}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <select
                        className="w-full p-2 border rounded-md"
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        disabled={loading}
                      >
                        <option value="student">Student</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          user.role === 'supervisor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {editingUser?.id === user.id ? (
                      <div className="space-x-2">
                        <Button
                          onClick={() => updateUser(user.id, {
                            email: editingUser.email,
                            role: editingUser.role
                          })}
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingUser(null)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingUser(user)}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteUser(user.id, user.email)}
                          disabled={loading}
                        >
                          {loading ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-600">Manage students, supervisors, and admins</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push('/admin/users')}
          >
            Manage Users
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-600">Monitor all ongoing projects</p>
          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => router.push('/admin/projects')}
          >
            View Projects
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <p className="text-gray-600">Configure system settings and permissions</p>
          <button 
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => router.push('/admin/settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

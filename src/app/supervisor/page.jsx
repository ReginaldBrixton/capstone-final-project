'use client';

import { useRouter } from 'next/navigation';

export default function SupervisorDashboard() {
  const router = useRouter();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Supervisor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Students</h2>
          <p className="text-gray-600">View and manage your assigned students</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push('/supervisor/students')}
          >
            View Students
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project Reviews</h2>
          <p className="text-gray-600">Review and grade student submissions</p>
          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => router.push('/supervisor/reviews')}
          >
            View Submissions
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Schedule</h2>
          <p className="text-gray-600">Manage meetings and consultations</p>
          <button 
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => router.push('/supervisor/schedule')}
          >
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

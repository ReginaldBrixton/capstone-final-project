'use client';

export default function DashboardPage() {
  // Mock user and loading state
  const user = { email: 'user@example.com' }; // Replace with actual user data
  const loading = false; // Replace with actual loading state

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Simulate redirecting to login
    console.log('Redirecting to /login');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        <p>Welcome, {user.email}!</p>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
} 
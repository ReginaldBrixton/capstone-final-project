export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <p>Total Users: 100</p>
          <p>New Users (last 30 days): 25</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <p>Total Orders: 500</p>
          <p>Pending Orders: 10</p>
        </div>
      </div>
    </div>
  );
}


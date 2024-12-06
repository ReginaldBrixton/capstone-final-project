'use client';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-lg border p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 flex items-center justify-center gap-3">
            🚀 Welcome Home
          </h2>
        </div>
        <div className="space-y-4 mt-4">
          <p className="text-gray-600 text-center">
            A beautifully simple starting point for your next web adventure.
          </p>
          <div className="flex justify-center">
            <button className="border border-blue-200 px-4 py-2 rounded-md text-blue-800 hover:bg-blue-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

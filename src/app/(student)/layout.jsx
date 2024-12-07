import React from 'react';

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-grow">{children}</main>
    </div>
  );
}

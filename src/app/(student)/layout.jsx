import React from 'react';

export default function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">{/* Add navigation items here */}</nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

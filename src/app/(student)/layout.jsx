import React from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Home', href: '/home' },
];

export default function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

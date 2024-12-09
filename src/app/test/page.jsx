'use client';

import { useCallback, useEffect, useState } from 'react';

import { SessionManager } from './components';

const TestPage = () => {
  const [mounted, setMounted] = useState(false);

  const handleLogout = useCallback(() => {
    // Add your logout logic here
  }, []);

  useEffect(() => {
    setMounted(true);
    handleLogout();
  }, [handleLogout]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Session Management Test</h1>
      <SessionManager />
    </div>
  );
};

export default TestPage;

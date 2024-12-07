'use client';

import React, { useEffect, useState } from 'react';

import CreateSession from './CreateSession';
import SessionDisplay from './SessionDisplay';

const SessionManager = () => {
  const [storageData, setStorageData] = useState({
    users: [],
    userEmails: new Map(),
    sessions: new Map(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchStorageData = async () => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getStorageData',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch storage data');
      }

      const data = await response.json();
      setStorageData({
        users: Object.values(data.users || {}),
        userEmails: new Map(Object.entries(data.userEmails || {})),
        sessions: new Map(Object.entries(data.sessions || {})),
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (username) => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteSession',
          username,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      // Refresh sessions after deletion
      fetchStorageData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'clearAll',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to clear all sessions');
      }

      fetchStorageData();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStorageData();
    const interval = setInterval(fetchStorageData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Sessions</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {showCreateForm ? 'Hide Form' : 'Create New'}
          </button>
          <button
            onClick={fetchStorageData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="mb-6">
          <CreateSession onSessionCreated={fetchStorageData} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      <div className="grid gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Storage Summary</h3>
          <div className="space-y-2">
            <p>Total Users: {storageData.users.length}</p>
            <p>Total Email Mappings: {storageData.userEmails.size}</p>
            <p>Active Sessions: {storageData.sessions.size}</p>
          </div>
        </div>

        {storageData.users.length === 0 ? (
          <p className="text-gray-500 text-center">No sessions found</p>
        ) : (
          storageData.users.map((session) => (
            <SessionDisplay
              key={session.id}
              sessionData={session}
              onDelete={() => handleDeleteSession(session.username)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SessionManager;

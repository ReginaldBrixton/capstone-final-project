import React from 'react';

const SessionDisplay = ({ sessionData, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">Session Information</h3>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div className="space-y-2">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">User ID:</span>
          <span>{sessionData.id}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Username:</span>
          <span>{sessionData.username}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Email:</span>
          <span>{sessionData.email || 'Not provided'}</span>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Created At:</span>
          <span>{formatDate(sessionData.createdAt)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Last Activity:</span>
          <span>{formatDate(sessionData.lastActivity)}</span>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Status:</span>
          <span
            className={`font-semibold ${sessionData.isLoggedIn ? 'text-green-600' : 'text-red-600'}`}
          >
            {sessionData.isLoggedIn ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Location:</span>
          <span>{sessionData.lastLocation || 'Unknown'}</span>
        </div>

        {/* Login History */}
        <div className="mt-4">
          <span className="font-medium block mb-2">Login History:</span>
          <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
            {sessionData.loginHistory && sessionData.loginHistory.length > 0 ? (
              <ul className="space-y-1">
                {sessionData.loginHistory.map((timestamp, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {formatDate(timestamp)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No login history</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDisplay;

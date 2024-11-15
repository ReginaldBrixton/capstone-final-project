import React from 'react';
import { Clock, Activity, RefreshCw } from 'lucide-react';

export default function NoRecentActivities() {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="relative">
        <Clock className="w-16 h-16 text-gray-300" />
        <div className="absolute -top-1 -right-1">
          <div className="relative">
            <Activity className="w-6 h-6 text-gray-400 animate-pulse" />
            <RefreshCw className="w-4 h-4 text-gray-400 absolute -bottom-2 -right-2 animate-spin" />
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-700">No Recent Activities</h3>
      
      <p className="text-gray-500 text-center max-w-sm">
        It looks like there haven&apos;t been any activities lately. 
        New actions will appear here when they occur.
      </p>
    </div>
  );
}
'use client';

import Link from "next/link";
import { Label } from "../../form/label";

const RememberMeCheckbox = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
          Remember me
        </Label>
      </div>

      <div className="text-sm">
        <Link 
          href="/forgot-password" 
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default RememberMeCheckbox; 
'use client';

import Link from "next/link";
import { Label } from "../../form/label";
import { motion } from "framer-motion";

const RememberMeCheckbox = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="remember-me-container flex items-center justify-between gap-4">
      <motion.div 
        className="remember-me-checkbox flex items-center group cursor-pointer"
        whileTap={{ scale: 0.98 }}
        onClick={() => setRememberMe(!rememberMe)}
      >
        <div className="relative">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="remember-me-input h-4 w-4 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 border-gray-300 rounded transition-all duration-200 cursor-pointer hover:border-indigo-500"
          />
          <motion.div
            initial={false}
            animate={rememberMe ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg className="w-3 h-3 text-indigo-600" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
        <Label 
          htmlFor="remember-me" 
          className="remember-me-label ml-2 block text-sm text-gray-700 dark:text-gray-300 select-none cursor-pointer group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors"
        >
          Remember me
        </Label>
      </motion.div>

      <motion.div 
        className="forgot-password-text text-sm"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link 
          href="/forgot-password" 
          className="forgot-password-link font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 flex items-center gap-1"
        >
          <span>Forgot password?</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default RememberMeCheckbox;
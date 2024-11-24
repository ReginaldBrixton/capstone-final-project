'use client';

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout dark:from-gray-900 h-90% dark:to-gray-800">
        <div className="auth-flex flex-col items-center justify-center">
          {/* Logo or branding */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-logo mb-8"
          >
      
          </motion.div>

          {/* Auth form container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="auth-form w-full max-w-md "
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="auth-footer fixed bottom-0 left-0 right-0 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400"
          >
            <p>© {new Date().getFullYear()} Research Hub. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

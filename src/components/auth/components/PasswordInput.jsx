'use client';

import { useState } from 'react';
import { Input } from "../../form/input";
import { Label } from "../../form/label";
import { motion } from "framer-motion";

export const PasswordInput = ({ password, setPassword, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Password
      </Label>
      <div className="relative">
        <motion.div
          className={`absolute inset-0 rounded-lg transition-colors duration-200 ${
            isFocused ? 'ring-2 ring-indigo-500' : ''
          }`}
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
            dark:bg-gray-900 dark:text-white text-sm pr-24 transition-all duration-200
            focus:outline-none focus:border-transparent"
          placeholder="Enter your password"
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="group relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span className="absolute -top-8 right-0 scale-0 group-hover:scale-100 transition-all 
              bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
            {showPassword ? (
              <motion.svg whileHover={{ scale: 1.1 }} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </motion.svg>
            ) : (
              <motion.svg whileHover={{ scale: 1.1 }} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </motion.svg>
            )}
          </button>
          {password && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              type="button"
              onClick={() => setPassword('')}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-1"
        >
          <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Verifying...</p>
        </motion.div>
      )}
    </div>
  );
};
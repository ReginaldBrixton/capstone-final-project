'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Search, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link'
import Image from 'next/image'

const AnimatedNotFound = () => {
  const [bounce, setBounce] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [hoveredChar, setHoveredChar] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev);
      setRotate(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const numbers = ['4', '0', '4'];
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-4">
      <div className="relative">
        <div className="flex justify-center mb-8 sm:mb-12">
          {numbers.map((num, index) => (
            <div
              key={index}
              className={`text-6xl sm:text-8xl md:text-9xl font-bold text-blue-500 transition-all duration-300 ease-in-out
                ${hoveredChar === index ? 'text-red-500 transform scale-110' : ''}
                ${bounce && index === 1 ? 'animate-bounce' : ''}
                ${rotate ? 'transform rotate-y-180' : ''}`}
              onMouseEnter={() => setHoveredChar(index)}
              onMouseLeave={() => setHoveredChar(null)}
            >
              {num}
            </div>
          ))}
        </div>
        <Search className="absolute -top-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 animate-ping" />
      </div>
      
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-700 text-center animate-fadeIn">
        Oops! Page Not Found
      </div>
      
      <div className="relative">
        <AlertTriangle className={`w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 transition-transform duration-500 ${rotate ? 'transform rotate-180' : ''}`} />
        <RefreshCw className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 animate-spin opacity-30" />
      </div>
      
      <p className="mt-4 text-gray-600 max-w-md text-center text-sm sm:text-base md:text-lg">
        The page you&apos;re looking for has taken a digital detour.
        <br className="hidden sm:block" />
        Let&apos;s get you back on track!
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="group flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          <Home className="mr-2 w-5 h-5 group-hover:animate-bounce" />
          Return Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="group flex items-center justify-center px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
        >
          <RefreshCw className="mr-2 w-5 h-5 group-hover:animate-spin" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AnimatedNotFound;
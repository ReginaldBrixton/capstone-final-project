"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Atom = ({
  x,
  y,
  color
}) => (
  <motion.circle
    cx={x}
    cy={y}
    r="4"
    fill={color}
    initial={{ scale: 0 }}
    animate={{ scale: [0, 1.5, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
)

const Bond = ({
  x1,
  y1,
  x2,
  y2
}) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#4B5563"
    strokeWidth="2"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
)

export function MolecularStructureLoaderComponent() {
  return (
    (<div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <svg
          className="w-64 h-64 mx-auto mb-8"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Bond x1="20" y1="50" x2="50" y2="20" />
          <Bond x1="50" y1="20" x2="80" y2="50" />
          <Bond x1="80" y1="50" x2="50" y2="80" />
          <Bond x1="50" y1="80" x2="20" y2="50" />
          <Bond x1="50" y1="20" x2="50" y2="80" />
          <Bond x1="20" y1="50" x2="80" y2="50" />
          <Atom x={20} y={50} color="#EF4444" />
          <Atom x={50} y={20} color="#3B82F6" />
          <Atom x={80} y={50} color="#10B981" />
          <Atom x={50} y={80} color="#F59E0B" />
          <Atom x={50} y={50} color="#8B5CF6" />
        </svg>
        <motion.h2
          className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          Synthesizing Capstone Data...
        </motion.h2>
        <motion.div
          className="w-64 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}>
          <motion.div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
    </div>)
  );
}

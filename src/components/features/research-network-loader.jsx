"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Node = ({
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
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }} />
)

const Connection = ({
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
    stroke="#6B7280"
    strokeWidth="1"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }} />
)

export function ResearchNetworkLoaderComponent() {
  const nodes = [
    { x: 50, y: 50, color: "#3B82F6" },
    { x: 20, y: 30, color: "#10B981" },
    { x: 80, y: 30, color: "#F59E0B" },
    { x: 20, y: 70, color: "#EF4444" },
    { x: 80, y: 70, color: "#8B5CF6" },
  ]

  const connections = [
    { x1: 50, y1: 50, x2: 20, y2: 30 },
    { x1: 50, y1: 50, x2: 80, y2: 30 },
    { x1: 50, y1: 50, x2: 20, y2: 70 },
    { x1: 50, y1: 50, x2: 80, y2: 70 },
    { x1: 20, y1: 30, x2: 80, y2: 30 },
    { x1: 20, y1: 70, x2: 80, y2: 70 },
  ]

  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
      <div className="text-center">
        <svg
          className="w-64 h-64 mx-auto mb-8"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {connections.map((conn, index) => (
            <Connection key={index} {...conn} />
          ))}
          {nodes.map((node, index) => (
            <Node key={index} {...node} />
          ))}
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="#3B82F6"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
        <motion.h2
          className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          Connecting Research Networks...
        </motion.h2>
        <motion.div
          className="w-64 h-2 bg-indigo-200 dark:bg-indigo-700 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}>
          <motion.div
            className="h-full bg-indigo-500 dark:bg-indigo-300 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
    </div>)
  );
}
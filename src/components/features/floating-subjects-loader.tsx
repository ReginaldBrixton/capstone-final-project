"use client"

import React from 'react'
import { motion } from 'framer-motion'

const subjects = ['Math', 'Science', 'History', 'Literature', 'Art', 'Music', 'Geography', 'Physics']

export default function FloatingSubjectsLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject}
              className="absolute text-lg font-bold text-purple-600 dark:text-purple-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                x: Math.cos(index / subjects.length * Math.PI * 2) * 100,
                y: Math.sin(index / subjects.length * Math.PI * 2) * 100,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut",
              }}
            >
              {subject}
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-200 dark:bg-purple-700"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <motion.h2
          className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Gathering Wisdom...
        </motion.h2>
        <motion.div
          className="w-64 h-2 bg-purple-200 dark:bg-purple-700 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-full bg-purple-500 dark:bg-purple-300 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  )
}
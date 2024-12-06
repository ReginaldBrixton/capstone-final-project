'use client';

import { Layout, Zap, Code } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Modern Design",
      description: "Beautiful, responsive layouts that work on any device"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance with Next.js and React"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer Friendly",
      description: "Clean code structure with best practices"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="mb-4 text-primary">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
} 
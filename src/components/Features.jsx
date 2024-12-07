'use client';

import { Code, Layout, Zap } from 'lucide-react';

import '../styles/components/Features.scss';

export default function Features() {
  const features = [
    {
      icon: <Layout />,
      title: 'Modern Design',
      description: 'Beautiful, responsive layouts that work on any device',
    },
    {
      icon: <Zap />,
      title: 'Lightning Fast',
      description: 'Optimized performance with Next.js and React',
    },
    {
      icon: <Code />,
      title: 'Developer Friendly',
      description: 'Clean code structure with best practices',
    },
  ];

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="icon-wrapper">{feature.icon}</div>
          <h3 className="title">{feature.title}</h3>
          <p className="description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

import styles from './page.module.scss';
import Link from 'next/link';
import { ArrowRight, Code, Layout, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Our App</h1>
      </header>

      <main className={styles.main}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A modern web application built with Next.js and React
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-lg bg-gray-alpha-100 hover:bg-gray-alpha-200 transition-colors">
              <Layout className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Beautiful layouts that work on any device
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gray-alpha-100 hover:bg-gray-alpha-200 transition-colors">
              <Zap className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Performance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Optimized for speed and efficiency
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gray-alpha-100 hover:bg-gray-alpha-200 transition-colors">
              <Code className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Clean Code</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built with modern best practices
              </p>
            </div>
          </div>

          <Link 
            href="/get-started" 
            className="inline-flex items-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-button-primary-hover dark:hover:bg-button-primary-hover transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} Your App. All rights reserved.
      </footer>
    </div>
  );
}

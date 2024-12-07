import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Features from '@/components/Features';
import Header from '@/components/Header';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A modern web application built with Next.js and React
          </p>

          <Features />

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

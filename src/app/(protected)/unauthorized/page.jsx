'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../app/page.module.css';

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect after a delay
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>Unauthorized Access</h1>
      <div className={styles.content}>
        <p>You do not have permission to access this page.</p>
        <p>Redirecting to login page...</p>
      </div>
    </div>
  );
}

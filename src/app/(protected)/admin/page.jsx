'use client';

import { useEffect, useState } from 'react';
import styles from '../../../app/page.module.css';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add any initialization logic here
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.content}>
        <p>Welcome to the admin dashboard</p>
        {/* Add your admin-specific content here */}
      </div>
    </div>
  );
}

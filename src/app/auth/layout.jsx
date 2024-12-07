import React from 'react';

import styles from './auth.module.scss';
import { ToastProvider } from './components/ToastProvider';

export default function AuthLayout({ children }) {
  return (
    <ToastProvider>
      <div className={styles.authLayout}>
        <div className={styles.authBackground}>
          <div className={styles.gradientOverlay} />
        </div>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ToastProvider>
  );
}

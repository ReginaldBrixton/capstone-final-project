import React from 'react';

import styles from './auth.module.scss';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authBackground}>
        <div className={styles.gradientOverlay} />
      </div>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

'use client';

import { useRef } from 'react';

import ForgotPasswordForm from './components/ForgotPasswordForm';
import styles from './Forget-password.module.scss';

export default function ForgotPasswordPage() {
  const containerRef = useRef(null);

  //   useEffect(() => {
  //     gsap.from(containerRef.current, {
  //       y: 20,
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: 'power3.out'
  //     })
  //    }, [])

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.formContainer}>
        <h1 className={styles.title}>Forgot Password</h1>
        <ForgotPasswordForm />
        <div className={styles.footer}>
          <a href="/auth/login" className={styles.backLink}>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

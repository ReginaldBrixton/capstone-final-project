'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

import styles from './AuthComponents.module.scss';

const Toast = ({ id, message, type = 'info', onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const icons = {
    success: <CheckCircle className={styles.toastIcon} size={20} />,
    error: <XCircle className={styles.toastIcon} size={20} />,
    info: <Info className={styles.toastIcon} size={20} />,
    warning: <AlertTriangle className={styles.toastIcon} size={20} />,
  };

  return (
    <div
      className={`
        ${styles.toast} 
        ${styles[type]} 
        ${isExiting ? styles.exit : ''}
      `}
      role="alert"
    >
      <div className={styles.toastContent}>
        {icons[type]}
        <span>{message}</span>
      </div>
      <button onClick={handleClose} className={styles.toastClose} aria-label="Close notification">
        <X size={16} />
      </button>
      <div className={styles.toastProgress} />
    </div>
  );
};

export default Toast;

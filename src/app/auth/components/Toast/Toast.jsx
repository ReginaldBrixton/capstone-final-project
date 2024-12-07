'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './Toast.module.scss';

const ANIMATION_DURATION = 300;

const ToastIcon = memo(({ type }) => {
  const icons = {
    success: <CheckCircle className={styles.toastIcon} size={20} />,
    error: <XCircle className={styles.toastIcon} size={20} />,
    info: <Info className={styles.toastIcon} size={20} />,
    warning: <AlertTriangle className={styles.toastIcon} size={20} />,
  };

  return icons[type] || icons.info;
});

ToastIcon.displayName = 'ToastIcon';

ToastIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
};

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const progressRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, ANIMATION_DURATION);
  }, [onClose]);

  useEffect(() => {
    if (duration && progressRef.current) {
      const currentRef = progressRef.current;
      currentRef.addEventListener('animationend', handleClose);
      return () => {
        currentRef.removeEventListener('animationend', handleClose);
      };
    }
  }, [duration, handleClose]);

  if (!shouldRender) return null;

  const toastClasses = [styles.toast, styles[type], isExiting ? styles.exit : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={toastClasses} role="alert" aria-live="polite">
      <div className={styles.toastContent}>
        <ToastIcon type={type} />
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        className={styles.toastClose}
        aria-label="Close notification"
        type="button"
      >
        <X size={16} />
      </button>
      <div
        ref={progressRef}
        className={styles.toastProgress}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

Toast.displayName = 'Toast';

export default Toast;

import React from 'react';
import { Loader2 } from 'lucide-react';

import styles from './Button.module.scss';

const AuthButton = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  onClick,
  className = '',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className} ${
        isLoading ? styles.loading : ''
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className={styles.spinner} size={20} />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={20} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={20} />}
        </>
      )}
    </button>
  );
};

export default AuthButton;

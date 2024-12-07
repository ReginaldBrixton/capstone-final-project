import React from 'react';

import styles from './AuthComponents.module.scss';

const AuthButton = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;

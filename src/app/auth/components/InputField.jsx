import React, { useState } from 'react';

import styles from './AuthComponents.module.scss';

const InputField = ({
  icon: Icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  error,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={`${styles.icon} ${isFocused ? styles.focused : ''}`}>
        {Icon && <Icon size={20} />}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;

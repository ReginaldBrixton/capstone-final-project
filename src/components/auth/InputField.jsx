import React from 'react';

import styles from './AuthComponents.module.scss';

const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, required = true }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.icon}>{Icon && <Icon size={20} />}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default InputField;

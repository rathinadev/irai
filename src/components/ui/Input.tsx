import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({ 
  label, 
  error, 
  fullWidth = true,
  className = '',
  id,
  ...props 
}: InputProps) {
  const reactId = React.useId();
  const inputId = id || reactId;
  
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input 
        id={inputId}
        className={`${styles.input} ${error ? styles.hasError : ''}`} 
        {...props} 
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'gold' | 'specialty-yoga' | 'specialty-medical' | 'specialty-psychology' | 'specialty-physiology' | 'specialty-nutrition';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'primary',
  className = ''
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

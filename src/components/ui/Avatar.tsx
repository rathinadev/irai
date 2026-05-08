import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export function Avatar({ 
  src, 
  alt, 
  size = 'md', 
  fallback,
  className = ''
}: AvatarProps) {
  const classes = [
    styles.avatar,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  const initial = fallback || alt.charAt(0).toUpperCase();

  return (
    <div className={classes}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback}>{initial}</span>
      )}
    </div>
  );
}

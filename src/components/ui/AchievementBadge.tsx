import React from 'react';
import styles from './AchievementBadge.module.css';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked?: boolean;
  date?: string;
}

export function AchievementBadge({ 
  title, 
  description, 
  icon, 
  unlocked = true,
  date 
}: AchievementBadgeProps) {
  return (
    <div className={`${styles.achievement} ${!unlocked ? styles.locked : ''}`}>
      <div className={styles.iconCircle}>
        {icon}
      </div>
      <div className={styles.content}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.description}>{description}</p>
        {unlocked && date && <span className={styles.date}>Unlocked {date}</span>}
      </div>
    </div>
  );
}
